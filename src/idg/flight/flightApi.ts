import {getClient} from '../IDGClient';
import {FlightModel, FlightPlaces} from './FlightModel';

export const FLIGHT_SEARCH = 'v1/service/search/flights';
export const FLIGHT_PLACES = 'v1/service/search/get_itemName_list';

export type FlightEndpoint = typeof FLIGHT_SEARCH | typeof FLIGHT_PLACES;
export const getSessionClient = () => getClient<FlightEndpoint>();

export interface PlacesParam {
  term: string;
}

export async function getFlight(): Promise<FlightModel> {
  console.log('hit flight data :::', getSessionClient().defaults.headers);
  const {data} = await getSessionClient().post<FlightModel>(FLIGHT_SEARCH);
  console.log('flight data :::', data);
  return data;
}

export async function searchPlaces(
  param: PlacesParam,
): Promise<Array<FlightPlaces>> {
  const {data} = await getClient().get<Array<FlightPlaces>>(
    `${FLIGHT_PLACES}?term=${param.term}`,
  );
  return data;
}
