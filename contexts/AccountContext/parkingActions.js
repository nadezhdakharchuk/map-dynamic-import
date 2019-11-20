import { addHours, getTime } from 'date-fns';
import { dateFromISO, convertLocalTimeToMarket } from 'utils/dateConverters';

export const getVehiclesForSelect = vehicles => {
  return vehicles.map(currentVehicle => {
    if (currentVehicle) {
      return {
        value: currentVehicle.id,
        label: `${currentVehicle.color || ''} ${currentVehicle.body_type || ''} ${currentVehicle.make || ''} ${
          currentVehicle.license_plate
        } `,
      };
    } else {
      return [];
    }
  });
};

export const getPaymentMethodsForSelect = paymentMethods => {
  if (paymentMethods) {
    return paymentMethods.map(currentPaymentMethod => {
      return {
        value: currentPaymentMethod.entity_id,
        label: `${currentPaymentMethod.name} * * * * ${currentPaymentMethod.last4}`,
      };
    });
  } else {
    return [];
  }
};

export const vehicleDataForSelect = data => {
  return data.map(vehicleData => {
    return {
      value: vehicleData,
      label: vehicleData,
    };
  });
};

const getDateFromISOFormatToUnix = (date, location) => {
  const formattedDate = dateFromISO(date, 'yyyy-MM-dd hh:mm:ss a');
  const dateInMarketTimeZone = convertLocalTimeToMarket(new Date(formattedDate), location);
  return getTime(addHours(dateInMarketTimeZone.dateInMarketTimeZone, dateInMarketTimeZone.diffInHours)) / 1000;
};

export const getActiveSessionInThisLocation = (sessions, currentLocation) => {
  const dateNowInMarketTimeZone = convertLocalTimeToMarket(new Date(), currentLocation);
  const dateNowInUnix =
    getTime(addHours(dateNowInMarketTimeZone.dateInMarketTimeZone, dateNowInMarketTimeZone.diffInHours)) / 1000;

  return sessions.filter(session => {
    const sessionExpiredInUnix = getDateFromISOFormatToUnix(session.expires, currentLocation);
    return session.location_id === currentLocation.id && sessionExpiredInUnix > dateNowInUnix;
  });
};

export const parkingInitialState = {
  parkingCreatingError: '',
  parkingCreatingResponse: null,
};
