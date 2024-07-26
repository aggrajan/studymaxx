import { Book } from "@/model/Books";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IBookState {
    books: Book[]
}

const initialState: IBookState = {
    books: []
}

export const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setBooks: (state: IBookState, action: PayloadAction<Book[]>) => {
            return {
                ...state,
                books: action.payload
            }
        },
        removeBooks: (state: IBookState) => {
            return {
                ...state,
                books: []
            }
        }
    }
})

export const booksReducer = bookSlice.reducer;
export const { setBooks, removeBooks } = bookSlice.actions