import { addDays, addSeconds, endOfHour, differenceInDays, addHours } from 'date-fns';
import { utcToZonedTime, format } from 'date-fns-tz';

export const dateFromISO = (date, formatString, timeZone = null) => {
  if (date) {
    const dateWithoutOffsetHours = new Date(date.split(' ')[0]);
    if (timeZone) {
      return format(dateWithoutOffsetHours, formatString, timeZone);
    } else {
      return format(dateWithoutOffsetHours, formatString);
    }
  }
};

export const isLessThanOneDay = (start, end) => {
  if (start && end) {
    return differenceInDays(new Date(start.split(' ')[0]), new Date(end.split(' ')[0])) === 0;
  }
  return false;
};

export const convertLocalTimeToMarket = (dateTimeInLocalZone, location) => {
  const dateInMarketTimeZone = utcToZonedTime(dateTimeInLocalZone, location.market_tzinfo_name);
  const diffInHours = Math.floor(
    Math.abs(dateTimeInLocalZone.getTime() - dateInMarketTimeZone.getTime()) / 1000 / 3600,
  );
  return { diffInHours, dateInMarketTimeZone };
};

export const getRightTime = (dateTimeInLocalZone, location) => {
  const dateInMarketTimeZone = utcToZonedTime(dateTimeInLocalZone, location);
  const diffInHours = Math.floor((dateTimeInLocalZone.getTime() - dateInMarketTimeZone.getTime()) / 1000 / 3600);
  return addHours(dateTimeInLocalZone, diffInHours);
};

export const getParkingTimeFromIso = (start, end) => {
  if (start && end) {
    const splittedStart = start.split(' ');
    const splittedEnd = end.split(' ');
    return {
      start: getRightTime(addHours(new Date(splittedStart[0]), -2), splittedStart[1]) / 1000,
      end: getRightTime(addHours(new Date(splittedEnd[0]), 2), splittedEnd[1]) / 1000,
    };
  }
  return { start: null, end: null };
};

export const dateForDatePicker = (location, parkingType) => {
  const startTimeInLocalZone = parkingType === 'Reservation' ? addSeconds(endOfHour(new Date()), 1) : new Date();
  const { diffInHours, dateInMarketTimeZone } = convertLocalTimeToMarket(startTimeInLocalZone, location);
  const end = addDays(dateInMarketTimeZone, 1);

  return { start: dateInMarketTimeZone, end, diffInHours };
};
