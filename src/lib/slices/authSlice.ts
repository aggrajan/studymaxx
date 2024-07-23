import { Address } from "@/model/Address";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Inspired from User Interface defined in User model
interface UserStoreInfo {
    username?: string,
    name?: string,
    picture?: string,
    email: string,
    isVerified: boolean,
    isAdmin?: boolean,
    addresses?: Address[]
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
        }
    }
});

export const { setAuthState, removeAuthState } = authSlice.actions;

export const authReducer = authSlice.reducer;