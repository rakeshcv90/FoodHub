import {PLATFORM_IOS} from '../../constants/DIMENSIONS';

import {
  check,
  checkMultiple,
  openSettings,
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';

export const useLocation = () => {
  const methods = {
    android: [
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ],
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  };

  //check
  const checkLocationPermission = async () => {
    const result = PLATFORM_IOS
      ? await check(methods.ios)
      : await checkMultiple(methods.android);
    return Result(result);
  };
  //ask
  const askLocationPermission = async () => {
    const result = PLATFORM_IOS
      ? await request(methods.ios)
      : await requestMultiple(methods.android);
    return Result(result);
  };

  const Result = (permissionResult: Object) => {
    let allGranted = true;
    let allDenied = true;

    Object.entries(permissionResult).forEach(([key, value]) => {
      if (value !== RESULTS.GRANTED) {
        allGranted = false;
      }
      if (value === RESULTS.GRANTED) {
        allDenied = false;
      }
    });

    if (allGranted) {
      return 'granted';
    } else if (allDenied) {
      return 'denied';
    } else {
      return 'requires-action';
    }
  };

  return {askLocationPermission, checkLocationPermission, methods};
};
