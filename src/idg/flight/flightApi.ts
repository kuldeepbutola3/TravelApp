import { getClient } from '../IDGClient';
import { FlightFareResponse, FlightPlaces, FlightResponse } from './FlightModel';

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

export async function getFlight(): Promise<FlightResponse> {
  const param = {
    origin: '(DEL) New Delhi,India',
    destination: '(BOM) Mumbai,India',
    agency: '16flightapi.besttoursofindia.in',
    endUserIp: '182.68.159.210',
    tokenId: null,
    adultCount: 2,
    childCount: 1,
    infantCount: 1,
    directFlight: false,
    oneStopFlight: false,
    nextDayFlag: false,
    journeyType: '2',
    prefclass: null,
    oneWayResultIndex: null,
    roundTripResultIndex: null,
    traceId: null,
    preferredAirlines: null,
    segments: [
      {
        depTime: null,
        arrivalAirport: null,
        departureAirport: null,
        depDate: null,
        origin: 'DEL',
        IsReturn: null,
        destination: 'BOM',
        flightCabinClass: '1',
        DepartureAirport: null,
        ArrivalAirport: null,
        DepDate: null,
        DepTime: null,
        preferredDepartureTime: '2020-11-10T00:00:00',
        preferredArrivalTime: null,
      },
      {
        depTime: null,
        arrivalAirport: null,
        departureAirport: null,
        depDate: null,
        origin: 'BOM',
        IsReturn: null,
        destination: 'DEL',
        flightCabinClass: '1',
        DepartureAirport: null,
        ArrivalAirport: null,
        DepDate: null,
        DepTime: null,
        preferredDepartureTime: '2020-11-11T00:00:00',
        preferredArrivalTime: null,
      },
    ],
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
