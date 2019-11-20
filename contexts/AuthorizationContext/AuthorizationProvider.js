import React, { useReducer, useEffect } from 'react';
import localforage from 'localforage';
// eslint-disable-next-line import/no-extraneous-dependencies
import reducer from 'models/reducer';
import config from 'config/localStorageKeys';
import {
  SIGN_UP_IS_SHOWN,
  SET_IS_SIGNED_IN,
  SIGNING_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_IS_SHOWN,
  UPDATE_USER_PROFILE,
  USER_LOGIN_INFO,
  GET_PROFILE_ERROR,
  RESET_PERSONAL_DATA,
  RESET_PAY_PARKING_INFO,
} from 'models/actionTypes';
import AuthorizationContext from './index';

export const conditionMethod = (condition, then, otherwise) => {
  return condition ? then : otherwise;
};

export const getUser = dispatch => {
  localforage.getItem(config.currentUserKey, (err, val) => {
    if (val) {
      dispatch({ type: UPDATE_USER_PROFILE, payload: val });
      dispatch({ type: SET_IS_SIGNED_IN, payload: true });
    } else {
      dispatch({ type: GET_PROFILE_ERROR, payload: true });
      dispatch({ type: SET_IS_SIGNED_IN, payload: false });
    }
  });
};

export const getUserLoginInfo = dispatch => {
  localforage.getItem(config.currentUserLoginInfoKey, (err, val) => {
    if (val) {
      dispatch({ type: USER_LOGIN_INFO, val });
    }
  });
};

const userData = profile => {
  return {
    email: profile.email,
    phone: profile.phone,
    first_name: profile.first_name,
    last_name: profile.last_name,
    auth_token: profile.auth_token,
  };
};

export const setUserData = (
  dispatch,
  res,
  closeLoginSection,
  isSignUp = false,
  clearTextFields = () => {},
  loginTypeForSignUp = '',
) => {
  if (isSignUp) {
    clearTextFields();
    dispatch({ type: SIGN_UP_IS_SHOWN, payload: false });
    localforage.setItem(config.currentUserLoginInfoKey, loginTypeForSignUp);
  }

  closeLoginSection();
  const { profile } = res.data;
  dispatch({ type: UPDATE_USER_PROFILE, payload: profile });
  dispatch({ type: SET_IS_SIGNED_IN, payload: true });
  localforage.setItem(config.currentUserKey, userData(profile), () => {});
};

export const getVerifyPhoneCode = async (service, dispatch, val, getVerifyCodeCallbacks) => {
  await service
    .getVerifyCode(val)
    .then(() => {
      getVerifyCodeCallbacks();
      dispatch({ type: SIGNING_ERROR, payload: '' });
    })
    .catch(error => {
      dispatch({ type: SIGNING_ERROR, payload: error.response.data.error });
    });
};

export const signIn = async (service, dispatch, login, password, closeLoginSection, showCodeVerificationCallbacks) => {
  await service
    .signin(login, password)
    .then(res => {
      setUserData(dispatch, { data: { profile: res.data.login } }, closeLoginSection);
    })
    .catch(res => {
      const error = res.graphQLErrors[0];
      if (error.extensions.status === 403) {
        getVerifyPhoneCode(service, dispatch, login, showCodeVerificationCallbacks);
      } else {
        dispatch({ type: SIGNING_ERROR, payload: error.message });
      }
    });
};

export const signOut = dispatch => {
  dispatch({ type: RESET_PERSONAL_DATA });
  dispatch({ type: RESET_PAY_PARKING_INFO });
  localforage.removeItem(config.currentUserKey, () => {});
  localforage.removeItem(config.currentUserLoginInfoKey, () => {});
};

export const verifyPhoneNumber = async (service, dispatch, phone, code, closeLoginSection) => {
  await service
    .verifyPhone(phone, code)
    .then(res => {
      const { profile } = res.data;
      if (!profile.password_reset_token) {
        setUserData(dispatch, res, closeLoginSection);
      } else {
        dispatch({ type: RESET_PASSWORD, payload: profile });
        dispatch({ type: RESET_PASSWORD_IS_SHOWN, payload: true });
      }
    })
    .catch(error => {
      dispatch({ type: SIGNING_ERROR, payload: error.response.data.error });
    });
};

export const verifyPhoneNumberForSignUp = async (service, dispatch, val, code, clearTextFields, closeLoginSection) => {
  await service
    .verifyPhone(val, code)
    .then(res => {
      setUserData(dispatch, res, closeLoginSection, true, clearTextFields, 'phone');
    })
    .catch(error => {
      dispatch({ type: SIGNING_ERROR, payload: error.response.data.error });
    });
};

export const sendPassword = async (service, dispatch, login, sendPasswordCallbacks) => {
  await service
    .forgotPassword(login)
    .then(res => {
      sendPasswordCallbacks(res);
    })
    .catch(error => {
      dispatch({ type: SIGNING_ERROR, payload: error.response.data.error });
    });
};

export const getInfo = async (service, dispatch, val, getInfoSuccessCallbacks) => {
  await service
    .getSigninInfo(val)
    .then(res => {
      const userInfo = res.data.login_info;
      getInfoSuccessCallbacks(userInfo);
      localforage.setItem(config.currentUserLoginInfoKey, userInfo.login_type, () => {});
      dispatch({ type: USER_LOGIN_INFO, userInfo });
    })
    .catch(() => {
      dispatch({ type: SIGN_UP_IS_SHOWN, payload: true });
    });
};

export const resetPassword = async (service, dispatch, token, password, logInUserSuccessCallbacks) => {
  await service
    .resetPassword(token, password)
    .then(res => logInUserSuccessCallbacks(res))
    .catch(error => {
      dispatch({ type: SIGNING_ERROR, payload: error.response.data.error });
    });
};

export const updateProfile = async (service, dispatch, params) => {
  await service
    .updateProfile(params)
    .then(res => {
      dispatch({ type: UPDATE_USER_PROFILE, payload: res.data });
    })
    .catch(error => {
      console.log(error);
    });
};

const AuthorizationProvider = ({ children, value }) => {
  const { authService } = value;

  const initialState = {
    profile: null,
    isSignedIn: false,
    signUpIsShown: false,
    signInIsShown: false,
    resetPasswordIsShown: false,
    loginError: '',
    loginInfo: '',
    getProfileError: false,
  };

  const [authState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getUser(dispatch);
    getUserLoginInfo(dispatch);
  }, []);

  return (
    <AuthorizationContext.Provider value={{ authState, dispatch, authService }}>
      {children}
    </AuthorizationContext.Provider>
  );
};

export default AuthorizationProvider;
