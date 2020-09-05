import {Store} from 'redux';

export const UNSUBSCRIBE = 'unsubscribe';

export type Callback<State, Value = unknown> = (
  newValue: Value,
  oldValue: Value,
  state: State,
) => void | typeof UNSUBSCRIBE;

export type Selector<State, Value = unknown> = (state: State) => Value;

export type Subscribe<State, Value = unknown> = (
  selector: Selector<State, Value>,
  callback: Callback<State, Value>,
) => void;

export const configureSubscriber = <State = object>(store: Store<State>) => {
  let subscribers: {
    selector: Selector<State>;
    callback: Callback<State>;
  }[] = [];
  let prevState = store.getState();

  const subscribe = <Value>(
    selector: Selector<State, Value>,
    callback: Callback<State, Value>,
  ) => {
    const unknownCallback = callback as Callback<State, unknown>;
    subscribers.push({selector, callback: unknownCallback});
  };

  store.subscribe(() => {
    const newState = store.getState();

    subscribers = subscribers.filter((subscriber) => {
      const previousValue = subscriber.selector(prevState);
      const newValue = subscriber.selector(newState);
      if (previousValue === newValue) {
        return true;
      }

      const shouldUnsubscribe = subscriber.callback(
        newValue,
        previousValue,
        newState,
      );
      if (shouldUnsubscribe === UNSUBSCRIBE) {
        return false;
      }
      return true;
    });

    prevState = newState;
  });

  return subscribe;
};
