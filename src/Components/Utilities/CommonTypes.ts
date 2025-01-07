import {LatLng, Region} from 'react-native-maps';

type AddressTypes = {
  latitude: number;
  longitude: number;
  address: string;
};

type fullAddressType = {
  name: string;
  fullAddress: string;
};
type RideAddressDetailsType = {
  current: Region;
  destination: Region;
  region: Region;
  currentAddress: string;
  destinationAddress: fullAddressType;
};

type SavedAddressType = {
  id: number;
  name: string;
  address: string;
  coords: LatLng;
};

export type {AddressTypes, RideAddressDetailsType, SavedAddressType};
