// // import {
// //   getAylaClient,
// //   getAylaData,
// //   getAylaTextClient,
// //   getWooClient,
// //   getWordPressClient,
// // } from '../aylaClient';
// // import { AylaError } from '../aylaError';
// // import { configureAPIHeaders } from '../configureAPIHeaders';
// import {
//   AddEmailRequest,
//   AddPrefferedNameRequest,
//   RegisterUserToWordPressRequestType,
//   AuthRequest,
//   AuthResponse,
//   EmailAddResponse,
//   E_ADD_PRIMARY_EMAIL,
//   E_AUTH,
//   E_LOGIN,
//   E_ME_DATA,
//   E_REGISTER_USER_ON_WORDPRESS,
//   E_REGISTER_USER,
//   E_RESET_PASSCODE,

//   LoginRequest,
//   LoginResponse,
// } from './sessionTypes';
// // // import { getDeviceToken } from 'src/utility/PushNotification';
// // // import { Platform } from 'react-native';
// // // import { UserResponseWp } from '../user/UserWp';
// // // import { UserWc } from '../user/UserWc';
// // export async function sendVerificationCode(
// //   params: UpdateCodeRequest,
// // ): Promise<UpdateCodeResponse> {
// //   // console.log('api.............', E_UPDATE_VERIFICATION_CODE);
// //   // console.log('getAylaData.............', params);
// //   return getAylaData<UpdateCodeResponse>(E_UPDATE_VERIFICATION_CODE, params)
// //     .then(data => {
// //       // console.log('data...............', data);
// //       return data;
// //     })
// //     .catch((error: URIError) => {
// //       // console.log('error.........', error);
// //       return Promise.reject(error.message ?? error);
// //     });
// // }

// // export async function generateVerificationCode(
// //   params: GenerateCodeRequest,
// // ): Promise<GenerateCodeResponse> {
// //   // console.log('api.............', E_VERIFICATION_CODE);
// //   // console.log('getAylaData.............', params);
// //   return getAylaData<GenerateCodeResponse>(E_VERIFICATION_CODE, params)
// //     .then(data => {
// //       // console.log('data.........', data);
// //       return data;
// //     })
// //     .catch((error: URIError) => {
// //       // console.log('error.........', error);
// //       return Promise.reject(error.message ?? error);
// //     });
// // }

// // export async function registerUser(
// //   params: RegisterUserRequest,
// // ): Promise<RegisterUserResponse> {
// //   console.log('api.............', E_REGISTER_USER);
// //   console.log('params.........', params);
// //   return getAylaClient()
// //     .post<RegisterUserResponse>(E_REGISTER_USER, params)
// //     .then(({ data }) => {
// //       console.log('data.........', data);
// //       return data;
// //     })
// //     .catch((error: URIError) => {
// //       console.log('error.........', error);
// //       return Promise.reject(error.message ?? error);
// //     });
// // }

// // // export async function getProductList(): Promise<ProductResponse> {
// // //   console.log('api.............', E_GET_PRODUCT);
// // //   // console.log('params.........', params);
// // //   return getProductClient()
// // //     .get<ProductResponse>(E_GET_PRODUCT)
// // //     .then(({ data }) => {
// // //       console.log('data.........PRODUCT IS', data);
// // //       return data;
// // //     })
// // //     .catch((error: URIError) => {
// // //       console.log('error.........PRODUCT IS', error);
// // //       return Promise.reject(error.message ?? error);
// // //     });
// // // }

// export async function login(params: LoginRequest): Promise<LoginResponse> {
//   console.log('api.............', E_LOGIN);
//   return getAylaData<LoginResponse>(E_LOGIN, params)
//     .then(data => {
//       console.log('data.........', data);
//       return data;
//     })
//     .catch((error: URIError) => {
//       console.log('herrrrr.........', error);
//       return Promise.reject(error.message ?? error);
//     });
// }

// // // export async function sendDeviceToken(params: LoginRequest): Promise<LoginResponse> {
// // //   // console.log('api.............', E_LOGIN);
// // //   var deviceToken = await getDeviceToken();
// // //   var device = Platform.OS.toUpperCase();
// // //   var body = JSON.stringify({
// // //     device_type: device,
// // //     token: deviceToken,
// // //   });

// // //   return getAylaClient()
// // //     .post<LoginResponse>(`${E_ADD_PRIMARY_EMAIL}/${params.userId}/device-token`, body)
// // //     .then(({ data }) => {
// // //       console.log('data.........', data);
// // //       return data;
// // //     })
// // //     .catch((error: URIError) => {
// // //       console.log('herrrrr.........', error);
// // //       return Promise.reject(error.message ?? error);
// // //     });
// // // }
// // export async function authRequest(params: AuthRequest): Promise<AuthResponse> {
// //   console.log('api.............', E_AUTH);
// //   configureAPIHeaders();
// //   const formData = new URLSearchParams();
// //   formData.append('grant_type', params.grant_type);
// //   formData.append('username', params.username);
// //   formData.append('passcode', params.passcode);
// //   formData.append('country_code', params.country_code);

// //   return getAylaClient()
// //     .post<AuthResponse>(E_AUTH, formData)
// //     .then(({ data }) => {
// //       console.log('authRequest.........Token is', data.access_token);
// //       configureAPIHeaders({
// //         token: data.access_token,
// //         tokenType: data.token_type,
// //       });
// //       return data;
// //     })
// //     .catch((error: AylaError) => {
// //       console.log(
// //         'authRequest eeeeeeeeeeeeeeeeee.........',
// //         JSON.stringify(error),
// //       );
// //       return Promise.reject(error?.error_description ?? '');
// //     });
// // }
// // export async function resetPasscode(
// //   params: ResetPasscodeRequest,
// // ): Promise<ResetPasscodeResponse> {
// //   console.log('api.............', E_RESET_PASSCODE);
// //   return getAylaClient()
// //     .post<ResetPasscodeResponse>(E_RESET_PASSCODE, params)
// //     .then(({ data }) => {
// //       console.log('authRequest.........', data);

// //       return data;
// //     })
// //     .catch((error: URIError) => {
// //       console.log('authRequest.........', error);
// //       return Promise.reject(error.message ?? error);
// //     });
// // }

// // export async function getMeData(): Promise<MeDataResponse> {
// //   console.log('api.............', E_ME_DATA);
// //   console.log('authRequest.........params');

// //   return getAylaData<MeDataResponse>(E_ME_DATA)
// //     .then(data => {
// //       console.log('authRequest.........', data);
// //       return data;
// //     })
// //     .catch((error: URIError) => {
// //       console.log('authRequest.........', error);
// //       return Promise.reject(error.message ?? error);
// //     });
// // }

// // export async function addPrimaryEmail(
// //   params: AddEmailRequest,
// // ): Promise<EmailAddResponse> {
// //   console.log(
// //     'api.............',
// //     E_ADD_PRIMARY_EMAIL + '/' + params.userId + '/email',
// //   );
// //   console.log('authRequest.........params', params);
// //   // configureAPIHeaders();
// //   var email = params.email;

// //   const client = getAylaTextClient();
// //   console.log('api.............', client.defaults.headers);

// //   return client
// //     .patch<EmailAddResponse>(
// //       `${E_ADD_PRIMARY_EMAIL}/${params.userId}/email`,
// //       `{${email}}`,
// //     )
// //     .then(data => {
// //       console.log('authRequest.........In', data);
// //       return data;
// //     })
// //     .catch((error: URIError) => {
// //       console.log('authRequest.........ee', error.message);
// //       return Promise.reject(error.message ?? error);
// //     });
// // }
// // export async function addPrefferedName(
// //   params: AddPrefferedNameRequest,
// // ): Promise<EmailAddResponse> {
// //   // configureAPIHeaders();
// //   return getAylaTextClient()
// //     .patch<EmailAddResponse>(
// //       `${E_ADD_PRIMARY_EMAIL}/${params.userId}/preferredName`,
// //       params.name,
// //     )
// //     .then(data => {
// //       console.log('authRequest.........In', data);
// //       return data;
// //     })
// //     .catch((error: URIError) => {
// //       console.log('authRequest.........ee', error.message);
// //       return Promise.reject(error.message ?? error);
// //     });
// // }
// // export async function registerUserToWordPress(
// //   params: RegisterUserToWordPressRequestType,
// // ): Promise<RegisterWpUserResponse> {
// //   console.log('apiWORDPRESS.............', E_REGISTER_USER_ON_WORDPRESS);
// //   console.log('authRequest.........params', params);
// //   // configureAPIHeaders();

// //   const response = await getWordPressClient()
// //     .post<RegisterWpUserResponse>(E_REGISTER_USER_ON_WORDPRESS, params)
// //     .then(data => {
// //       console.log('authRequestSUCCESS.........In', data);
// //       return data;
// //     })
// //     .catch((error: URIError) => {
// //       console.log('authRequestERROR.........ee', JSON.stringify(error));
// //       return Promise.reject(error.message ?? error);
// //     });
// //   return response.data;
// // }

// // export async function updateUserToWordpress(
// //   params: WpDeleteRequestType,
// // ): Promise<UserResponseWp> {
// //   console.log('apiWORDPRESS.............', E_REGISTER_USER_ON_WORDPRESS);
// //   console.log('authRequest.........params', params);
// //   // configureAPIHeaders();
// //   const response = await getWordPressClient()
// //     .post<UserResponseWp>(E_REGISTER_USER_ON_WORDPRESS, params)
// //     .then(data => {
// //       console.log('authRequestSUCCESS.........In', data);
// //       return data;
// //     })
// //     .catch((error: URIError) => {
// //       console.log('authRequestERROR.........ee', JSON.stringify(error));
// //       return Promise.reject(error.message ?? error);
// //     });
// //   return response.data;
// // }

// // export async function deleteWpUser(
// //   params: WpDeleteRequestType,
// // ): Promise<DeleteWpUserResponse> {
// //   console.log(
// //     'apiWORDPRESS.............',
// //     `${E_REGISTER_USER_ON_WORDPRESS}/${params.id}`,
// //   );
// //   console.log('authRequest.........params', params);
// //   // configureAPIHeaders();
// //   const response = await getWordPressClient()
// //     .delete<DeleteWpUserResponse>(
// //       `${E_REGISTER_USER_ON_WORDPRESS}/${params.id}?reassign=1&force=true`,
// //     )
// //     .then(data => {
// //       return data;
// //     })
// //     .catch((error: URIError) => {
// //       console.log('ERROR.........................params', error);

// //       return Promise.reject(error.message ?? error);
// //     });
// //   return response.data;
// // }

// // export async function checkWpExistingUser(
// //   params: WpCheckUserRequestType,
// // ): Promise<WpCheckUserResponseType> {
// //   console.log('authRequest.........params', params);
// //   // configureAPIHeaders();
// //   const data = await getWordPressClient()
// //     .get<WpCheckUserResponseType>(
// //       `${E_REGISTER_USER_ON_WORDPRESS}?search=${params.email}`,
// //     )
// //     .then(data => {
// //       console.log('authRequestSUCCESS.........In', data);
// //       return data;
// //     })
// //     .catch((error: URIError) => {
// //       console.log('authRequestERROR.........ee', JSON.stringify(error));
// //       return Promise.reject(error.message ?? error);
// //     });
// //   return data.data;
// // }
// // export async function updateWcUser(
// //   params: WcUpdateUserRequestType,
// // ): Promise<UserWc> {
// //   console.log('authRequest.........params', params);
// //   // configureAPIHeaders();
// //   const data = await getWooClient()
// //     .put<UserWc>(`${E_UPDATE_USER}/${params.id}`, params)
// //     .then(data => {
// //       console.log('authRequestSUCCESS.........In', data);
// //       return data;
// //     })
// //     .catch((error: URIError) => {
// //       console.log('authRequestERROR.........ee', JSON.stringify(error));
// //       return Promise.reject(error.message ?? error);
// //     });
// //   return data.data;
// // }
// // export async function getWcUserDetails(
// //   params: WcUpdateUserRequestType,
// // ): Promise<UserWc> {
// //   console.log('authRequest.........params', params);
// //   // configureAPIHeaders();
// //   const data = await getWooClient()
// //     .get<UserWc>(`${E_UPDATE_USER}/${params.id}`)
// //     .then(data => {
// //       console.log('authRequestSUCCESS.........In', data);
// //       return data;
// //     })
// //     .catch((error: URIError) => {
// //       console.log('authRequestERROR.........ee', JSON.stringify(error));
// //       return Promise.reject(error.message ?? error);
// //     });
// //   return data.data;
// // }

// // // export async function getWordPressUserList(): Promise<WordPressUserListResponseType> {
// // //   console.log('apiWORDPRESS.............', E_REGISTER_USER_ON_WORDPRESS);
// // //   console.log('authRequest.........params');
// // //   // configureAPIHeaders();
// // //   return getWordPressClient()
// // //     .get<WordPressUserListResponseType>(E_REGISTER_USER_ON_WORDPRESS)
// // //     .then((data) => {
// // //       console.log('authRequestSUCCESS.........In', data);
// // //       return data;
// // //     })
// // //     .catch((error: URIError) => {
// // //       console.log('authRequestERROR.........ee', JSON.stringify(error));
// // //       return Promise.reject(error.message ?? error);
// // //     });
// // // }
