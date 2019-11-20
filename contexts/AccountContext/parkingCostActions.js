import {
  PARKING_FORM_TYPE,
  REQUEST_PARKING_COST_ERROR,
  REQUEST_PARKING_COST_SUCCESS,
  PARKING_RATE,
} from 'models/actionTypes';

export const getParkingCostWithCustomDuration = async (service, dispatch, fetchParkingCostParams) => {
  await service
    .fetchParkingCostWithCustomDuration(fetchParkingCostParams)
    .then(response => {
      dispatch({ type: REQUEST_PARKING_COST_SUCCESS, payload: response.data });
    })
    .catch(error => {
      dispatch({ type: REQUEST_PARKING_COST_ERROR, payload: error.response.data.error });
    });
};

export const getParkingCostWithCustomRate = async (service, dispatch, fetchParkingCostParams) => {
  await service
    .fetchParkingCostWithCustomRate(fetchParkingCostParams)
    .then(response => {
      dispatch({ type: REQUEST_PARKING_COST_SUCCESS, payload: response.data });
    })
    .catch(error => {
      dispatch({ type: REQUEST_PARKING_COST_ERROR, payload: error.response.data.error });
    });
};

export const setParkingFormType = (dispatch, type) => {
  dispatch({ type: PARKING_FORM_TYPE, payload: type });
};

export const setRate = (dispatch, rate) => {
  dispatch({ type: PARKING_RATE, payload: rate });
};

export const parkingCostInitialState = {
  parkingCostResponse: null,
  parkingCostError: '',
  parkingFormType: '',
  rate: null,
};
