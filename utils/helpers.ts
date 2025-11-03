import { uniqueId } from 'lodash';
import moment from 'moment';

export const isClientSideRender = () => typeof window !== 'undefined';

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const css = (...args: string[]) => [...args].join(' ');

const convertDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
};

export const setDateTimeZero = (
  dateString: string | Date = new Date(),
): string => {
  const date = new Date(convertDate(dateString));
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
};

export const formatDateDash = (dateString: string | Date): string => {
  return moment(setDateTimeZero(dateString)).format('YYYY-MM-DD');
};

export const formatDateSlash = (dateString: string | Date): string => {
  return moment(setDateTimeZero(dateString)).format('MM/DD/YYYY');
};

export const generateRandomStringId = (length: number) => {
  return uniqueId();
};

export const uuidv4 = () => {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16),
  );
};

export const dollarFormatter = (amount: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(amount);
};

export const numberToDollar = (dollar: number) => {
  const dollarArrStr = dollar.toString().split('');
  dollarArrStr.splice(dollarArrStr.length - 2, 0, '.');
  const dollarNumber = dollarArrStr.join('');
  return +dollarNumber;
};

export const compareUUIDs = (uuid1: string, uuid2: string) => {
  if (uuid1 < uuid2) return -1;
  else if (uuid1 > uuid2) return 1;
  else return 0;
};

export const orderUUIDs = (uuid1: string, uuid2: string) => {
  const num = compareUUIDs(uuid1, uuid2);
  return num === -1 ? [uuid2, uuid1] : [uuid1, uuid2];
};
