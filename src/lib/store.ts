import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authReducer } from './slices/authSlice';
import { cartReducer } from './slices/cartSlice';
import { searchAndFilterReducer } from './slices/searchAndFilterSlice';
import { booksReducer } from './slices/booksSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  searchAndFilter: searchAndFilterReducer,
  books: booksReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware({ serializableCheck: false })
  )
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch