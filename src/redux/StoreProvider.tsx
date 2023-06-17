"use client"
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createStore } from './store';

interface StoreProviderProps {
  children: ReactNode;
  preloadedState: any
}

const StoreProvider = ({ children, preloadedState }: StoreProviderProps) => {
  const store = createStore(preloadedState);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default StoreProvider;
