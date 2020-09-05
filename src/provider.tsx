import React, {ReactNode} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
// import { TokenManager } from './idg/session/TokenManager';
import {store} from './redux/store';

const persistor = persistStore(store);

type Props = {
  children: ReactNode;
};
export function StoreProvider(props: Props): JSX.Element {
  const {children} = props;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
