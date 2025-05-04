import { Store } from 'redux';
import { RootState } from '../redux/rootReducer';

export const UNSUBSCRIBE = 'unsubscribe';

export type Callback<State, Value = unknown> = (
  newValue: Value,
  oldValue: Value,
  state: State
) => void | typeof UNSUBSCRIBE;

export type Selector<State, Value = unknown> = (state: State) => Value;

export type Subscribe<State, Value = unknown> = (
  selector: Selector<State, Value>,
  callback: Callback<State, Value>
) => void;

let _subscriber: Subscribe<RootState>;

export const configureSubscriber = <State extends RootState>(store: Store<State>) => {
  let subscribers: { selector: Selector<State>; callback: Callback<State> }[] = [];
  let prevState = store.getState();

  _subscriber = (selector, callback: Callback<State>) => {
    const unknownCallback = callback as Callback<State, unknown>;
    subscribers.push({ selector, callback: unknownCallback });
  };

  store.subscribe(() => {
    const newState = store.getState();

    subscribers = subscribers.filter((subscriber) => {
      const previousValue = subscriber.selector(prevState);
      const newValue = subscriber.selector(newState);
      if (previousValue === newValue) {
        return true;
      }

      const shouldUnsubscribe = subscriber.callback(newValue, previousValue, newState);
      if (shouldUnsubscribe === UNSUBSCRIBE) {
        return false;
      }
      return true;
    });

    prevState = newState;
  });
};

export const subscribe = <Value>(
  selector: Selector<RootState, Value>,
  callback: Callback<RootState, Value>
) => {
  return (_subscriber as unknown as Subscribe<RootState, Value>)(selector, callback);
};
