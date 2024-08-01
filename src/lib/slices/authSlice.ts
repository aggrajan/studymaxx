import { Address } from "@/model/Address";
import { Book } from "@/model/Books";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Inspired from User Interface defined in User model
interface UserStoreInfo {
    _id: string;
    username?: string;
    name?: string;
    picture?: string;
    image?: string;
    email: string;
    isVerified: boolean;
    isAdmin?: boolean;
    addresses?: Address[];
    wishlist: Book[];
};

export interface IAuthState {
    userPresent: boolean;
    user: UserStoreInfo | null;
}

const initialState: IAuthState =  {
    userPresent: false,
    user: null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthState: (state: IAuthState, action: PayloadAction<UserStoreInfo>) => {
            return {
                ...state,
                userPresent: true,
                user: action.payload
            }
        },
        removeAuthState: (state: IAuthState) => {
            return { 
                ...state,
                userPresent: false,
                user: null
            }
        },
        addToWishlist: (state: IAuthState, action: PayloadAction<Book>) => {
            const bookIndex = state.user?.wishlist.findIndex((book: Book) => book._id === action.payload._id);
            if(bookIndex === -1 && state.user?.wishlist) {
                state.user.wishlist = [ ...state.user.wishlist, action.payload ]
            }
        },
        removeFromWishlist: (state: IAuthState, action: PayloadAction<Book>) => {
            const bookIndex = state.user?.wishlist.findIndex((book: Book) => book._id === action.payload._id);
            if(bookIndex !== undefined && bookIndex !== -1 && state.user?.wishlist) {
                state.user.wishlist.splice(bookIndex, 1);
            }
        }
    }
});

export const { setAuthState, removeAuthState, addToWishlist, removeFromWishlist } = authSlice.actions;

export const authReducer = authSlice.reducer;