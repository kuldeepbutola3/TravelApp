import React, { JSX, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import { View } from 'react-native';
// import { TokenManager } from './idg/session/TokenManager/TokenManager';

type Props = {
  children: ReactNode;
};
// if (__DEV__) {
//   persistor.purge();
// }
export function StoreProvider(props: Props): JSX.Element {
  const { children } = props;
  return (
    <Provider store={store}>
      <PersistGate
        loading={<View style={{ flex: 1, backgroundColor: 'red' }} />}
        persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
