import { Book } from "@/model/Books";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { sampleBooks } from "@/helpers/sampleBooks";

export interface IBookState {
    books: Book[]
}

const initialState: IBookState = {
    books: sampleBooks as Book[]
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
        }
    }
})

export const booksReducer = bookSlice.reducer;
export const { setBooks } = bookSlice.actions