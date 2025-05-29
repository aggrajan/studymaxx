'use client'
import { Provider } from 'react-redux'
import { store } from '../lib/store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react';
import React, { useState } from "react"

const persistor = persistStore(store);

export const RehydrationContext = React.createContext({ rehydrated: true });

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [rehydrated, setRehydrated] = useState(false);
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} onBeforeLift={() => setRehydrated(true)}>
        <RehydrationContext.Provider value={{ rehydrated }}>
          {children}
        </RehydrationContext.Provider>
      </PersistGate>
    </Provider>
  );
}