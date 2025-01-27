import {
  BackHandler,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {dispatch} from '../constants/DIMENSIONS';
import ACTIONS from '../redux/actions';
import LottieView from 'lottie-react-native';
import AppButton from '../Components/Utilities/AppButton';
import {COLORS} from '../constants';
import {navigate} from '../Components/Utilities/Functions/NavigationUtil';

const OrderPlaced = () => {
  const animationRef = useRef(null);
  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(30, 120);
  }, []);

  useEffect(() => {
    const handleBackPress = () => {
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, []);
  const clearCart = () => {
    dispatch(ACTIONS.setAddToCart([]));
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        hidden={false}
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <View
        style={{
          width: '100%',
          height: '80%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LottieView
          source={require('../assets/animation3.json')}
          autoPlay
          loop
          style={{width: 300, height: 300}}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
            color: COLORS.BLACK,
            lineHeight: 30,
          }}>
          Confirm order!
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '400',
            color: '#7C7F8B',
            lineHeight: 30,
          }}>
          Your order has been placed successfully
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '400',
            color: '#7C7F8B',
            lineHeight: 30,
          }}>
          Get delivery by 40min
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          height: '20%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AppButton
          onPress={() => {
            clearCart();
            navigate('Home');
          }}
          buttonProps={{activeOpacity: 0.7}}
          titleText="CONTINUE"
          bR={10}
          mV={15}
          w={'80%'}
        />
      </View>
    </SafeAreaView>
  );
};

export default OrderPlaced;

const styles = StyleSheet.create({});
