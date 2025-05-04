// // import { CountryCode } from 'src/models/AccountDetailType';
// // import { ProfileModel } from '../profiles/ProfileModel';
// // import { UserSearchWp, UserResponseWp } from '../user/UserWp';

// // export const E_LOGIN = 'api/users/user';
// // export const E_REGISTER_USER = 'api/users/registrations';
// // export const E_VERIFICATION_CODE = 'api/users/send-verification-code';
// // export const E_UPDATE_VERIFICATION_CODE = 'api/users/code-verification';
// // export const E_AUTH = 'oauth/token';
// // export const E_RESET_PASSCODE = 'api/users/reset-passcode';
// // export const E_ME_DATA = 'api/me';
// // export const E_ADD_PRIMARY_EMAIL = 'api/users';
// // export const E_REGISTER_USER_ON_WORDPRESS = 'wp-json/wp/v2/users';
// // export const E_UPDATE_USER = 'wp-json/wc/v2/customers';
// // export type SessionEndpoint =
// //   | typeof E_LOGIN
// //   | typeof E_REGISTER_USER
// //   | typeof E_VERIFICATION_CODE
// //   | typeof E_UPDATE_VERIFICATION_CODE
// //   | typeof E_AUTH
// //   | typeof E_RESET_PASSCODE
// //   | typeof E_ME_DATA
// //   | typeof E_REGISTER_USER_ON_WORDPRESS
// //   | typeof E_ADD_PRIMARY_EMAIL;

// export type User = {
//   username: string;
// };

// export type LoginRequest = User;

// export type LoginResponse = boolean;

// // export type RegisterUserRequest = {
// //   username: string;
// //   hashed_passcode: string;
// //   country_code: string;
// // };

// // export type RegisterUserResponse = {
// //   achievement_added: boolean;
// //   added_invitation_code: boolean;
// //   app_access: boolean;
// //   bank_account_status: string;
// //   bill_status: string;
// //   carbon_offset: string;
// //   created_at: string;
// //   created_by: number;
// //   enabled: boolean;
// //   full_name: string;
// //   hashed_passcode: string;
// //   id: number;
// //   id_status: string;
// //   identity: string;
// //   payment_preference: boolean;
// //   pub_id: string;
// //   service_type_added: boolean;
// //   two_factor_enabled: boolean;
// //   updated_at: string;
// //   updated_by: number;
// //   username: string;
// // };

// // export type GenerateCodeRequest = {
// //   username: string;
// //   hashedPasscode: string;
// //   countryCode: string;
// // };
// // export type GenerateCodeResponse = {};
// // export type DeleteWpUserResponse = {};

// // export type UpdateCodeRequest = {
// //   username: string;
// //   verificationCode: string;
// //   reset: boolean;
// //   countryCode: string;
// // };
// // export type UpdateCodeResponse = boolean;

// // export type AuthRequest = {
// //   grant_type: string;
// //   username: string;
// //   passcode: string;
// //   country_code: string;
// // };
// // export type AuthResponse = {
// //   access_token: string;
// //   token_type: string;
// //   refresh_token: string;
// //   expires_in: number;
// //   scope: string;
// // };

// // export type ResetPasscodeRequest = {
// //   username: string;
// //   hashed_passcode: string;
// //   country_code: string;
// // };
// // export type ResetPasscodeResponse = {};

// // export type MeDataResponse = ProfileModel;

// // export type EmailAddResponse = {};
// // export type RegisterWpUserResponse = UserResponseWp;

// // export type AddEmailRequest = {
// //   email: string;
// //   userId: string;
// // };
// // export type AddPrefferedNameRequest = {
// //   name: string;
// //   userId: string;
// // };

// // export type RegisterUserToWordPressRequestType = {
// //   username: string;
// //   name: string;
// //   first_name: string;
// //   last_name: string;
// //   email: string;
// //   password: string;
// //   roles: string;
// // };
// // // export type RegisterUserToWordPressRequestType = {
// // //   requestData: string;
// // // };
// // export type WordPressUserDetailType = {
// //   id: number;
// //   name: string;
// //   url: string;
// //   description: string;
// //   link: string;
// //   slug: string;
// // };
// // export type WpDeleteRequestType = {
// //   id: number;
// // };

// // export type WpCheckUserRequestType = {
// //   email: string;
// // };
// // export type WpUserCheckResponseType = {
// //   data: Array<WpCheckUserResponseType>;
// // };
// // export type WpCheckUserResponseType = Array<UserSearchWp>;

// // export type WcUpdateUserRequestType = {
// //   id: number;
// //   meta_data?: Array<WcMetaDataType>;
// //   shipping?: WcUserShippingType;
// // };
// // export type WcUserShippingType = {
// //   first_name?: string;
// //   last_name?: string;
// //   company?: string;
// //   address_1?: string;
// //   address_2?: string;
// //   city?: string;
// //   postcode?: string;
// //   country?: string;
// //   state?: string;
// //   phone?: string;
// // };
// // export type WcMetaDataType = {
// //   id?: number;
// //   key: string;
// //   value: any;
// //   display_key?: string;
// //   display_value?: string;
// // };
// // // export type WordPressUserListResponseType = Array<WordPressUserDetailType>;
