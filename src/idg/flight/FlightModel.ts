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
