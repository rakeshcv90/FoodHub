import {AppState, Modal, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS, DIMENSIONS} from '../../constants';
import useAppTheme from '../../components/Hooks/useAppTheme';
import AppIcon from '../../components/Utilities/AppIcon';
import AppText from '../../components/Utilities/AppText';
import AppButton from '../../components/Utilities/AppButton';
import {useLocation} from '../../components/Hooks/useLocation';
import {openSettings} from 'react-native-permissions';
import getCurrentRoute from '../../components/Utilities/Functions/getCurrentRoute';
import {dispatch,} from '../../constants/DIMENSIONS';
import ACTIONS from '../../redux/actions';
import PredefinedStyles from '../../components/Utilities/styles/PredefinedStyles';

const LocationModal = () => {
  const {APP_THEME,BACKGROUND_THEME} = useAppTheme();
  const [open, setOpen] = useState(true);
  const {askLocationPermission, checkLocationPermission} = useLocation();
  const appState = useRef(AppState.currentState);

  const closeModal = () => setOpen(false);

  useEffect(() => {
    modalOpenFunction();
    const currentScreen = getCurrentRoute('PermissionScreen');
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
      dispatch(ACTIONS.setHasLocation(true));
    } else setOpen(true);
  };

  const grantButton = async () => {
    const permission = await askLocationPermission();
    if (permission == 'granted') {
      setOpen(false);
      dispatch(ACTIONS.setHasLocation(true));
    } else if (permission == 'denied') openSettings();
    else setOpen(true);
  };

  return (
    <Modal visible={open} onRequestClose={closeModal} transparent>
      <View style={[PredefinedStyles.FlexCenter, {backgroundColor: COLORS.MODAL_BACKGROUND}]}>
        <View
          style={[
            PredefinedStyles.NormalCenter,
            {
              borderRadius: 10,
              backgroundColor: BACKGROUND_THEME,
              width: DIMENSIONS.SCREEN_WIDTH * 0.8,
              padding: 15,
            },
          ]}>
          <View
            style={{
              backgroundColor: APP_THEME,
              borderRadius: 50,
              width: 45,
              height: 45,
              marginBottom: 10,
              ...PredefinedStyles.NormalCenter,
            }}>
            <AppIcon
              name="location-pin"
              type="MaterialIcons"
              size={30}
              color={COLORS.WHITE}
            />
          </View>
          <AppText
            type="Heading"
            value="Enable Location"
            fontSize={20}
            marginVertical={10}
          />
          <AppText
            type="normal"
            value="To be able to use this service, we require permission to access your location"
            textAlign="center"
            w={'80%'}
          />
          <View style={{height: 10}} />
          <AppButton
            titleText={'Grant Permission'}
            w="contain"
            mV={10}
            onPress={grantButton}
          />
          <AppButton
            onPress={closeModal}
            titleText={'Maybe Later'}
            w="contain"
            bgColor={COLORS.LIGHT_GREEN}
            textColor={COLORS.GREEN}
          />
        </View>
      </View>
    </Modal>
  );
};

export default LocationModal;

const styles = StyleSheet.create({});
