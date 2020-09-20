import { formatDate } from 'src/utils/date-formatter';
import { AuraTFunction } from 'src/utils/i18n';
import { FlightCardProps } from './component/FlightCard';
import { FlightSet } from './FlightModel';

export interface FlightViewModel extends FlightCardProps {
  item: FlightSet;
}
export function makeFlightViewModel(
  flight: FlightSet,
  t: AuraTFunction
): FlightViewModel | undefined {
  //   console.log('aaa  ', JSON.stringify(flight));

  const length = flight.segments[0].length;
  const firstSegment = flight.segments[0][0];

  const lastSegment = flight.segments[0][length - 1];
  if (firstSegment && lastSegment) {
    const flightName = firstSegment?.airline?.airlineName;
    const flightCode = `${firstSegment.airline.airlineCode} ${firstSegment.airline.flightNumber} ${firstSegment.airline.fareClass}`;

    const startTime = formatDate(firstSegment.origin.depTime, 'hh:mm');
    const startCity = firstSegment.origin.airport.cityName;
    const endTime = formatDate(lastSegment.destination.arrTime, 'hh:mm');
    const endCity = lastSegment.destination.airport.cityName;

    const fare = `${flight.fare.currency === 'INR' ? '₹ ' : ''}${flight.fare.publishedFare}`;
    const seatLeft = `${firstSegment.noOfSeatAvailable} ${t('seatLeft')}`;

    let stop = t('nonStop');
    if (length > 1) {
      let ar = [...flight.segments[0]];
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
    };
    return item;
  }
  return undefined;
}
