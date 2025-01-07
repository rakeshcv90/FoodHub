// import { THEME_TYPES } from '../components/Hooks/useDefaultTheme';
// import { USER_TYPES } from '../components/Usertype';
import {THEME_TYPES} from '../Components/Hooks/useDefaultTheme';
import {SavedAddressType} from '../components/Utilities/CommonTypes';
// import { LANGUAGE_TYPE } from '../language/LANGUAGE_TYPE';
import types from './constants';

export const initialState = {
  userLoginData: [],
  isAuthorized: false,
  appTheme: THEME_TYPES.DARK,
  isSystemTheme: false,
  hasLocation: false,
  walletAmount: 0,
  // language: LANGUAGE_TYPE.EN,
  savedLocation: [],
  userType: '',
  getCart: [],
  getCustomerAddress: '',
  getCardDetails: [],
  paymentType: {},
  getMyAddress: [],
  getMyDefaultAddress: {},
};

const rootReducer = (
  state = initialState,
  action: {type: string; payload: any},
) => {
  switch (action.type) {
    case types.SET_USER_LOGIN_DATA:
      return {...state, userLoginData: action.payload};
    case types.IS_AUTHORIZED:
      return {...state, isAuthorized: action.payload};
    case types.THEME:
      return {...state, appTheme: action.payload};
    case types.SYSTEM_THEME:
      return {...state, isSystemTheme: action.payload};
    case types.HAS_LOCATION:
      return {...state, hasLocation: action.payload};
    case types.WALLET_AMOUNT:
      return {...state, walletAmount: action.payload};
    // case types.LANGUAGE:
    //   return {...state, language: action.payload};
    case types.SAVED_LOCATION:
      return {...state, savedLocation: action.payload};
    case types.USER_TYPE:
      return {...state, userType: action.payload};
    case types.ADD_CUSTOMER_ADDRESS:
      return {...state, getCustomerAddress: action.payload};
    case types.CARD_DETAILS:
      return {...state, getCardDetails: action.payload};
    case types.PAYMENT_TYPE:
      return {...state, paymentType: action.payload};
    case types.ADD_TO_CART:
      return {...state, getCart: action.payload};
    case types.SET_MY_ADDRESS:
      return {...state, getMyAddress: action.payload};
    case types.SET_DEFAULT_ADDRESS:
      return {...state, getMyDefaultAddress: action.payload};
    case types.LOGOUT:
      return {...initialState};
    default:
      return state;
  }
};

export default rootReducer;
