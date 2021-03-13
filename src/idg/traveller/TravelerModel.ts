export type Gender = 'male' | 'female';

export interface BookingInfo {
  email: string;
  contactNumber: string;
}

export interface TravellerCount {
  adult: number;
  children: number;
  infant: number;
}
export interface Traveller {
  id: number;
  isChild: boolean;
  fName: string;
  lName: string;
  dob: string;
  nationality: string;
  passportNo: string;
  expDate: string;
  gender: Gender;
}
