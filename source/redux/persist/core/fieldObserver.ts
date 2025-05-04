import { useStore } from 'react-redux';
// import { useOnMount } from 'src/hooks';
// import { log } from 'src/utils/logging';
// import { subscribe } from 'src/utils/redux-subscriber';
import { useCallback, useRef, useEffect } from 'react';
import { PersistedFields } from './types';
import { usePersistContext } from './persistContext';
import { lodashGet, lodashHas } from '../../../lodash/lodash';
import { subscribe } from '../../../utils/redux-subscriber';
// import { subscribe } from '../../../../src/utils/redux-subscriber';

// import { useOnMount } from './s';

export type ObserveOptions = {
  keyPaths: string[];
  onChange: (fields: PersistedFields) => void;
};

/**
 * This hook does a lot of the heavy lifting by calling the onChange callback
 * passed in whenever redux values change. It also returns a `triggerAll` callback
 * that you can call to force all fields in redux to report their changes. Use
 * `triggerAll` if you have initialization requirements that wouldn't necessarily
 * be triggered after redux as already been bootstrapped. For instance, if your
 * persisted redux string field is initialized with the install date, it will never
 * be persisted properly because no actions modify it after the app launches.
 */
export const useObserveFields = ({ keyPaths, onChange }: ObserveOptions) => {
  const store = useStore();
  const { paused } = usePersistContext();

  const _triggerAll = useCallback(() => {
    const dict: PersistedFields = {};
    const state = store.getState();
    keyPaths
      .filter(keyPath => lodashHas(store.getState(), keyPath))
      .forEach(keyPath => {
        dict[keyPath] = lodashGet(state, keyPath);
      });
    dict && onChange(dict);
  }, [keyPaths, onChange, store]);

  const triggerAllRef = useRef(_triggerAll);

  useEffect(() => {
    triggerAllRef.current = _triggerAll;
  }, [_triggerAll]);

  useEffect(() => {
    keyPaths
      .filter(keyPath => {
        const pathExists = lodashHas(store.getState(), keyPath);
        // !pathExists &&
        //   log.debug(`WARNING: attempting to observe keyPath state.${keyPath} which doesn't exist`);
        return pathExists;
      })
      .forEach(keyPath => {
        // TODO: move to unsubscribe pattern and cleanup in useEffect
        subscribe(
          state => lodashGet(state, keyPath),
          value => (!paused() && onChange({ [keyPath]: value })) || undefined,
        );
      });
  }, []);

  return { triggerAll: triggerAllRef.current };
};
