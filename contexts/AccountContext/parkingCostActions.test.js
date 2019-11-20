import { REQUEST_PARKING_COST_SUCCESS, REQUEST_PARKING_COST_ERROR, PARKING_FORM_TYPE } from 'models/actionTypes';
import LocationService from 'services/LocationService';

import mockApiService from '__mocks__/mockData/mockApiService';
import mockParkingCost from '__mocks__/mockData/mockParkingCost';
import mockParkingCostError from '__mocks__/mockData/mockParkingCostError';
import {
  getParkingCostWithCustomDuration,
  getParkingCostWithCustomRate,
  setParkingFormType,
} from './parkingCostActions';

jest.mock('services/LocationService');

describe('Parking Cost Actions', () => {
  let mockDispatch;
  const locationService = new LocationService(mockApiService);

  beforeEach(() => {
    jest.resetModules();
    mockDispatch = jest.fn();
  });

  describe('Get parking cost', () => {
    test('happy path', async () => {
      // Arrange

      const expectedLocationId = 264;
      const expectedParkingTimeType = 'Session';
      const expectedStartsAt = '1565944208';
      const expectedEndsAt = '1565969408';

      const expectedParams = {
        locationId: expectedLocationId,
        parkingTimeType: expectedParkingTimeType,
        startsAt: expectedStartsAt,
        endsAt: expectedEndsAt,
      };

      const expectedParkingCostResponse = mockParkingCost;

      const expectedAction = {
        type: REQUEST_PARKING_COST_SUCCESS,
        payload: expectedParkingCostResponse,
      };

      locationService.fetchParkingCostWithCustomDuration.mockImplementation(() =>
        Promise.resolve({ data: expectedParkingCostResponse }),
      );

      // Act

      await getParkingCostWithCustomDuration(locationService, mockDispatch, expectedParams);

      // Assert

      expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
    });

    test('error occurred', async () => {
      // Arrange

      const expectedLocationId = 264;
      const expectedParkingTimeType = 'Session';
      const expectedStartsAt = '1565944208';
      const expectedEndsAt = '1565969408';

      const expectedParams = {
        locationId: expectedLocationId,
        parkingTimeType: expectedParkingTimeType,
        startsAt: expectedStartsAt,
        endsAt: expectedEndsAt,
      };

      const expectedParkingCostResponse = mockParkingCostError;
      const expectedAction = {
        type: REQUEST_PARKING_COST_ERROR,
        payload: expectedParkingCostResponse,
      };

      locationService.fetchParkingCostWithCustomDuration.mockImplementation(() =>
        // eslint-disable-next-line prefer-promise-reject-errors
        Promise.reject({ response: { data: { error: mockParkingCostError } } }),
      );

      // Act

      await getParkingCostWithCustomDuration(locationService, mockDispatch, expectedParams);

      // Assert

      expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
    });
  });

  describe('Get parking cost for subscription type', () => {
    test('happy path', async () => {
      // Arrange

      const expectedLocationId = 264;
      const expectedParkingTimeType = 'Subscription';
      const expectedParkingTimeRateId = 346;

      const expectedParams = {
        locationId: expectedLocationId,
        parkingTimeType: expectedParkingTimeType,
        parkingTimeRateId: expectedParkingTimeRateId,
      };

      const expectedParkingCostResponse = mockParkingCost;
      const expectedAction = {
        type: REQUEST_PARKING_COST_SUCCESS,
        payload: expectedParkingCostResponse,
      };

      locationService.fetchParkingCostWithCustomRate.mockImplementation(() =>
        Promise.resolve({ data: expectedParkingCostResponse }),
      );

      // Act

      await getParkingCostWithCustomRate(locationService, mockDispatch, expectedParams);

      // Assert

      expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
    });

    test('error occurred', async () => {
      // Arrange

      const expectedLocationId = 264;
      const expectedParkingTimeType = 'Subscription';
      const expectedParkingTimeRateId = 346;

      const expectedParams = {
        locationId: expectedLocationId,
        parkingTimeType: expectedParkingTimeType,
        parkingTimeRateId: expectedParkingTimeRateId,
      };

      const expectedParkingCostResponse = mockParkingCostError;
      const expectedAction = {
        type: REQUEST_PARKING_COST_ERROR,
        payload: expectedParkingCostResponse,
      };

      locationService.fetchParkingCostWithCustomRate.mockImplementation(() =>
        // eslint-disable-next-line prefer-promise-reject-errors
        Promise.reject({ response: { data: { error: mockParkingCostError } } }),
      );

      // Act

      await getParkingCostWithCustomRate(locationService, mockDispatch, expectedParams);

      // Assert

      expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
    });
  });

  describe('Set parking form type', () => {
    test('happy path', () => {
      // Arrange

      const expectedType = 'Session';
      const expectedAction = {
        type: PARKING_FORM_TYPE,
        payload: expectedType,
      };

      // Act

      setParkingFormType(mockDispatch, expectedType);

      // Assert

      expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});
