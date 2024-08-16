import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authReducer } from './slices/authSlice';
import { cartReducer } from './slices/cartSlice';
import { searchAndFilterReducer } from './slices/searchAndFilterSlice';
import { booksReducer } from './slices/booksSlice';
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { bookStoreReducer } from './slices/bookStoreSlice';
import { checkoutReducer } from './slices/checkoutSlice';

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["user", "userPresent"]
}

const cartPersistConfig = {
  key: "cart",
  storage: storage,
  whitelist: ["cartCount", "cartItems", "subtotal", "shipping", "discount", "total"]
}

const searchAndFilterPersistConfig = {
  key: "searchAndFilter",
  storage: storage,
  whitelist: ["searchTerm", "filters"]
}

const booksPersistConfig = {
  key: "books",
  storage: storage,
  whitelist: ["books"]
}

const bookStorePersistConfig = {
  key: "bookStore",
  storage: storage,
  whitelist: ["books"]
}

const checkoutPersistConfig = {
  key: "checkout",
  storage: storage,
  whitelist: ["cartCount", "cartItems", "subtotal", "shipping", "discount", "total"]
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
  searchAndFilter: persistReducer(searchAndFilterPersistConfig, searchAndFilterReducer),
  books: persistReducer(booksPersistConfig, booksReducer),
  bookStore: persistReducer(bookStorePersistConfig, bookStoreReducer),
  checkout: persistReducer(checkoutPersistConfig, checkoutReducer)
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