import base64 from 'react-native-base64';
import { MeDataResponse } from '../session/sessionTypes';
import { UserWp } from '../user/UserWp';

export function isValidPhoneNumber(numberr: string, country: string) {
  if (numberr && numberr.length > 2 && numberr.length < 13) {
    if (country === 'AU') {
      if (numberr.length === 9) {
        return true;
      } else {
        return false;
      }
    } else {
      try {
        const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

        const number = phoneUtil.parseAndKeepRawInput(numberr, country);

        return phoneUtil.isValidNumber(number);
      } catch (error) {
        return false;
      }
    }
  }
  return false;
}
export function getWPUserName(dataME: MeDataResponse): string {
  var wcName = dataME.preferred_name + dataME?.username.replace('+', '');

  return wcName;
}
export function getWPPassword(dataME: MeDataResponse): string {
  var email = dataME.email.replace('{', '').replace('}', '') ?? '';
  var password = email + dataME?.username;

  return password;
}

export function validateEmail(text: string) {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(text)) {
    return true;
  } else {
    return false;
  }
}

export function getTotalAmountOfProduct() {}
