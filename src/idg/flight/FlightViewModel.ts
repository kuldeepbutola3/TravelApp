import { dateDuration, formatDate } from 'src/utils/date-formatter';
import { AuraTFunction } from 'src/utils/i18n';
import { FlightCardProps } from './component/FlightCardList';
import { FlightSet } from './FlightModel';

export interface FlightViewModel extends FlightCardProps {
  item: FlightSet;
}
export function makeFlightViewModel(
  flight: FlightSet,
  t: AuraTFunction,
  onPress: (flightSet: FlightSet) => void
): Array<FlightViewModel> | undefined {
  // console.log('aaa  ', JSON.stringify(flight.segments.length));

  if (flight?.segments?.length > 0) {
    return flight?.segments?.map((item) => {
      return getSegment(flight, item, onPress, t);
    });
  }

  return undefined;
}

function getSegment(
  flight: FlightSet,
  segments: FlightSet['segments'][number],
  onPress: (flightSet: FlightSet) => void,
  t: AuraTFunction
) {
  const length = segments.length;
  const firstSegment = segments[0];
  const lastSegment = segments[length - 1];
  const flightName = firstSegment?.airline?.airlineName;
  const flightCode = `${firstSegment.airline.airlineCode} ${firstSegment.airline.flightNumber} ${firstSegment.airline.fareClass}`;

  const startTime = formatDate(firstSegment.origin.depTime, 'HH:mm');
  const startCity = firstSegment.origin.airport.cityName;
  const endTime = formatDate(lastSegment.destination.arrTime, 'HH:mm');
  const endCity = lastSegment.destination.airport.cityName;

  const duration = dateDuration(lastSegment.destination.arrTime , firstSegment.origin.depTime);

  const fare = `${flight.fare.currency === 'INR' ? '₹ ' : ''}${flight.fare.publishedFare}`;
  const seatLeft = `${firstSegment.noOfSeatAvailable} ${t('seatLeft')}`;

  const imagename = firstSegment.airline.airlineCode;
  let stop = t('nonStop');
  if (length > 1) {
    let ar = [...segments];
    ar.pop();

    const arrayCity = ar.map((i) => i.destination.airport.cityName);
    stop = `${length - 1} ${t('stopVia')} ${arrayCity.join(', ')}`;
  }

  const item: FlightViewModel = {
    item: flight,
    flightName,
    flightCode,
    startTime,
    startCity,
    endTime,
    endCity,
    fare,
    seatLeft,
    stop,
    imagename,
    duration,
    onPress: () => onPress(flight),
  };
  return item;
  // }
  // return undefined;
}
