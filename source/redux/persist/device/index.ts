import AsyncStorage from '@react-native-community/async-storage';
import { useCallback, useEffect } from 'react';
import { ObserveOptions, useObserveFields } from '../core/fieldObserver';
import { usePersistContext } from '../core/persistContext';
import { PersistedFields } from '..';
// import { useOnMount } from 'src/hooks/commonHooks';

export const usePersistOnDevice = (...keyPaths: string[]) => {
  const onChange = useCallback<ObserveOptions['onChange']>(fields => {
    /**
     * As we have 2 App registry our store can be overwritten and
     * to avoid this edge case we have to give some delay for AsyncStore firstly
     * to avoid using not an actual AsyncStore.
     */
    setTimeout(() => {
      AsyncStorage.mergeItem?.(ROOT_KEY, JSON.stringify(fields)).catch(
        () => {},
      );
    }, 0);
  }, []);

  const { triggerAll } = useObserveFields({ keyPaths, onChange });

  const { paused } = usePersistContext();
  const rehydrateFromDevice = useRehydrateFromDevice();

  useEffect(() => {
    paused(true);
    rehydrateFromDevice()
      // save any fields that haven't included because they only ever
      // get initialized.
      .then(triggerAll)
      .then(() => paused(false));
  }, []);
};

const ROOT_KEY = '_persistedFields';

export const useRehydrateFromDevice = () => {
  const { rehydrate } = usePersistContext();
  return useCallback(() => {
    return AsyncStorage.getItem(ROOT_KEY)
      .then(str => str || '{}')
      .then(JSON.parse)
      .then(rehydrate)
      .catch(e => {
        console.log('useRehydrateFromDevice error', e);
        const f: PersistedFields = {};
        return f;
      });
  }, [rehydrate]);
};
