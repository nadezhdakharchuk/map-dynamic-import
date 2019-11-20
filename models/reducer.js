import * as types from './actionTypes';

const reducer = (state, action) => {
  switch (action.type) {
    case types.REQUEST_PARKING_COST_ERROR:
      return {
        ...state,
        parkingCostResponse: null,
        parkingCostError: action.payload,
      };

    case types.REQUEST_PARKING_COST_SUCCESS:
      return {
        ...state,
        parkingCostResponse: action.payload,
        parkingCostError: '',
      };

    case types.PARKING_FORM_TYPE:
      return {
        ...state,
        parkingFormType: action.payload,
      };

    case types.PARKING_RATE:
      return {
        ...state,
        rate: action.payload,
      };

    case types.UPDATE_USER_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };

    case types.SET_IS_SIGNED_IN:
      return {
        ...state,
        isSignedIn: action.payload,
      };

    case types.SIGN_UP_IS_SHOWN:
      return {
        ...state,
        signUpIsShown: action.payload,
      };

    case types.RESET_PASSWORD:
      return {
        ...state,
        profile: action.payload,
      };

    case types.RESET_PASSWORD_IS_SHOWN:
      return {
        ...state,
        resetPasswordIsShown: action.payload,
      };

    case types.SIGNING_ERROR:
      return {
        ...state,
        loginError: action.payload,
      };

    case types.PARKING_CREATING_SUCCESS:
      return {
        ...state,
        parkingCreatingResponse: action.payload,
      };

    case types.USER_LOGIN_INFO:
      return {
        ...state,
        loginInfo: action.payload,
      };

    case types.PERSONAL_VEHICLES_RESPONSE:
      return {
        ...state,
        personalVehicles: action.payload,
      };

    case types.PERSONAL_PAYMENT_METHODS:
      return {
        ...state,
        personalPaymentMethods: action.payload,
      };

    case types.SESSIONS:
      return {
        ...state,
        sessions: action.payload,
      };

    case types.GET_PROFILE_ERROR:
      return {
        ...state,
        getProfileError: action.payload,
      };

    case types.SIGN_IN_IS_SHOWN:
      return {
        ...state,
        signInIsShown: action.payload,
      };

    case types.RESET_PARKING_INFO:
      return {
        ...state,
        rate: null,
        parkingFormType: '',
        parkingCostResponse: null,
        parkingCostError: '',
      };

    case types.RESET_PAY_PARKING_INFO:
      return {
        ...state,
        parkingCreatingError: '',
        parkingCreatingResponse: null,
      };

    case types.RESET_PERSONAL_DATA:
      return {
        ...state,
        profile: null,
        isSignedIn: false,
        signInIsShown: false,
        loginInfo: '',
        personalVehicles: [],
        personalPaymentMethods: [],
        sessions: [],
      };

    case types.INIT_FILTERS:
      return {
        ...state,
        distancesFilter: Object.assign({}, state.distancesFilter, {
          checkedDistance: action.payload.radius,
        }),
        locationFeaturesFilter: Object.assign({}, state.locationFeaturesFilter, {
          checkedFeatures: [...action.payload.features],
        }),
      };

    case types.SET_DISTANCE_FILTER:
      return {
        ...state,
        distancesFilter: Object.assign({}, state.distancesFilter, { checkedDistance: +action.payload }),
      };

    case types.SET_FEATURE_FILTER: {
      const { checked, id } = action.payload;
      const { locationFeaturesFilter } = state;
      const { checkedFeatures } = locationFeaturesFilter;
      const isFeatureChecked = checkedFeatures.find(item => item === +id);
      let newCheckedFeatures = [...checkedFeatures];
      if (checked && !isFeatureChecked) {
        newCheckedFeatures.push(+id);
      } else if (!checked && isFeatureChecked) {
        newCheckedFeatures = newCheckedFeatures.filter(item => item !== +id);
      }
      return {
        ...state,
        locationFeaturesFilter: Object.assign({}, state.locationFeaturesFilter, {
          checkedFeatures: [...newCheckedFeatures],
        }),
      };
    }

    case types.MAP_CONTEXT:
      return {
        ...state,
        map: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
