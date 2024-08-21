import { Book } from "@/model/Books";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ICartItem, ICartState } from "./cartSlice";

const initialState: ICartState = {
    cartCount: 0,
    cartItems: [],
    subtotal: 0,
    shipping: 0,
    discount: 0,
    total: 0
}

export const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        setCheckout: (state: ICartState, action: PayloadAction<ICartItem[]>) => {
            return {
                ...state,
                cartItems: [...action.payload],
                cartCount: action.payload.length,
                subtotal: action.payload.reduce((prev, curr) => prev + curr.quantity * ((curr.product.discount && curr.product.discount > 0) ? parseInt((curr.product.price * ((100 - curr.product.discount) / 100.0)).toFixed(0)) : parseInt(curr.product.price.toFixed(0))), 0),
                discount: 0,
                total: action.payload.reduce((prev, curr) => prev + curr.quantity * ((curr.product.discount && curr.product.discount > 0) ? parseInt((curr.product.price * ((100 - curr.product.discount) / 100.0)).toFixed(0)) : parseInt(curr.product.price.toFixed(0))), 0) + state.shipping
            }
        }, 
        addCheckoutItem: (state: ICartState, action: PayloadAction<ICartItem>) => {
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
        },
        setCheckoutShippingAmount: (state: ICartState, action: PayloadAction<number>) => {
            return {
                ...state,
                shipping: action.payload,
                total: state.total - state.shipping + action.payload
            }
        },
        setCheckoutDiscountAmount: (state: ICartState, action: PayloadAction<number>) => {
            return {
                ...state,
                discount: action.payload,
                total: state.total + state.discount - action.payload
            }
        },
        addCheckoutItemQuantity: (state: ICartState, action: PayloadAction<{ id: number }>) => {
            const itemIndex = state.cartItems.findIndex(item => item.product._id === action.payload.id);
            if (itemIndex !== -1) {
                state.cartItems[itemIndex].quantity += 1;
                state.subtotal += ((state.cartItems[itemIndex].product.discount && state.cartItems[itemIndex].product.discount > 0) ? parseInt((state.cartItems[itemIndex].product.price * ((100 - state.cartItems[itemIndex].product.discount) / 100.0)).toFixed(0)) : parseInt(state.cartItems[itemIndex].product.price.toFixed(0)));
                state.total = state.subtotal + state.shipping - state.discount;
            }
            
        },
        subtractCheckoutItemQuantity: (state: ICartState, action: PayloadAction<{ id: number }>) => {
            const itemIndex = state.cartItems.findIndex(item => item.product._id === action.payload.id);
            if (itemIndex !== -1) {
                state.cartItems[itemIndex].quantity -= 1;
                state.subtotal -= ((state.cartItems[itemIndex].product.discount && state.cartItems[itemIndex].product.discount > 0) ? parseInt((state.cartItems[itemIndex].product.price * ((100 - state.cartItems[itemIndex].product.discount) / 100.0)).toFixed(0)) : parseInt(state.cartItems[itemIndex].product.price.toFixed(0)));
                state.total = state.subtotal + state.shipping - state.discount;
            }
        },
        removeCheckoutItem: (state: ICartState, action: PayloadAction<{ id: number }>) => {
            const itemIndex = state.cartItems.findIndex(item => item.product._id === action.payload.id);
            if (itemIndex !== -1) {
                const item = state.cartItems[itemIndex];
                state.cartItems.splice(itemIndex, 1);
                state.cartCount -= 1;
                state.subtotal -= ((item.product.discount && item.product.discount > 0) ? parseInt((item.product.price * ((100 - item.product.discount) / 100.0)).toFixed(0)) : parseInt(item.product.price.toFixed(0))) * item.quantity;
                state.total = state.subtotal + state.shipping - state.discount;
            }   
        },
        updateCheckoutItem: (state: ICartState, action: PayloadAction<{ book: Book }>) => {
            const itemIndex = state.cartItems.findIndex(item => item.product._id === (action.payload.book._id as number));
            if(itemIndex !== -1) {
                state.cartItems[itemIndex].product = action.payload.book;
            }
        },
        emptyCheckout: (state: ICartState) => {
            return {
                ...state,
                ...initialState
            }
        }
    }
})

export const checkoutReducer = checkoutSlice.reducer;
export const { setCheckout, addCheckoutItem, setCheckoutShippingAmount, setCheckoutDiscountAmount, addCheckoutItemQuantity, subtractCheckoutItemQuantity, removeCheckoutItem, updateCheckoutItem, emptyCheckout } = checkoutSlice.actions;