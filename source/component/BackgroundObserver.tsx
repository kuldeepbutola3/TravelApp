import React from 'react';
import { usePersistOnDevice } from '../redux/persist/device';

export type BackgroundObserverProps = {};

/**
 * Anything that you wish to monitor in the background can go in here.
 * This component should have no children so it does not inadvertently
 * re-render the entire app. Place this component somewhere near the top
 * of the App hierarchy, but below the redux provider.
 *
 * Encapsulate your specific background process into a self dependent
 * hook and initialize it in the body.
 * // TODO: Add TokenManager implementation
 */
export const BackgroundObserver: React.FC<BackgroundObserverProps> = () => {
  // usePersistOnDevice();

  // usePersistOnDevice('app', 'session.sessionData');
  // TODO: Before moving to usePersistOnDevice(), all of the appSlice's fields
  // were being persisted, so I've persisted all of app. We need to determine
  // if all of them need persistence.
  //
  // For example, we could limit the appSlice's persistence scope like so:
  // usePersistOnDevice('app.username', 'app.useBiometrics')
  return <></>;
};
