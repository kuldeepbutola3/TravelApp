import { getClient } from '../IDGClient';
import { FlightPlaces, FlightResponse } from './FlightModel';

export const FLIGHT_SEARCH = 'v1/service/search/flights';
export const FLIGHT_PLACES = 'v1/service/search/get_itemName_list';

export type FlightEndpoint = typeof FLIGHT_SEARCH | typeof FLIGHT_PLACES;
export const getSessionClient = () => getClient<FlightEndpoint>();

export interface PlacesParam {
  term: string;
}

export async function getFlight(): Promise<FlightResponse> {
  const param = {
    origin: '(DEL) New Delhi,India',
    destination: '(BOM) Mumbai,India',
    agency: '16flightapi.besttoursofindia.in',
    endUserIp: '182.68.159.210',
    tokenId: null,
    adultCount: 1,
    childCount: 0,
    infantCount: 0,
    directFlight: false,
    oneStopFlight: false,
    nextDayFlag: false,
    journeyType: '1',
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
        preferredDepartureTime: '2020-19-19T00:00:00',
        preferredArrivalTime: null,
      },
      // {
      //   depTime: null,
      //   arrivalAirport: null,
      //   departureAirport: null,
      //   depDate: null,
      //   origin: 'BOM',
      //   IsReturn: null,
      //   destination: 'DEL',
      //   flightCabinClass: '1',
      //   DepartureAirport: null,
      //   ArrivalAirport: null,
      //   DepDate: null,
      //   DepTime: null,
      //   preferredDepartureTime: '2020-20-19T00:00:00',
      //   preferredArrivalTime: null,
      // },
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
