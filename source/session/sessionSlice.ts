// import { createAsyncThunk, createSlice, PayloadAction, unwrapResult } from '@reduxjs/toolkit';
// import { useThunkDispatch } from '../redux/hooks';
// // import Props from 'src/models/NavigationType';
// // import { useResetNavigation } from '../navigation/hook';
// // import { ProfileModel } from '../profiles/ProfileModel';
// // import { useBindAction, useThunkDispatch } from '../redux/hooks';
// // import { useResetStore } from '../redux/rootActions';
// // import { RootStateObj } from '../redux/rootReducer';
// // import { UserWc } from '../user/UserWc';
// // import { UserResponseWp, UserWp } from '../user/UserWp';
// // import {
// //   addPrefferedName,
// //   addPrimaryEmail,
// //   authRequest,
// //   checkWpExistingUser,
// //   deleteWpUser,
// //   generateVerificationCode,
// //   getMeData,
// //   getWcUserDetails,
// //   login,
// //   registerUser,
// //   registerUserToWordPress,
// //   resetPasscode,
// //   sendVerificationCode,
// //   updateUserToWordpress,
// //   updateWcUser,
// // } from './sessionApi';
// // import {
// //   AuthRequest,
// //   AuthResponse,
// //   EmailAddResponse,
// //   AddEmailRequest,
// //   AddPrefferedNameRequest,
// //   GenerateCodeRequest,
// //   GenerateCodeResponse,
// //   LoginRequest,
// //   LoginResponse,
// //   MeDataResponse,
// //   RegisterUserRequest,
// //   RegisterUserResponse,
// //   ResetPasscodeRequest,
// //   ResetPasscodeResponse,
// //   UpdateCodeRequest,
// //   UpdateCodeResponse,
// //   User,
// //   RegisterUserToWordPressRequestType,
// //   WpCheckUserRequestType,
// //   WpUserCheckResponseType,
// //   WpCheckUserResponseType,
// //   WpDeleteRequestType,
// //   DeleteWpUserResponse,
// //   RegisterWpUserResponse,
// //   WcUpdateUserRequestType,
// // } from './sessionTypes';

// interface State {
//   // sessionData: {
//   //   user?: {
//   //     isExistingUser: LoginResponse;
//   //   } & User;
//   //   meData?: ProfileModel;
//   //   auth?: AuthResponse;
//   //   authTimeStamp: number;
//   //   userVerified: boolean;
//   // };

//   // registerUser?: RegisterUserResponse;
//   // verificationCode?: GenerateCodeResponse;
//   // isForgetPassword?: boolean;
//   // userWp?: UserWp;
//   // userWc?: UserWc;
// }

// const initialState: State = {
//   sessionData: { userVerified: false, authTimeStamp: 0 },
// };

// export const useSession = () => {
//   const dispatch = useThunkDispatch();
//   const _doLogin = (param: any) => {
//     return dispatch(doLogin(param)).then(unwrapResult);
//   };
//   const _doRegister = (param: any) => {
//     return dispatch(doRegister(param)).then(unwrapResult);
//   };

//   const _generateVerificationCode = (param: any) => {
//     return dispatch(generateVerificationCodeThunk(param)).then(unwrapResult);
//   };

//   const _sendVerificationCode = (param: any) => {
//     return dispatch(sendVerificationCodeThunk(param)).then(unwrapResult);
//   };

//   const _authRequest = (param: any) => {
//     return dispatch(authRequestThunk(param)).then(unwrapResult);
//   };

//   const _updateWpUser = (param: any) => {
//     return dispatch(updateWcUserThunk(param)).then(unwrapResult);
//   };

//   const _resetPasscode = (param: any) => {
//     return dispatch(resetPasscodeThunk(param)).then(unwrapResult);
//   };

//   const _getMeData = () => {
//     return dispatch(getMeDataThunk()).then(unwrapResult);
//   };

//   const _addEmail = (param: AddEmailRequest) => {
//     return dispatch(addEmailThunk(param)).then(unwrapResult);
//   };
//   const _addPrefferedName = (param: AddPrefferedNameRequest) => {
//     return dispatch(addPrefferedNameThunk(param)).then(unwrapResult);
//   };
//   const _registerUserToWordPress = (params: RegisterUserToWordPressRequestType) => {
//     return dispatch(registerUserToWordPressThunk(params)).then(unwrapResult);
//   };
//   // const _getWordPressUsersList = () => {
//   //   return dispatch(getWordPressUserListThunk()).then(unwrapResult);
//   // };
//   const _checkWpRegisterUser = (param: WpCheckUserRequestType) => {
//     return dispatch(checkWpExistingUserThunk(param)).then(unwrapResult);
//   };
//   const _updateUserOnWordpress = (param: WpDeleteRequestType) => {
//     return dispatch(updateUserOnWordpressThunk(param)).then(unwrapResult);
//   };
//   const _deleteWpUserRequest = (param: WpDeleteRequestType) => {
//     return dispatch(deleteWpUserThunk(param)).then(unwrapResult);
//   };
//   const _getWcUserDetail = (param: WcUpdateUserRequestType) => {
//     return dispatch(getWcUserDetailsThunk(param)).then(unwrapResult);
//   };

//   return {
//     doLogin: _doLogin,
//     doRegister: _doRegister,
//     generateVerificationCode: _generateVerificationCode,
//     sendVerificationCode: _sendVerificationCode,
//     authRequest: _authRequest,
//     resetPasscode: _resetPasscode,
//     getMeData: _getMeData,
//     addEmail: _addEmail,
//     addPrefferedName: _addPrefferedName,
//     registerToWordPress: _registerUserToWordPress,
//     updateWpUser: _updateWpUser,
//     getWcUserDetail: _getWcUserDetail,
//     // getwordPressUsersList: _getWordPressUsersList,
//     checkWpRegisterUser: _checkWpRegisterUser,
//     updateUserOnWordpress: _updateUserOnWordpress,
//     deleteWpUserRequest: _deleteWpUserRequest,
//   };
// };

// const doLogin = createAsyncThunk<
//   // Return type of the payload creator
//   LoginResponse,
//   // First argument to the payload creator (provide void if there isn't one)
//   LoginRequest,
//   // Types for ThunkAPI
//   RootStateObj
// >('session/login', async (params, config) => {
//   try {
//     return await login(params);
//   } catch (error) {
//     return config.rejectWithValue(error);
//   }
// });

// const doRegister = createAsyncThunk<
//   // Return type of the payload creator
//   RegisterUserResponse,
//   // First argument to the payload creator (provide void if there isn't one)
//   RegisterUserRequest,
//   // Types for ThunkAPI
//   RootStateObj
// >('session/register', async (params, config) => {
//   try {
//     return await registerUser(params);
//   } catch (error) {
//     return config.rejectWithValue(error);
//   }
// });
// const deleteWpUserThunk = createAsyncThunk<
//   // Return type of the payload creator
//   DeleteWpUserResponse,
//   // First argument to the payload creator (provide void if there isn't one)
//   WpDeleteRequestType,
//   // Types for ThunkAPI
//   RootStateObj
// >('session/deleteWpUser', async (params, config) => {
//   try {
//     return await deleteWpUser(params);
//   } catch (error) {
//     return config.rejectWithValue(error);
//   }
// });

// const generateVerificationCodeThunk = createAsyncThunk<
//   // Return type of the payload creator
//   GenerateCodeResponse,
//   // First argument to the payload creator (provide void if there isn't one)
//   GenerateCodeRequest,
//   // Types for ThunkAPI
//   RootStateObj
// >('session/generateVerificationCode', async (params, config) => {
//   try {
//     return await generateVerificationCode(params);
//   } catch (error) {
//     return config.rejectWithValue(error);
//   }
// });

// const sendVerificationCodeThunk = createAsyncThunk<
//   // Return type of the payload creator
//   UpdateCodeResponse,
//   // First argument to the payload creator (provide void if there isn't one)
//   UpdateCodeRequest,
//   // Types for ThunkAPI
//   RootStateObj
// >('session/sendVerificationCode', async (params, config) => {
//   try {
//     return await sendVerificationCode(params);
//   } catch (error) {
//     return config.rejectWithValue(error);
//   }
// });

// const authRequestThunk = createAsyncThunk<
//   // Return type of the payload creator
//   AuthResponse,
//   // First argument to the payload creator (provide void if there isn't one)
//   AuthRequest,
//   // Types for ThunkAPI
//   RootStateObj
// >('session/authRequest', async (params, config) => {
//   try {
//     return await authRequest(params);
//   } catch (error) {
//     return config.rejectWithValue(error);
//   }
// });

// const resetPasscodeThunk = createAsyncThunk<
//   // Return type of the payload creator
//   ResetPasscodeResponse,
//   // First argument to the payload creator (provide void if there isn't one)
//   ResetPasscodeRequest,
//   // Types for ThunkAPI
//   RootStateObj
// >('session/resetPasscode', async (params, config) => {
//   try {
//     return await resetPasscode(params);
//   } catch (error) {
//     return config.rejectWithValue(error);
//   }
// });

// const getMeDataThunk = createAsyncThunk<
//   // Return type of the payload creator
//   MeDataResponse,
//   // First argument to the payload creator (provide void if there isn't one)
//   void,
//   // Types for ThunkAPI
//   RootStateObj
// >('session/meData', async (_, config) => {
//   try {
//     return await getMeData();
//   } catch (error) {
//     return config.rejectWithValue(error);
//   }
// });

// const addEmailThunk = createAsyncThunk<
//   // Return type of the payload creator
//   EmailAddResponse,
//   // First argument to the payload creator (provide void if there isn't one)
//   AddEmailRequest,
//   // Types for ThunkAPI
//   RootStateObj
// >('session/addEmail', async (params, config) => {
//   try {
//     return await addPrimaryEmail(params);
//   } catch (error) {
//     return config.rejectWithValue(error);
//   }
// });
// const addPrefferedNameThunk = createAsyncThunk<
//   // Return type of the payload creator
//   EmailAddResponse,
//   // First argument to the payload creator (provide void if there isn't one)
//   AddPrefferedNameRequest,
//   // Types for ThunkAPI
//   RootStateObj
// >('session/addPrefferedName', async (params, config) => {
//   try {
//     return await addPrefferedName(params);
//   } catch (error) {
//     return config.rejectWithValue(error);
//   }
// });

// const registerUserToWordPressThunk = createAsyncThunk<
//   // Return type of the payload creator
//   RegisterWpUserResponse,
//   // First argument to the payload creator (provide void if there isn't one)
//   RegisterUserToWordPressRequestType,
//   // Types for ThunkAPI
//   RootStateObj
// >('session/registerUserToWordPress', async (params, config) => {
//   try {
//     return await registerUserToWordPress(params);
//   } catch (error) {
//     return config.rejectWithValue(error);
//   }
// });

// // export const getWordPressUserListThunk = createAsyncThunk<
// //   // Return type of the payload creator
// //   WordPressUserListResponseType,
// //   // First argument to the payload creator (provide void if there isn't one)
// //   void,
// //   // Types for ThunkAPI
// //   RootStateObj
// // >('session/wordPressUsersList', async (_, config) => {
// //   try {
// //     return await getWordPressUserList();
// //   } catch (error) {
// //     return config.rejectWithValue(error);
// //   }
// // });
// export const checkWpExistingUserThunk = createAsyncThunk<
//   // Return type of the payload creator
//   WpCheckUserResponseType,
//   // First argument to the payload creator (provide void if there isn't one)
//   WpCheckUserRequestType,
//   // Types for ThunkAPI
//   RootStateObj
// >('session/wordPressUsersCheck', async (param, _) => {
//   return await checkWpExistingUser(param);

//   // try {
//   //   return checkWpExistingUser(param);
//   // } catch (error) {
//   //   return config.rejectWithValue(error);
//   // }
// });

// export const getWcUserDetailsThunk = createAsyncThunk<
//   // Return type of the payload creator
//   UserWc,
//   // First argument to the payload creator (provide void if there isn't one)
//   WcUpdateUserRequestType,
//   // Types for ThunkAPI
//   RootStateObj
// >('session/wordPressUsersCheck', async (param, _) => {
//   return await getWcUserDetails(param);

//   // try {
//   //   return checkWpExistingUser(param);
//   // } catch (error) {
//   //   return config.rejectWithValue(error);
//   // }
// });
// export const updateUserOnWordpressThunk = createAsyncThunk<
//   // Return type of the payload creator
//   UserResponseWp,
//   // First argument to the payload creator (provide void if there isn't one)
//   WpDeleteRequestType,
//   // Types for ThunkAPI
//   RootStateObj
// >('session/wordPressUsersCheck', async (param, _) => {
//   return await updateUserToWordpress(param);

//   // try {
//   //   return checkWpExistingUser(param);
//   // } catch (error) {
//   //   return config.rejectWithValue(error);
//   // }
// });

// export const updateWcUserThunk = createAsyncThunk<
//   // Return type of the payload creator
//   UserWc,
//   // First argument to the payload creator (provide void if there isn't one)
//   WcUpdateUserRequestType,
//   // Types for ThunkAPI
//   RootStateObj
// >('session/wordPressUsersCheck', async (param, _) => {
//   return await updateWcUser(param);
// });
// export const useLogout = (navigation: Props['navigation']) => {
//   const resetStore = useResetStore();
//   const clearSession = useBindAction(sessionSlice.actions.clearSession);
//   const { restToLogin } = useResetNavigation(navigation);
//   return () => {
//     clearSession();
//     setTimeout(() => {
//       resetStore();
//     }, 100);
//     restToLogin();
//   };
// };

// export const sessionSlice = createSlice({
//   name: 'session',
//   initialState,
//   reducers: {
//     setIsForgetPassword: (state, action: PayloadAction<boolean>) => {
//       state.isForgetPassword = action.payload;
//     },

//     clearSession: (state) => {
//       state.sessionData = initialState.sessionData;
//     },
//     setUserWp: (state, action: PayloadAction<UserWp>) => {
//       state.userWp = action.payload;
//     },
//     setUserWc: (state, action: PayloadAction<UserWc>) => {
//       state.userWc = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       /** enter mobile */
//       .addCase(doLogin.fulfilled, (state, action) => {
//         // state.sessionData.user = { isExistingUser: action.payload, ...action.meta.arg };
//       })
//   },
// });
