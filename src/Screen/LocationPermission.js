import {
  AppState,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {COLORS} from '../constants';
import AppIcon from '../Components/Utilities/AppIcon';
import {useLocation} from '../Components/Hooks/useLocation';
import {dispatch} from '../constants/DIMENSIONS';
import ACTIONS from '../redux/actions';
import {openSettings} from 'react-native-permissions';
import getCurrentRoute from '../Components/Utilities/Functions/getCurrentRoute';
import useCordinates from '../Components/Hooks/useCordinates';
import {indiaIntialRegion} from '../Components/Utilities/styles/customMapStyle';
import {navigate} from '../Components/Utilities/Functions/NavigationUtil';

const LocationPermission = () => {
  const {askLocationPermission, checkLocationPermission} = useLocation();
  const [resetCurrent, setResetCurrent] = useState(false);
  const [newCurrent, setNewCurrent] = useState(indiaIntialRegion);
  const [open, setOpen] = useState(true);
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    modalOpenFunction();
    const currentScreen = getCurrentRoute('LocationPermission');
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState?.current?.match(/inactive|background/) &&
        nextAppState === 'active' &&
        currentScreen
      ) {
        modalOpenFunction();
      }
      appState.current = nextAppState;
    });
    return () => {
      subscription.remove();
    };
  }, []);

  const modalOpenFunction = async () => {
    const permission = await checkLocationPermission();
    if (permission == 'granted') {
      setOpen(false);
      setResetCurrent(true);
      // navigate('Home');
       navigate('SelectType');
      dispatch(ACTIONS.setHasLocation(true));
    } else setOpen(true);
  };

  const grantButton = async () => {
    const permission = await askLocationPermission();
    if (permission == 'granted') {
      setOpen(false);
      setResetCurrent(true);
      // navigate('Home');
       navigate('SelectType');
      dispatch(ACTIONS.setHasLocation(true));
    
    } else if (permission == 'denied') openSettings();
    else setOpen(true);
  };
  useCordinates({
    getAgain: resetCurrent,
    resetGetAgain: setResetCurrent,
    setCoordinates: setNewCurrent,
  });

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Image
          source={require('../assets/map.png')}
          style={styles.mapImage}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity
        style={styles.locationButton}
        activeOpacity={0.8}
        onPress={grantButton}>
        <Text style={styles.buttonText}>ACCESS LOCATION</Text>
        <AppIcon
          name="location-pin"
          type="MaterialIcons"
          size={22}
          mL={20}
          color={COLORS.WHITE}
        />
      </TouchableOpacity>

      <Text style={styles.descriptionText}>
        FOODHUB WILL ACCESS YOUR LOCATION{'\n'}ONLY WHILE USING THE APP
      </Text>
    </View>
  );
};

export default LocationPermission;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  mapImage: {
    width: 300,
    height: 300,
    borderRadius: 150,
    resizeMode: 'contain',
  },
  locationButton: {
    backgroundColor: '#FF7F26',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 20,
    flexDirection: 'row',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionText: {
    textAlign: 'center',
    color: '#7D7D7D',
    fontSize: 14,
    lineHeight: 20,
  },
});
