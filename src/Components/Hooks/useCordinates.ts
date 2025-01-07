import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import * as Location from 'expo-location';
import {Region} from 'react-native-maps';
import {indiaIntialRegion} from '../Utilities/styles/customMapStyle';

export interface Coords {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface Props {
  getAgain?: boolean;
  resetGetAgain?: any;
  setCoordinates?: any;
}
const useCordinates = ({
  getAgain = false,
  resetGetAgain,
  setCoordinates,
}: Props) => {
  const hasLocation = useSelector((state: any) => state.hasLocation);

  useEffect(() => {
    if (hasLocation && getAgain) getCoordinatesFunction();
  }, [hasLocation, getAgain]);

  const getCoordinatesFunction = async () => {
    const {status} = await Location.requestForegroundPermissionsAsync();
    if (status == 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      const {latitude, longitude} = location.coords;
      setCoordinates({
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
      resetGetAgain(false);
    }
  };
};

export default useCordinates;
