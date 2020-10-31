import moment from 'moment';
import { AuraTFunction } from './i18n';

export const formatDate = (date: string | Date, format: string, inputFormat?: string): string => {
  if (inputFormat) {
    return moment(date, inputFormat).format(format);
  }
  return moment(date).format(format);
};

export function currentGreetingMessage(t: AuraTFunction): string {
  const data = [
    [0, 11, t('goodMorning')],
    [12, 17, t('goodAfternoon')],
    [18, 24, t('goodEvening')],
  ];
  const hr = new Date().getHours();

  for (let i = 0; i < data.length; i++) {
    if (hr >= data[i][0] && hr <= data[i][1]) {
      return data[i][2] as string;
    }
  }
  return '';
}

export function dateDuration (start : string , end : string) {
  const  diff = moment(start).unix() - moment(end).unix()
  const hours = Math.floor(diff/3600);
  const min = Math.floor(diff/60)%60;
  return `${hours} hr ${min} min`
}