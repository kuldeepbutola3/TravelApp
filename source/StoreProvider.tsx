import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { PersistProvider } from './redux/persist';

export const StoreProvider: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistProvider>{children}</PersistProvider>
    </Provider>
  );
};
