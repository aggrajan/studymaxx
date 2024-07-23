import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IFilter {
    subject: string[];
    clas: string[];
    board: string[];
    language: string[];
    categorie: string[];
    exam: string[]
}

export interface ISearchAndFilter {
    searchTerm: string;
    filters: IFilter;
}

const initialState: ISearchAndFilter = {
    searchTerm: "",
    filters: {
        subject: [],
        clas: [],
        board: [],
        language: [],
        categorie: [],
        exam: []
    }
    
}

export const searchAndFilterSlice = createSlice({
    name: "searchAndFilter",
    initialState,
    reducers: {
        addFilter: (state: ISearchAndFilter, action: PayloadAction<{ name: keyof IFilter, value: string }>) => {
            state.filters[action.payload.name].push(action.payload.value);
        },
        removeFilter: (state: ISearchAndFilter, action: PayloadAction<{ name: keyof IFilter, value: string }>) => {
            const arrayToUpdate = state.filters[action.payload.name];
            state.filters[action.payload.name] = arrayToUpdate.filter((value: string) => value !== action.payload.value);
        },
        updateSearchTerm: (state: ISearchAndFilter, action: PayloadAction<string>) => {
            return {
                ...state,
                searchTerm: action.payload
            }
        },
        clearSearchTerm: (state: ISearchAndFilter) => {
            return {
                ...state,
                searchTerm: ""
            }
        }
    }
})

export const searchAndFilterReducer = searchAndFilterSlice.reducer;
export const { addFilter, removeFilter, updateSearchTerm, clearSearchTerm } = searchAndFilterSlice.actions