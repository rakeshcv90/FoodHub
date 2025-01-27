import {
  BackHandler,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import AppButton from '../../Components/Utilities/AppButton';
import LottieView from 'lottie-react-native';
import {COLORS} from '../../constants';
import {navigate} from '../../Components/Utilities/Functions/NavigationUtil';
const OrderDelivered = () => {
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
          source={require('../../assets/animation2.json')}
          autoPlay
          loop
          style={{width: 300, height: 300}}
        />

        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.BLACK}}>
          Your order successfully
        </Text>
        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.BLACK}}>
          delivered
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
            navigate('ChefHome');
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

export default OrderDelivered;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
