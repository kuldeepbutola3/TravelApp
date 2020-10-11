import { getClient } from '../IDGClient';
import { FlightFareResponse, FlightPlaces, FlightResponse } from './FlightModel';
import { formatDate } from 'src/utils/date-formatter';
import { ClassType, TripType } from 'src/constants/enums';

const FLIGHT_SEARCH = 'v1/service/search/flights';
const FLIGHT_PLACES = 'v1/service/search/get_itemName_list';
const FLIGHT_FARE = 'v1/service/search/fareQuote';

export type FlightEndpoint = typeof FLIGHT_SEARCH | typeof FLIGHT_PLACES;
export const getSessionClient = () => getClient<FlightEndpoint>();

export interface PlacesParam {
  term: string;
}

export interface FlightFareParam {
  resultSessionId: Array<string>;
}

export interface GetFlightParam {
  class: ClassType;
  originName: string;
  destinationName: string;
  originCode: string;
  destinationCode: string;
  journeyType: TripType;
  adultCount: number;
  childCount: number;
  infantCount: number;
  journeyDate1: Date;
  journeyDate2?: Date;
}

export async function getFlight(params: GetFlightParam): Promise<FlightResponse> {
  const segment = [
    {
      depTime: null,
      arrivalAirport: null,
      departureAirport: null,
      depDate: null,
      origin: params.originCode,
      IsReturn: null,
      destination: params.destinationCode, //'BOM',
      flightCabinClass: '1',
      DepartureAirport: null,
      ArrivalAirport: null,
      DepDate: null,
      DepTime: null,
      preferredDepartureTime: formatDate(params.journeyDate1, 'YYYY-MM-DD') + 'T00:00:00',
      preferredArrivalTime: null,
    },
  ];
  if (params.journeyType === TripType.RoundTrip) {
    segment.push({
      depTime: null,
      arrivalAirport: null,
      departureAirport: null,
      depDate: null,
      origin: params.destinationCode,
      IsReturn: null,
      destination: params.originCode,
      flightCabinClass: '1',
      DepartureAirport: null,
      ArrivalAirport: null,
      DepDate: null,
      DepTime: null,
      preferredDepartureTime: formatDate(params.journeyDate2!, 'YYYY-MM-DD') + 'T00:00:00',
      preferredArrivalTime: null,
    });
  }

  const param = {
    origin: params.originName,
    destination: params.destinationName, // '(BOM) Mumbai,India',
    agency: '16flightapi.besttoursofindia.in',
    endUserIp: '182.68.159.210',
    tokenId: null,
    adultCount: params.adultCount,
    childCount: params.childCount,
    infantCount: params.infantCount,
    directFlight: false,
    oneStopFlight: false,
    nextDayFlag: false,
    journeyType: params.journeyType === TripType.OneWay ? 1 : 2,
    prefclass: null,
    oneWayResultIndex: null,
    roundTripResultIndex: null,
    traceId: null,
    preferredAirlines: null,
    segments: segment,
    sources: ['G8', 'SG', 'AI', '9W', 'UK', '6E', 'I5', 'GDS', 'ANY'],
    onwarddate: '2020-11-21',
    returndate: '',
    leastPrice: null,
    highestPrice: null,
    gSTDetailsRequired: false,
    originCountryCode: 'IN',
    destinationCountryCode: 'IN',
    domIntFlag: 'D',
  };
  // const param = {
  //   origin: '(DEL) New Delhi,India',
  //   destination: '(SIN) Singapore,Singapore', // '(BOM) Mumbai,India',
  //   agency: '16flightapi.besttoursofindia.in',
  //   endUserIp: '182.68.159.210',
  //   tokenId: null,
  //   adultCount: 2,
  //   childCount: 1,
  //   infantCount: 1,
  //   directFlight: false,
  //   oneStopFlight: false,
  //   nextDayFlag: false,
  //   journeyType: '2',
  //   prefclass: null,
  //   oneWayResultIndex: null,
  //   roundTripResultIndex: null,
  //   traceId: null,
  //   preferredAirlines: null,
  //   segments: [
  //     {
  //       depTime: null,
  //       arrivalAirport: null,
  //       departureAirport: null,
  //       depDate: null,
  //       origin: 'DEL',
  //       IsReturn: null,
  //       destination: 'SIN', //'BOM',
  //       flightCabinClass: '1',
  //       DepartureAirport: null,
  //       ArrivalAirport: null,
  //       DepDate: null,
  //       DepTime: null,
  //       preferredDepartureTime: '2020-11-10T00:00:00',
  //       preferredArrivalTime: null,
  //     },
  //     {
  //       depTime: null,
  //       arrivalAirport: null,
  //       departureAirport: null,
  //       depDate: null,
  //       origin: 'SIN', //'BOM',
  //       IsReturn: null,
  //       destination: 'DEL',
  //       flightCabinClass: '1',
  //       DepartureAirport: null,
  //       ArrivalAirport: null,
  //       DepDate: null,
  //       DepTime: null,
  //       preferredDepartureTime: '2020-11-11T00:00:00',
  //       preferredArrivalTime: null,
  //     },
  //   ],
  //   sources: ['G8', 'SG', 'AI', '9W', 'UK', '6E', 'I5', 'GDS', 'ANY'],
  //   onwarddate: '2020-11-21',
  //   returndate: '',
  //   leastPrice: null,
  //   highestPrice: null,
  //   gSTDetailsRequired: false,
  //   originCountryCode: 'IN',
  //   destinationCountryCode: 'IN',
  //   domIntFlag: 'D',
  // };

  console.log('hit flight data :::', getSessionClient().defaults.headers);
  const { data } = await getSessionClient().post<FlightResponse>(FLIGHT_SEARCH, param);
  console.log('flight data :::', data);
  return data;
}

export async function searchPlaces(param: PlacesParam): Promise<Array<FlightPlaces>> {
  console.log('hit searchPlaces:::', getSessionClient().defaults.headers);
  const { data } = await getClient().get<Array<FlightPlaces>>(
    `${FLIGHT_PLACES}?term=${param.term}`
  );
  return data;
}

export async function getFlightFare(param: FlightFareParam): Promise<FlightFareResponse> {
  console.log('hit getFareID:::', getSessionClient().defaults.headers);

  const { data } = await getClient().post<FlightFareResponse>(FLIGHT_FARE, param);
  return data;
}
