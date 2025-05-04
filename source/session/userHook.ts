// import { Alert } from 'react-native';
// import AppConstants from 'src/utility/AppConstants';
// import KeyConstants from 'src/utility/KeyConstants';
// import { configureWooProductClientHeaders } from '../aylaClient';
// import {
//   configureStripePayoutHeadersAPI,
//   configureWooClientProductHeadersAPI,
// } from '../configureAPIHeaders';
// import { useResetNavigation } from '../navigation/hook';
// import { useBindAction, useSliceSelector } from '../redux/hooks';
// import { UserWc } from '../user/UserWc';
// import { UserResponseWp, UserWp } from '../user/UserWp';
// import { getWPPassword, getWPUserName } from '../utils/AppUtility';
// import { sessionSlice, useSession } from './sessionSlice';
// import { MeDataResponse } from './sessionTypes';

// export const useWordpressRegistration = () => {
//   const {
//     addPrefferedName,
//     registerToWordPress,
//     getMeData,
//     checkWpRegisterUser,
//     updateUserOnWordpress,
//     deleteWpUserRequest,
//     getWcUserDetail,
//   } = useSession();

//   const setUserWp = useBindAction(sessionSlice.actions.setUserWp);
//   const setUserWc = useBindAction(sessionSlice.actions.setUserWc);
//   const { userWp } = useSliceSelector('session');
//   const configHeader = (_userWp: UserWp) => {
//     configureWooClientProductHeadersAPI(_userWp.username, _userWp.password);
//     // configureStripePayoutHeadersAPI('acct_1OzAcWCpmV7D6kUe');
//   };
//   return (data: MeDataResponse) =>
//     new Promise<boolean>((resolve, reject) => {
//       const saveUser = (_userWp: UserWp) => {
//         setUserWp(_userWp);
//         configHeader(_userWp);
//         resolve(true);
//       };

//       const sveWcUser = (_userWc: UserWc) => {
//         setUserWc(_userWc);
//       };
//       if (userWp) {
//         configHeader(userWp);
//         resolve(true);
//         return;
//       }
//       // getMeData().then((data) => {

//       // const data = sessionData.meData;
//       console.log('Data are ', data);
//       if (!data) {
//         reject(false);
//         return;
//       }
//       var email = data.email.replace('{', '').replace('}', '') ?? '';
//       var password = getWPPassword(data);
//       var username = getWPUserName(data);
//       const registerUser = () => {
//         registerToWordPress({
//           username: username,
//           name: data.preferred_name,
//           first_name: data.preferred_name,
//           last_name: data.preferred_name,
//           email: email,
//           password: password,
//           roles: AppConstants.VENDORE_ROLE,
//         })
//           .then((registerResponse) => {
//             getWcUserDetail({ id: registerResponse.id })
//               .then((wcResponse) => {
//                 sveWcUser(wcResponse);
//               })
//               .catch((error) => {});
//             saveUser({ ...registerResponse, password });
//           })
//           .catch(reject);
//       };
//       checkWpRegisterUser({ email: email })
//         .then((checkResponse) => {
//           console.log('WP USER RESPONSE is', checkResponse);
//           const length = checkResponse.length;

//           if (length) {
//             const userResponseWp = checkResponse.find(
//               (obj) => obj.slug.toLowerCase() === username.toLowerCase()
//             );
//             if (userResponseWp) {
//               getWcUserDetail({ id: userResponseWp.id })
//                 .then((wcResponse) => {
//                   sveWcUser(wcResponse);
//                 })
//                 .catch((error) => {});
//               saveUser({ ...userResponseWp, password, email, username });
//             } else {
//               if (length > 1) {
//                 const userOldUserName = checkResponse.find(
//                   (obj) => obj.slug.toLowerCase() === data.preferred_name.toLowerCase()
//                 );
//                 if (userOldUserName) {
//                   deleteWpUserRequest({ id: userOldUserName.id })
//                     .then((deleteResponse) => {
//                       registerUser();
//                     })
//                     .catch(reject);
//                   // saveUser({ ...userOldUserName, password: data.preferred_name, email, username });
//                 } else {
//                   //ToDo need to check if there are multiple records
//                   Alert.alert('', 'Multiple user with same email id.');
//                   reject();
//                   return;
//                 }
//               } else {
//                 deleteWpUserRequest({ id: checkResponse[0].id })
//                   .then((deleteResponse) => {
//                     registerUser();
//                   })
//                   .catch(reject);
//               }
//             }
//           } else {
//             registerUser();
//           }
//         })
//         .catch(reject);
//       // });
//     });
// };
