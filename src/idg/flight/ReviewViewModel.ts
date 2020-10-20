import { formatDate } from 'src/utils/date-formatter';
import { ReviewCardProps } from './component/ReviewCard';
import { flightImagePath, FlightSet } from './FlightModel';

export interface ReviewViewModel extends ReviewCardProps {
  item: FlightSet['segments'][number][number];
}

export function makeReviewViewModel(
  flightDetail: FlightSet['segments'][number][number]
): ReviewViewModel {
  console.log('ddddd', JSON.stringify(flightDetail));
  const flightName = flightDetail?.airline?.airlineName;
  const depart = formatDate(flightDetail.origin.depTime, 'ddd D MMM YYYY');
  const arrive = formatDate(flightDetail.destination.arrTime, 'ddd D MMM YYYY');

  const startDestination = flightDetail.origin.airport.cityCode;
  const endDestination = flightDetail.destination.airport.cityCode;

  const startCity = flightDetail.origin.airport.cityName;
  const endCity = flightDetail.destination.airport.cityName;

  const startTime = formatDate(flightDetail.origin.depTime, 'hh:mm');
  const endTime = formatDate(flightDetail.destination.arrTime, 'hh:mm');

  const terminal2 = flightDetail.destination.airport.terminal ?? '';
  const terminal1 = flightDetail.origin.airport.terminal ?? '';

  const airportName2 = flightDetail.destination.airport.airportName;
  const airportName1 = flightDetail.origin.airport.airportName;

  const flightCode = `${flightDetail.airline.airlineCode} ${flightDetail.airline.flightNumber} ${flightDetail.airline.fareClass}`;

  const checkInBag = flightDetail.baggage;
  const cabinBag = flightDetail.cabinBaggage;
  const refundable = flightDetail.refundable;

  const imagename = flightDetail.airline.airlineCode;

  const item: ReviewViewModel = {
    item: flightDetail,
    flightName,
    flightCode,
    startCity,
    endCity,
    depart,
    arrive,
    startDestination,
    endDestination,
    startTime,
    endTime,
    airportName1,
    airportName2,
    terminal1,
    terminal2,

    checkInBag,
    cabinBag,
    refundable,
    imagename
  };

  return item;
}
