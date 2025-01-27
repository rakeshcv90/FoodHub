
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import {COLORS} from '../../constants';
import IMAGES from '../../Components/IMAGES';
import AppIcon from '../../Components/Utilities/AppIcon';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OrderRequesr from './ChefComponent/OrderRequesr';
import Progress from './ChefComponent/Progress';
import Completed from './ChefComponent/Completed';
import {useNavigationState} from '@react-navigation/native';
import OrderView from './ChefComponent/OrderView';
import useQuery, {TABLES} from '../../Components/Hooks/useQuery';
import { useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

const ChefHome = ({navigation}) => {
  const currentRouteName = useNavigationState(
    state => state.routes[state.index].name,
  );
  const hasLocation = useSelector(state => state?.hasLocation);
  const [isVisible, setIsVisible] = useState(false);
  const [lastBackPress, setLastBackPress] = useState(0);
  const {getDBdata, getConstantDBdata, postDBdata} = useQuery();
  const [orderData,setOrderData]=useState()
  const resetAndExitApp = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'SplaceScreen'}],
    });
    BackHandler.exitApp();
  };

  useEffect(() => {
    const backAction = () => {
      if (currentRouteName === 'ChefHome') {
        const currentTime = Date.now();
        if (currentTime - lastBackPress < 2000) {
          Alert.alert(
            'Exit App',
            'Are you sure you want to exit the app?',
            [
              {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
              },
              {
                text: 'Exit',
                onPress: () => resetAndExitApp(),
              },
            ],
            {cancelable: true},
          );
        } else {
          ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
          setLastBackPress(currentTime);
        }
        return true; // Prevent default back behavior
      }
      return false; // Allow default behavior for other tabs or gestures
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [currentRouteName, lastBackPress]);
  useEffect(() => {
    const unsubscribe = getConstantDBdata(TABLES.BOOKINGS, snapshot => {
      if (snapshot.data().status == 'Food_Order' && hasLocation) {
        setIsVisible(true);
        setOrderData(snapshot.data())
      }
    });

    return () => {
      // Ensure proper cleanup to avoid memory leaks
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        hidden={false}
        barStyle="dark-content"
        translucent={false}
        backgroundColor="white"
      />
      <View style={styles.header}>
        <View style={styles.subHeader1}>
          <View style={{width: '80%'}}>
            <Text
              style={{fontSize: 15, fontWeight: '500', color: COLORS.GREEN}}>
              LOCATION
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                numberOfLines={1}
                style={{fontSize: 12, fontWeight: '500', width: '60%'}}>
                Cyber Vision Infotech
              </Text>
              <AppIcon
                name="caretdown"
                size={15}
                type="AntDesign"
                color="black"
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.subHeader2}>
          <View
            style={{
              width: '100%',
              height: '100%',
              alignSelf: 'flex-end',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              flexDirection: 'row',
            }}>
            <Image
              source={IMAGES.Profile}
              style={{
                width: 45,
                height: 45,
                borderRadius: 25,
                alignSelf: 'center',
              }}
              resizeMode="stretch"
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, marginTop: -10}}>
        <Tab.Navigator
          initialRouteName="Order Request"
          screenOptions={{
            tabBarLabelStyle: {fontSize: 14, fontWeight: '500'},
            tabBarInactiveTintColor: '#32343E',
            tabBarActiveTintColor: COLORS.GREEN,
            tabBarStyle: {backgroundColor: COLORS.WHITE},
            tabBarIndicatorStyle: {backgroundColor: COLORS.RED},
          }}>
          <Tab.Screen name="Order Request" component={OrderRequesr} />
          <Tab.Screen name="Progressing" component={Progress} />
          <Tab.Screen name="Completed" component={Completed} />
        </Tab.Navigator>
      </View>
      <OrderView open={isVisible} onClose={() => setIsVisible(false)} orderData={orderData}/>
    </SafeAreaView>
  );
};

export default ChefHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '90%',
    height: 50,
    alignSelf: 'center',
    marginVertical: 15,
    flexDirection: 'row',
  },
  subHeader1: {
    width: '80%',
    height: '100%',
    flexDirection: 'row',
  },
  subHeader2: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
