import { Book } from "@/model/Books";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { addToCart } from "@/app/apiCalls/callAddtoCart";
import { removeFromCart } from "@/app/apiCalls/removeFromCart";
import { changeQuantityInCart } from "@/app/apiCalls/callChangeQuantityInCart";

export interface ICartItem {
    product: Book;
    quantity: number;
}

export interface ICartState {
    cartCount: number;
    cartItems: ICartItem[];
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;
}

const initialState: ICartState = {
    cartCount: 0,
    cartItems: [],
    subtotal: 0,
    shipping: 0,
    discount: 0,
    total: 0
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state: ICartState, action: PayloadAction<ICartItem[]>) => {
            return {
                ...state,
                cartItems: [...action.payload],
                cartCount: action.payload.length,
                subtotal: action.payload.reduce((prev, curr) => prev + curr.quantity * ((curr.product.discount && curr.product.discount > 0) ? parseInt((curr.product.price * ((100 - curr.product.discount) / 100.0)).toFixed(0)) : parseInt(curr.product.price.toFixed(0))), 0),
                total: action.payload.reduce((prev, curr) => prev + curr.quantity * ((curr.product.discount && curr.product.discount > 0) ? parseInt((curr.product.price * ((100 - curr.product.discount) / 100.0)).toFixed(0)) : parseInt(curr.product.price.toFixed(0))), 0) - parseInt(state.discount.toFixed(0)) + parseInt(state.shipping.toFixed(0))
            }
        }, 
        addCartItem: (state: ICartState, action: PayloadAction<ICartItem>) => {
            try {
                (async () => {
                    await addToCart(action.payload.product._id as string);
                })();
            } catch (error: any) {
                console.error("Failed to call addToCart:", error.message);
            } finally {
                const itemIndex = state.cartItems.findIndex(item => item.product._id === action.payload.product._id);
                if(itemIndex !== -1) return {
                                        ...state
                                    };
                return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload],
                    cartCount: state.cartCount + 1,
                    subtotal: state.subtotal + ((action.payload.product.discount && action.payload.product.discount > 0) ? parseInt((action.payload.product.price * ((100 - action.payload.product.discount) / 100.0)).toFixed(0)) : parseInt(action.payload.product.price.toFixed(0))) * action.payload.quantity,
                    total: state.total + ((action.payload.product.discount && action.payload.product.discount > 0) ? parseInt((action.payload.product.price * ((100 - action.payload.product.discount) / 100.0)).toFixed(0)) : parseInt(action.payload.product.price.toFixed(0))) * action.payload.quantity
                }
            }
        },
        setShippingAmount: (state: ICartState, action: PayloadAction<number>) => {
            return {
                ...state,
                shipping: parseInt(action.payload.toFixed(0)),
                total: state.total - parseInt(state.shipping.toFixed(0)) + parseInt(action.payload.toFixed(0))
            }
        },
        setDiscountAmount: (state: ICartState, action: PayloadAction<number>) => {
            return {
                ...state,
                discount: parseInt(action.payload.toFixed(0)),
                total: state.total + parseInt(state.discount.toFixed(0)) - parseInt(action.payload.toFixed(0))
            }
        },
        addItemQuantity: (state: ICartState, action: PayloadAction<{ id: number }>) => {
            const itemIndex = state.cartItems.findIndex(item => item.product._id === action.payload.id);
            if (itemIndex !== -1) {
                try {
                    (async () => {
                        await changeQuantityInCart(action.payload.id.toString(), 1);
                    })();
                } catch (error: any) {
                    console.error("Failed to call changeQuantityInCart (increment):", error.message);
                } finally {
                    state.cartItems[itemIndex].quantity += 1;
                    state.subtotal += ((state.cartItems[itemIndex].product.discount && state.cartItems[itemIndex].product.discount > 0) ? parseInt((state.cartItems[itemIndex].product.price * ((100 - state.cartItems[itemIndex].product.discount) / 100.0)).toFixed(0)) : parseInt(state.cartItems[itemIndex].product.price.toFixed(0)));
                    state.total = state.subtotal + parseInt(state.shipping.toFixed(0)) - parseInt(state.discount.toFixed(0));
                }
            }
            
        },
        subtractItemQuantity: (state: ICartState, action: PayloadAction<{ id: number }>) => {
            const itemIndex = state.cartItems.findIndex(item => item.product._id === action.payload.id);
            if (itemIndex !== -1) {
                try {
                    (async () => {
                        await changeQuantityInCart(action.payload.id.toString(), -1);
                    })();
                } catch (error: any) {
                    console.error("Failed to call changeQuantityInCart (decrement):", error.message);
                } finally {
                    state.cartItems[itemIndex].quantity -= 1;
                    state.subtotal -= ((state.cartItems[itemIndex].product.discount && state.cartItems[itemIndex].product.discount > 0) ? parseInt((state.cartItems[itemIndex].product.price * ((100 - state.cartItems[itemIndex].product.discount) / 100.0)).toFixed(0)) : parseInt(state.cartItems[itemIndex].product.price.toFixed(0)));
                    state.total = state.subtotal + parseInt(state.shipping.toFixed(0)) - parseInt(state.discount.toFixed(0));
                }
            }
        },
        removeCartItem: (state: ICartState, action: PayloadAction<{ id: number }>) => {
            const itemIndex = state.cartItems.findIndex(item => item.product._id === action.payload.id);
            if (itemIndex !== -1) {
                try {
                    (async () => {
                        await removeFromCart(action.payload.id.toString());
                    })();
                } catch (error: any) {
                    console.log(error.message);
                } finally {
                    const item = state.cartItems[itemIndex];
                    state.cartItems.splice(itemIndex, 1);
                    state.cartCount -= 1;
                    state.subtotal -= ((item.product.discount && item.product.discount > 0) ? parseInt((item.product.price * ((100 - item.product.discount) / 100.0)).toFixed(0)) : parseInt(item.product.price.toFixed(0))) * item.quantity;
                    state.total = state.subtotal + parseInt(state.shipping.toFixed(0)) - parseInt(state.discount.toFixed(0));
                }
            }   
        },
        updateCartItem: (state: ICartState, action: PayloadAction<{ book: Book }>) => {
            const itemIndex = state.cartItems.findIndex(item => item.product._id === (action.payload.book._id as number));
            console.log(itemIndex, action.payload.book);
            if(itemIndex !== -1) {
                state.cartItems[itemIndex].product = action.payload.book;
            }
        },
        emptyCart: (state: ICartState) => {
            return {
                ...state,
                ...initialState
            }
        }
    }
})

export const cartReducer = cartSlice.reducer;
export const { setCart, addCartItem, addItemQuantity, setShippingAmount, setDiscountAmount, subtractItemQuantity, removeCartItem, updateCartItem, emptyCart } = cartSlice.actions;