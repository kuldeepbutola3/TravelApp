export type TimeSplit = '12-6am' | '6-12am' | '12-6pm' | '6-12pm';

interface PriceRange {
  lower: number;
  higher: number;
}
export interface FilterModel {
  priceRange?: PriceRange;
  stops?: number; //set default -1
  timeSplit1?: TimeSplit;
  timeSplit2?: TimeSplit;
  flightArray?: Array<string>;
}
