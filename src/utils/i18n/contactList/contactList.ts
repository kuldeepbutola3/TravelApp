import {selectContact} from 'react-native-select-contact';
import {PermissionsAndroid, Platform} from 'react-native';

interface ContactBook {
  firstName?: string;
  lastName?: string;
  email?: string;
}

async function requestContactPermission(): Promise<boolean> {
  if (Platform.OS === 'ios') {
    return true;
  }
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}
export async function openContactList(): Promise<ContactBook | undefined> {
  const permision = await requestContactPermission();
  if (!permision) {
    return undefined;
  }
  const selection = await selectContact();
  if (!selection) {
    return {};
  }

  const {name, emails} = selection;
  const nameArray = name.split(' ');
  const lname = nameArray.length > 1 ? nameArray.pop() : undefined;
  const contact = {
    firstName: nameArray.join(' '),
    lastName: lname,
    email: emails.pop()?.address,
  };
  return contact;
}
