import React from 'react';
// import {useLogin} from 'src/idg/session/sessionSlice';
// import {appSlice} from 'src/appSlice';

// import {Alert} from 'react-native';

// import {useAuraTranslation} from 'src/utils/i18n';

// import {useThunkDispatch} from 'src/redux/hooks';

import {Screen} from '../../components/Screen';

export function LoginScreen() {
  // const dispatch = useThunkDispatch();

  // const {actions} = appSlice;

  // const {t} = useAuraTranslation();

  // const login = useLogin();
  // const loginClick = useCallback(
  //   (username: string, password: string): void => {
  //     const disableChecks = () => {};
  //     const checkForTouchIdSupport = (_password: string) => {};
  //     const showAlertToAddTouchId = (_password: string, auth: string) => {};
  //     login({username, password})
  //       .then(() => {})
  //       .catch(() =>
  //         Alert.alert(
  //           'Login failed.',
  //           'Please check your username and password.',
  //         ),
  //       );
  //   },
  //   [dispatch, login, t],
  // );

  // const forgotPwdClick = useCallback((): void => {
  //   Alert.alert('Forgot Pwd Clicked!', 'Further implement screen');
  // }, []);

  return (
    <Screen testID="registrationScreen">
      {/* <Login loginPress={loginClick} forgotPasswordPress={forgotPwdClick} /> */}
    </Screen>
  );
}
