import {SavedAddressType} from '../components/Utilities/CommonTypes';
import types from './constants';

const setUserLoginDATA = (data: Array<any>) => {
  return {type: types.SET_USER_LOGIN_DATA, payload: data};
};
const setIsAuthorized = (data: boolean) => {
  return {type: types.IS_AUTHORIZED, payload: data};
};
const setAppTheme = (data: string) => {
  return {type: types.THEME, payload: data};
};
const setIsSystemTheme = (data: boolean) => {
  return {type: types.SYSTEM_THEME, payload: data};
};
const setHasLocation = (data: boolean) => {
  return {type: types.HAS_LOCATION, payload: data};
};
const setWalletAmount = (data: number) => {
  return {type: types.WALLET_AMOUNT, payload: data};
};
const setLanguage = (data: string) => {
  return {type: types.LANGUAGE, payload: data};
};
const setSavedLocation = (data: Array<SavedAddressType>) => {
  return {type: types.SAVED_LOCATION, payload: data};
};
const setUserType = (data: string) => {
  return {type: types.USER_TYPE, payload: data};
};
const setLogout = () => {
  return {type: types.LOGOUT};
};
const setAddToCart = (data: Array<any>) => {
  return {type: types.ADD_TO_CART, payload: data};
};
const setCustomerAddress = (data: any) => {
  return {type: types.ADD_CUSTOMER_ADDRESS, payload: data};
};
export const addCardDetails = (data: any) => {
  return {
    type: types.CARD_DETAILS,
    payload: data,
  };
};
export const setPaymentType = (data: any) => {
  return {
    type: types.PAYMENT_TYPE,
    payload: data,
  };
};
export const setMyAddress = (data: any) => {
  return {
    type: types.SET_MY_ADDRESS,
    payload: data,
  };
};
export const setMyDefaultAddress = (data: any) => {
  return {
    type: types.SET_DEFAULT_ADDRESS,
    payload: data,
  };
};
const ACTIONS = {
  setAppTheme,
  setIsSystemTheme,
  setHasLocation,
  setIsAuthorized,
  setUserLoginDATA,
  setWalletAmount,
  setLanguage,
  setSavedLocation,
  setUserType,
  setLogout,
  setAddToCart,
  setCustomerAddress,
  addCardDetails,
  setPaymentType,
  setMyAddress,
  setMyDefaultAddress,
};

export default ACTIONS;
