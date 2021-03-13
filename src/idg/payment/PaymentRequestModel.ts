interface Baggage {
  airlineCode: string;
  flightNumber: string;
  wayType: number;
  code: string;
  description: number;
  weight: number;
  currency: string;
  price: number;
  origin: string;
  destination: string;
  //   segID: null;
}
interface Meal {
  airlineCode: string;
  flightNumber: string;
  wayType: number;
  code: string;
  description: number;
  airlineDescription: string;
  quantity: number;
  currency: string;
  price: number;
  origin: string;
  destination: string;
  segID: null;
}
interface Seat {
  airlineCode: string;
  flightNumber: string;
  craftType: string;
  origin: string;
  destination: string;
  availablityType: number;
  description: string;
  code: string;
  rowNo: string;
  seatNo: string;
  seatType: number;
  seatWayType: number;
  compartment: number;
  deck: number;
  currency: number;
  price: number;
  //   craftDeviation: null;
  //   compartmentDesignator: null;
  //   segID: null;
}
interface Passenger {
  paxId: number;
  ssr: Array<any>;
  panrequired: boolean;
  passportRequired: boolean;
  title: string;
  firstName: string;
  lastName: string;
  passengerNumber: number;
  docTypeCode: string | null;
  docNumber: string | null;
  expirationDate: string | null;

  paxType: number;
  dateOfBirth: string;
  gender: number;
  passportNo: string;
  passportExpiry: string;
  addressLine1: string;
  addressLine2: string;
  totalCost: string | null;
  balanceDue: string | null;
  issuedDate: string;
  seatDynamic: Array<Seat>;
  mealDynamic: Array<Meal>;
  baggage: Array<Baggage>;
  //   fare: null;
  city: string;
  countryCode: string;
  countryName: string;
  nationality: string;
  contactNo: string;
  email: string;
  isLeadPax: boolean;

  fFAirlineCode: string | null;
  fFNumber: string | null;
  gSTCompanyAddress: string | null;
  gSTCompanyContactNumber: string | null;
  gSTCompanyName: string | null;
  gSTNumber: string | null;
  gSTCompanyEmail: string | null;
  ticket: string | null;
  SegmentAdditionalInfo: string | null;
  items: string | null;
  IsPANRequired: boolean;
  IsPassportRequired: boolean;
  PAN: string | null;
}
interface FlightDetails {
  origin: string;
  destination: string;
  //   artSupplierCredential: null;
  //   result: null;
  //   agency: null;
  //   fareType: null;
  //   tokenId: null;
  adultCount: number;
  childCount: number;
  infantCount: number;
  directFlight: boolean;
  specialFareType: string;
  nextDayFlag: boolean;
  journeyType: string;
  prefclass: string;
  resultCategory: string;
  //   oneWayResultIndex: null;
  //   roundTripResultIndex: null;
  //   traceId: null;
  //   preferredAirlines: null;
  segments: Array<{
    //   depTime: null;
    //   depDate: null;
    //   arrivalAirport: null;
    //   departureAirport: null;
    origin: string;
    //   IsReturn: null;
    destination: string;
    flightCabinClass: string;
    //   DepartureAirport: null;
    //   ArrivalAirport: null;
    //   DepDate: null;
    //   DepTime: null;
    preferredDepartureTime: string;
    //   preferredArrivalTime: null;
  }>;
  //   sources: null;
  onwarddate: string;
  returndate: string;
  //   leastPrice: null;
  //   highestPrice: null;
  gSTDetailsRequired: boolean;
  originCountryCode: string;
  //   flightNumber: null;
  destinationCountryCode: string;
  domIntFlag: string;
  isSeriesFareCalendar: string;
}
export interface PaymentRequest {
  agency: string;
  resultIndex: string;
  resultSessionId: string;
  passengers: Array<Passenger>;

  //   endUserIp: null;
  //   tokenId: null;
  //   traceId: null;
  contactNo: string;
  email: string;

  gSTCompanyAddress: string | null;
  gSTCompanyContactNumber: string | null;
  gSTCompanyName: string | null;
  gSTNumber: string | null;
  gSTCompanyEmail: string | null;

  fareMismatch: boolean;
  passangerCount: number;
  publishedFare: number;
  offeredFare: number;
  pf: number;
  lcc: boolean;
  dobAirAshiya: boolean;
  gSTDetailsRequired: boolean;
  //   supplierId: null;
  //   artSSRResponse: null;
  // flightDetailsRequest: FlightDetails;
  //   sosSegment: null;
  //   adminremarks: '';
  pGUserMappingId: string;
  pGUserId?: number;
  //   encRequest: null;
}
