export interface FlightPlaces {
  airportCode: string;
  cityName: string;
  cityCode: string;
  countryName: string;
  countryCode: string;
  airportName: string;
  nationality: string;
  currency: string;
  airport: number;
}

interface FlightSegment {
  tripIndicator: number;
  segmentIndicator: number;
  airline: {
    airlineCode: string;
    airlineName: string;
    flightNumber: string;
    fareClass: string;
    operatingCarrier: string;
  };
  noOfSeatAvailable: number;
  origin: {
    airport: {
      airportCode: string;
      cityCode: string;
      countryName: string;
      airportName: string;
      terminal: string;
      cityName: string;
      countryCode: string;
    };
    depTime: string;
    depTimeMnt: number;
  };
  destination: {
    airport: {
      airportCode: string;
      cityCode: string;
      countryName: string;
      airportName: string;
      terminal: string;
      cityName: string;
      countryCode: string;
    };
    arrTime: string;
    arrTimeMnt: number;
    daysDifference: number;
  };
  groundTime: number;
  mile: number;
  stopPoint: string;
  craft: string;
  remisETicketEligibleark: boolean;
  flightStatus: string;
  status: string;
  accumulatedDuration?: string;
  cabinClass: string;
  baggage: string;
  cabinBaggage: string;
  fareRefKey?: string;
  airSegmentKey?: string;
  duration: number;
  stopOver: boolean;
  stopPointArrivalTime?: string;
  stopPointDepartureTime?: string;
  remark?: string;
  airlinePNR: string;
  flightInfoIndex: string;
  fareQuote: string;
  artFare: string;
  refundable: string;
  fareBreakdown: string;
  lcc: boolean;
}
interface FlightFareRule {
  origin: string;
  destination: string;
  airline: string;
  fareBasisCode: string;
  fareRestriction: string;
  fareRuleDetail: string;
  fareFamilyCode: string;
}
interface FlightFareBreakDown {
  currency: string;
  passengerType: number;
  additionalTxnFeeOfrd: number;
  additionalTxnFeePub: number;
  passengerCount: number;
  baseFare: number;
  tax: number;
  yQTax: number;
  pGCharge: number;
}
interface FlightFare {
  currency: string;
  additionalTxnFeeOfrd: number;
  additionalTxnFeePub: number;
  discount: number;
  totalBaggageCharges: number;
  totalSeatCharges: number;
  totalSpecialServiceCharges: number;
  sgstax: number;
  cgstax: number;
  igstax: number;
  baseFare: number;
  tax: number;
  flat: number;
  yQTax: number;
  pGCharge: number;
  artGST: number;
  artTDS: number;
  otherCharges: number;
  publishedFare: number;
  commissionEarned: number;
  pLBEarned: number;
  incentiveEarned: number;
  offeredFare: number;
  tdsOnCommission: number;
  tdsOnPLB: number;
  tdsOnIncentive: number;
  serviceFee: number;
  totalMealCharges: number;
  transactionFee: number;
  managementFee: number;
  cGSTax: number;
  sGSTax: number;
  iGSTax: number;
}
export interface FlightSet {
  freeMeal: boolean;
  lcc: boolean;
  resultSessionId: string;
  isFreeMeal: boolean;
  source: number;
  isLCC: boolean;
  refundable: string;
  isHoldAllowedWithSSR: boolean;
  isUpsellAllowed: boolean;
  isCouponAppilcable: boolean;
  gSTAllowed: boolean;
  isGSTMandatory: boolean;
  airlineRemark: string;
  fare: FlightFare;
  artFareslist: null;
  fareBreakdown: Array<FlightFareBreakDown>;
  segments: Array<Array<FlightSegment>>;
  lastTicketDate?: string;
  ticketAdvisory?: string;
  fareRules: Array<FlightFareRule>;
  airlineCode: string;
  validatingAirline: string;
  IsHoldAllowed?: any;
  penalty?: any;
  displayFareGroup: string;
  additionalProperties: any;
}
export interface FlightResponse {
  flightSet?: any;
  responseStatus: number;
  error?: any;
  traceId?: any;
  origin: string;
  destination: string;
  uniqueFlightSet: Array<FlightSet>;
  token?: any;
  results: Array<Array<FlightSet>>;
  additionalProperties: any;
}

interface Fare {
  currency: string;
  baseFare: number;
  tax: number;
  flat: number;
  yQTax: number;
  additionalTxnFeeOfrd: number;
  additionalTxnFeePub: number;
  pGCharge: number;
  artGST: number;
  artTDS: number;
  otherCharges: number;
  discount: number;
  publishedFare: number;
  commissionEarned: number;
  pLBEarned: number;
  incentiveEarned: number;
  offeredFare: number;
  tdsOnCommission: number;
  tdsOnPLB: number;
  tdsOnIncentive: number;
  serviceFee: number;
  totalBaggageCharges: number;
  totalMealCharges: number;
  totalSeatCharges: number;
  totalSpecialServiceCharges: number;
  transactionFee: number;
}
interface FareBreakDown {
  currency: string;
  passengerType: number;
  passengerCount: number;
  baseFare: number;
  tax: number;
  yQTax: number;
  additionalTxnFeeOfrd: number;
  additionalTxnFeePub: number;
  pGCharge: number;
}
interface Baggage {
  airlineCode: string;
  flightNumber: string;
  wayType: string;
  code: string;
  description: string;
  weight: number;
  currency: string;
  price: number;
  origin: string;
  destination: string;
}
interface MealDynamic {
  airlineCode: string;
  flightNumber: string;
  wayType: string;
  code: string;
  description: string;
  airlineDescription: string;
  quantity: string;
  currency: string;
  price: number;
  origin: string;
  destination: string;
}

export interface FlightFareResponse {
  error: string;
  isPriceChanged: boolean;
  responseStatus: number;
  traceId: string;
  results: {
    freeMeal: boolean;
    resultSessionId: string;
    isFreeMeal: boolean;
    source: number;
    isLCC: boolean;
    refundable: null;
    isHoldAllowedWithSSR: boolean;
    isUpsellAllowed: boolean;
    isCouponAppilcable: boolean;
    gSTAllowed: boolean;
    isGSTMandatory: boolean;
    airlineRemark: string;
    fare: Fare;
    fareBreakdown: Array<FareBreakDown>;
    segments: Array<Array<FlightSegment>>;
    lastTicketDate: string;
    ticketAdvisory: string;
    fareRules: string;
    airlineCode: string;
    validatingAirline: string;
    IsHoldAllowed: string;
    penalty: string;
    additionalProperties: {};
  };
  artSSRResponse: {
    ssrInnerResponse: {
      meal: Array<object>;
      seatPreference: Array<{
        code: string;
        description: string;
      }>;
      responseStatus: number;
      error: string;
      traceId: string;
      baggage: Array<Array<Baggage>>;
      mealDynamic: Array<Array<MealDynamic>>;

      seatDynamic: Array<object>;
      specialServices: Array<object>;
    };
  };
}
//  type flightType = '0D' |'0Y' |'1T.png' 
// '1X' |
// '2B' |
// '2E' |
//  '2I'|
// '2J' |
// '2K' |
// '2L' |
// '2M' |
//  '2O'|
// '2P' |
// '2Q' |
// '2T' |
// '2U' 
export const flightImagePath = (imageName : string) => {
//   const dict : {[key :string] : flightType} = {
//     '0D' : '0D.png',

//     '0Y' : '0Y.png',
//     '1T' : '1T.png',
//     '1X' : '1X.png',
//     '2B' : '2B.png',
//     '2E' : '2E.png',

//      '2I' : '2I.png',
//     '2J' : '2J.png',
//     '2K' : '2K.png',
//     '2L' : '2L.png',
//     '2M' : '2M.png',

//      '2O' : '2O.png',
//     '2P' : '2P.png',
//     '2Q' : '2Q.png',
//     '2T' : '2T.png',
//     '2U' : '2U.png',

//     //  '0Y' : '0Y.png',
//     // '1T' : '1T.png',
//     // '1X' : '1X.png',
//     // '2B' : '2B.png',
//     // '2E' : '2E.png',

//     //  '0Y' : '0Y.png',
//     // '1T' : '1T.png',
//     // '1X' : '1X.png',
//     // '2B' : '2B.png',
//     // '2E' : '2E.png',

//      };
// let n  = dict[imageName];
if (imageName === '0D') {
  return require('src/assets/images/0D.png');
}else if (imageName === '0Y') {
  return require('src/assets/images/0Y.png');
}else if (imageName === '0D') {
  return require('src/assets/images/0D.png');
}else if (imageName === '1T') {
  return require('src/assets/images/1T.png');
}else if (imageName === '1X') {
  return require('src/assets/images/1X.png');
}else if (imageName === '2B') {
  return require('src/assets/images/2B.png');
}else if (imageName === '2E') {
  return require('src/assets/images/2E.png');
}else if (imageName === '2F') {
  return require('src/assets/images/2F.png');
}else if (imageName === '2G') {
  return require('src/assets/images/2G.png');
}else if (imageName === '2I') {
  return require('src/assets/images/2I.png');
}else if (imageName === '2J') {
  return require('src/assets/images/2J.png');
}else if (imageName === '2K') {
  return require('src/assets/images/2K.png');
}else if (imageName === '2L') {
  return require('src/assets/images/2L.png');
}else if (imageName === '2M') {
  return require('src/assets/images/2M.png');
}else if (imageName === '2O') {
  return require('src/assets/images/2O.png');
}else if (imageName === '2P') {
  return require('src/assets/images/2P.png');
}else if (imageName === '2Q') {
  return require('src/assets/images/2Q.png');
}else if (imageName === '2T') {
  return require('src/assets/images/2T.png');
}else if (imageName === '2U') {
  return require('src/assets/images/2U.png');
}else if (imageName === '2W') {
  return require('src/assets/images/2W.png');
}else if (imageName === '2X') {
  return require('src/assets/images/2X.png');
}else if (imageName === '2Y') {
  return require('src/assets/images/2Y.png');
}else if (imageName === '3A') {
  return require('src/assets/images/3A.png');
}else if (imageName === '3B') {
  return require('src/assets/images/3B.png');
}else if (imageName === '3C') {
  return require('src/assets/images/3C.png');
}else if (imageName === '3D') {
  return require('src/assets/images/3D.png');
}else if (imageName === '3E') {
  return require('src/assets/images/3E.png');
}else if (imageName === '3F') {
  return require('src/assets/images/3F.png');
}else if (imageName === '3H') {
  return require('src/assets/images/3H.png');
}else if (imageName === '3K') {
  return require('src/assets/images/3K.png');
}else if (imageName === '3L') {
  return require('src/assets/images/3L.png');
}else if (imageName === '3M') {
  return require('src/assets/images/3M.png');
}else if (imageName === '3O') {
  return require('src/assets/images/3O.png');
}else if (imageName === '3Q') {
  return require('src/assets/images/3Q.png');
}else if (imageName === '3R') {
  return require('src/assets/images/3R.png');
}else if (imageName === '3S') {
  return require('src/assets/images/3S.png');
}else if (imageName === '3U') {
  return require('src/assets/images/3U.png');
}else if (imageName === '3X') {
  return require('src/assets/images/3X.png');
}else if (imageName === '3Y') {
  return require('src/assets/images/3Y.png');
}else if (imageName === '3Z') {
  return require('src/assets/images/3Z.png');
}else if (imageName === '4A') {
  return require('src/assets/images/4A.png');
}else if (imageName === '4B') {
  return require('src/assets/images/4B.png');
}else if (imageName === '4C') {
  return require('src/assets/images/4C.png');
}else if (imageName === '4D') {
  return require('src/assets/images/4D.png');
}else if (imageName === '4F') {
  return require('src/assets/images/4F.png');
}else if (imageName === '4G') {
  return require('src/assets/images/4G.png');
}else if (imageName === '4H') {
  return require('src/assets/images/4H.png');
}else if (imageName === '4I') {
  return require('src/assets/images/4I.png');
}else if (imageName === '4J') {
  return require('src/assets/images/4J.png');
}else if (imageName === '4K') {
  return require('src/assets/images/4K.png');
}else if (imageName === '4L') {
  return require('src/assets/images/4L.png');
}else if (imageName === '4M') {
  return require('src/assets/images/4M.png');
}else if (imageName === '4N') {
  return require('src/assets/images/4N.png');
}else if (imageName === '4O') {
  return require('src/assets/images/4O.png');
}else if (imageName === '4P') {
  return require('src/assets/images/4P.png');
}else if (imageName === '4Q') {
  return require('src/assets/images/4Q.png');
}else if (imageName === '4R') {
  return require('src/assets/images/4R.png');
}else if (imageName === '4T') {
  return require('src/assets/images/4T.png');
}else if (imageName === '4U') {
  return require('src/assets/images/4U.png');
}else if (imageName === '4V') {
  return require('src/assets/images/4V.png');
}else if (imageName === '4W') {
  return require('src/assets/images/4W.png');
}else if (imageName === '4Y') {
  return require('src/assets/images/4Y.png');
}else if (imageName === '5B') {
  return require('src/assets/images/5B.png');
}else if (imageName === '5C') {
  return require('src/assets/images/5C.png');
}else if (imageName === '5D') {
  return require('src/assets/images/5D.png');
}else if (imageName === '5E') {
  return require('src/assets/images/5E.png');
}else if (imageName === '5F') {
  return require('src/assets/images/5F.png');
}else if (imageName === '5G') {
  return require('src/assets/images/5G.png');
}else if (imageName === '5H') {
  return require('src/assets/images/5H.png');
}else if (imageName === '5J') {
  return require('src/assets/images/5J.png');
}else if (imageName === '5K') {
  return require('src/assets/images/5K.png');
}else if (imageName === '5L') {
  return require('src/assets/images/5L.png');
}else if (imageName === '5M') {
  return require('src/assets/images/5M.png');
}else if (imageName === '5N') {
  return require('src/assets/images/5N.png');
}else if (imageName === '5O') {
  return require('src/assets/images/5O.png');
}else if (imageName === '5P') {
  return require('src/assets/images/5P.png');
}else if (imageName === '5Q') {
  return require('src/assets/images/5Q.png');
}else if (imageName === '5S') {
  return require('src/assets/images/5S.png');
}else if (imageName === '5T') {
  return require('src/assets/images/5T.png');
}else if (imageName === '5U') {
  return require('src/assets/images/5U.png');
}else if (imageName === '5V') {
  return require('src/assets/images/5V.png');
}else if (imageName === '5W') {
  return require('src/assets/images/5W.png');
}else if (imageName === '5X') {
  return require('src/assets/images/5X.png');
}else if (imageName === '5Z') {
  return require('src/assets/images/5Z.png');
}else if (imageName === '6C') {
  return require('src/assets/images/6C.png');
}else if (imageName === '6E') {
  return require('src/assets/images/6E.png');
}else if (imageName === '6G') {
  return require('src/assets/images/6G.png');
}else if (imageName === '6H') {
  return require('src/assets/images/6H.png');
}else if (imageName === '6J') {
  return require('src/assets/images/6J.png');
}else if (imageName === '6L') {
  return require('src/assets/images/6L.png');
}else if (imageName === '6N') {
  return require('src/assets/images/6N.png');
}else if (imageName === '6Q') {
  return require('src/assets/images/6Q.png');
}else if (imageName === '6T') {
  return require('src/assets/images/6T.png');
}else if (imageName === '6Y') {
  return require('src/assets/images/6Y.png');
}else if (imageName === '7A') {
  return require('src/assets/images/7A.png');
}else if (imageName === '7D') {
  return require('src/assets/images/7D.png');
}else if (imageName === '7F') {
  return require('src/assets/images/7F.png');
}else if (imageName === '7I') {
  return require('src/assets/images/7I.png');
}else if (imageName === '7J') {
  return require('src/assets/images/7J.png');
}else if (imageName === '7Q') {
  return require('src/assets/images/7Q.png');
}else if (imageName === '7V') {
  return require('src/assets/images/7V.png');
}else if (imageName === '7W') {
  return require('src/assets/images/7W.png');
}else if (imageName === '7Z') {
  return require('src/assets/images/7Z.png');
}else if (imageName === '8A') {
  return require('src/assets/images/8A.png');
}else if (imageName === '8D') {
  return require('src/assets/images/8D.png');
}else if (imageName === '8E') {
  return require('src/assets/images/8E.png');
}else if (imageName === '8F') {
  return require('src/assets/images/8F.png');
}else if (imageName === '8H') {
  return require('src/assets/images/8H.png');
}else if (imageName === '') {
  return require('src/assets/images/0D.png');
}
 
  return require('src/assets/images/0D.png');
}
 