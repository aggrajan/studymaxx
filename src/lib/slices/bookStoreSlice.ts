import { Book } from "@/model/Books";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IBookState {
    books: Book[]
}

const initialState: IBookState = {
    books: []
}

export const bookStoreSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setStoreBooks: (state: IBookState, action: PayloadAction<Book[]>) => {
            return {
                ...state,
                books: action.payload
            }
        },
        removeStoreBooks: (state: IBookState) => {
            return {
                ...state,
                books: []
            }
        },
        addStoreBook: (state: IBookState, action: PayloadAction<Book>) => {
            return {
                ...state,
                books: [...state.books, action.payload] 
            }
        }
    }
})

export const bookStoreReducer = bookStoreSlice.reducer;
export const { setStoreBooks, removeStoreBooks, addStoreBook } = bookStoreSlice.actions