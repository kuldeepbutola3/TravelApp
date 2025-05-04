import { AppState } from 'react-native';
type Timeout = ReturnType<typeof setInterval>;

export const configureTimer = (tickCallback: typeof callback) => {
  callback = tickCallback;
};

export const startTimer = () => {
  shouldBeRunning = true;
  restartTimer();
};

export const pauseTimer = () => {
  shouldBeRunning = false;
  clearTimer();
};

const TOKEN_TIME_CHECK_INTERVAL = 30000; // 30 seconds

const checkForTokenExpiration = () => {
  callback && callback();
};

let timerId: Timeout;
let callback: Function;
// this is used to restart the timer after going into background if needed
let shouldBeRunning = false;

const clearTimer = () => {
  if (timerId) {
    clearInterval(timerId);
  }
};

const restartTimer = () => {
  clearTimer();
  timerId = setInterval(() => {
    checkForTokenExpiration();
  }, TOKEN_TIME_CHECK_INTERVAL);
  checkForTokenExpiration();
};

AppState.addEventListener('change', state => {
  if (state === 'background') {
    return clearTimer();
  }
  if (state === 'active' && shouldBeRunning) {
    return restartTimer();
  }
});
