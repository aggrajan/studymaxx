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
                cartCount: action.payload.length
            }
        }, 
        addCartItem: (state: ICartState, action: PayloadAction<ICartItem>) => {
            const itemIndex = state.cartItems.findIndex(item => item.product._id === action.payload.product._id);
            if(itemIndex !== -1) return {
                                    ...state
                                };
            (async () => {
                const response = await addToCart(action.payload.product._id as string);
                console.log(response);
            })();
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
                cartCount: state.cartCount + 1,
                subtotal: state.subtotal + action.payload.product.price * action.payload.quantity,
                total: state.total + action.payload.product.price * action.payload.quantity
            }
        },
        setShippingAmount: (state: ICartState, action: PayloadAction<number>) => {
            return {
                ...state,
                shipping: action.payload,
                total: state.total - state.shipping + action.payload
            }
        },
        setDiscountAmount: (state: ICartState, action: PayloadAction<number>) => {
            return {
                ...state,
                discount: action.payload,
                total: state.total + state.discount - action.payload
            }
        },
        addItemQuantity: (state: ICartState, action: PayloadAction<{ id: number }>) => {
            const itemIndex = state.cartItems.findIndex(item => item.product._id === action.payload.id);
            if (itemIndex !== -1) {
                (async () => {
                    const response = await changeQuantityInCart(action.payload.id.toString(), 1);
                    console.log(response);
                })();

                state.cartItems[itemIndex].quantity += 1;
                state.subtotal += state.cartItems[itemIndex].product.price;
                state.total = state.subtotal + state.shipping - state.discount;
            }
            
        },
        subtractItemQuantity: (state: ICartState, action: PayloadAction<{ id: number }>) => {
            const itemIndex = state.cartItems.findIndex(item => item.product._id === action.payload.id);
            if (itemIndex !== -1) {
                (async () => {
                    const response = await changeQuantityInCart(action.payload.id.toString(), -1);
                    console.log(response);
                })();

                state.cartItems[itemIndex].quantity -= 1;
                state.subtotal -= state.cartItems[itemIndex].product.price;
                state.total = state.subtotal + state.shipping - state.discount;
            }
        },
        removeCartItem: (state: ICartState, action: PayloadAction<{ id: number }>) => {
            const itemIndex = state.cartItems.findIndex(item => item.product._id === action.payload.id);
            if (itemIndex !== -1) {
                (async () => {
                    const response = await removeFromCart(action.payload.id.toString());
                    console.log(response);
                })();

                const item = state.cartItems[itemIndex];
                state.cartItems.splice(itemIndex, 1);
                state.cartCount -= 1;
                state.subtotal -= item.product.price * item.quantity;
                state.total = state.subtotal + state.shipping - state.discount;
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
export const { setCart, addCartItem, addItemQuantity, setShippingAmount, setDiscountAmount, subtractItemQuantity, removeCartItem, emptyCart } = cartSlice.actions;