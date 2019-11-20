import React, { useEffect, useReducer, useState } from 'react';
import localforage from 'localforage';

import reducer from 'models/reducer';
import config from 'config/localStorageKeys';
import { PERSONAL_VEHICLES_RESPONSE, PERSONAL_PAYMENT_METHODS, SESSIONS } from 'models/actionTypes';
import AccountContext from '.';
import { parkingCostInitialState } from './parkingCostActions';
import { parkingInitialState } from './parkingActions';

export const fetchPersonalVehicles = async (service, dispatch, authToken) => {
  await service
    .fetchPersonalVehicles(authToken)
    .then(response => {
      dispatch({ type: PERSONAL_VEHICLES_RESPONSE, payload: response.data.vehicles });
    })
    .catch(error => {
      console.log(error);
    });
};

export const personalPaymentMethods = async (service, dispatch, authToken) => {
  await service
    .personalPaymentMethods()
    .then(response => {
      dispatch({ type: PERSONAL_PAYMENT_METHODS, payload: response.data.payment_methods });
    })
    .catch(error => {
      console.log(error);
    });
};

export const fetchPersonalSessions = async (service, dispatch, authToken) => {
  await service
    .fetchSessions(authToken)
    .then(response => {
      dispatch({ type: SESSIONS, payload: response.data.sessions });
    })
    .catch(error => {
      console.log(error);
    });
};

const AccountProvider = ({ children, value }) => {
  const { vehicleService, accountService } = value;

  const initialState = {
    personalVehicles: [],
    personalPaymentMethods: [],
    sessions: [],
    ...parkingInitialState,
    ...parkingCostInitialState,
  };

  const [accountState, accountDispatch] = useReducer(reducer, initialState);

  const [authToken, setAuthToken] = useState('');

  const getAuthToken = async () => {
    await localforage.getItem(config.currentUserKey).then(userInfo => {
      setAuthToken(userInfo ? userInfo.auth_token : '');
    });
  };

  useEffect(() => {
    // TODO useEffect cleanUp function
    getAuthToken();

    if (authToken) {
      fetchPersonalSessions(accountService, accountDispatch, authToken);
      fetchPersonalVehicles(vehicleService, accountDispatch, authToken);
      personalPaymentMethods(accountService, accountDispatch, authToken);
    }
  }, [authToken]);

  return (
    <AccountContext.Provider value={{ accountState, accountDispatch, initialState }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
