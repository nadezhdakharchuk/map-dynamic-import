import {
  getVehiclesForSelect,
  getPaymentMethodsForSelect,
  vehicleDataForSelect,
  createSession,
  createReservation,
  createSubscription,
  createExtendedParkingTime,
  fetchPersonalSessions,
} from './parkingActions';

import mockVehicles from '__mocks__/mockData/mockPersonalVehicles';
import mockPaymentMethods from '__mocks__/mockData/mockPersonalPaymentMethods';

describe('Parking Actions', () => {
  let mockDispatch;
  // const parkingService = new ParkingService(mockApiService);

  beforeEach(() => {
    jest.resetModules();
    mockDispatch = jest.fn();
  });

  describe('getVehiclesForSelect', () => {
    it('should return vehicles array in suitable for Select form', () => {
      // Arrange
      const expectedVehicles = mockVehicles.vehicles;

      // Act
      const actualVehiclesForSelect = getVehiclesForSelect(expectedVehicles);

      // Assert
      expect(actualVehiclesForSelect.length).toEqual(expectedVehicles.length);
      expect(actualVehiclesForSelect.map(vehicle => vehicle.value)).toEqual(
        expectedVehicles.map(vehicle => vehicle.id),
      );
      expect(actualVehiclesForSelect.map(vehicle => vehicle.label).length).toEqual(
        expectedVehicles.map(vehicle => vehicle.license_plate).length,
      );
    });
  });

  describe('getPaymentMethodsForSelect', () => {
    it('should return payment methods array in suitable for Select form', () => {
      // Arrange
      const expectedType = 'Card';
      const expectedPaymentMethods = mockPaymentMethods.payment_methods.filter(
        paymentMethod => paymentMethod.entity_type === expectedType,
      );

      // Act
      const actualPaymentMethodsForSelect = getPaymentMethodsForSelect(expectedPaymentMethods);

      // Assert
      expect(actualPaymentMethodsForSelect.length).toEqual(expectedPaymentMethods.length);
      expect(actualPaymentMethodsForSelect.map(actualPaymentMethod => actualPaymentMethod.value)).toEqual(
        expectedPaymentMethods.map(expectedPaymentMethod => expectedPaymentMethod.entity_id),
      );
      expect(actualPaymentMethodsForSelect.map(actualPaymentMethod => actualPaymentMethod.label).length).toEqual(
        expectedPaymentMethods.map(expectedPaymentMethods => expectedPaymentMethods.name).length,
      );
    });
  });

  describe('saveCreateParkingData', () => {
    it('should dispatch pay parking response data', () => {});
  });

  describe('createSession happy path', () => {
    it('should call saveCreateParkingData function with Session creating data', async () => {});
  });

  describe('createSession error case', () => {
    it('should call dispatch with error message', () => {});
  });

  describe('createReservation happy path', () => {
    it('should call saveCreateParkingData function with Reservation creating data', () => {});
  });

  describe('createReservation error case', () => {
    it('should call dispatch with error message', () => {});
  });

  describe('createSubscription happy path', () => {
    it('should call saveCreateParkingData function with Subscription creating data', () => {});
  });

  describe('createSubscription error case', () => {
    it('should call dispatch with error message', () => {});
  });

  describe('createExtendedParkingTime happy path', () => {
    it('should call saveCreateParkingData function with Session Extended creating data', () => {});
  });

  describe('createExtendedParkingTime error case', () => {
    it('should call dispatch with error message', () => {});
  });

  describe('fetchPersonalSessions happy path', () => {
    it('should dispatch personal sessions data', () => {});
  });
});
