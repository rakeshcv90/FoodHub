import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  BackHandler,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, DIMENSIONS} from '../constants';
import AppIcon from '../Components/Utilities/AppIcon';
import Search from '../Components/Search';
import {navigate} from '../Components/Utilities/Functions/NavigationUtil';
import IMAGES from '../Components/IMAGES';
import AppText from '../Components/Utilities/AppText';
import {useSelector} from 'react-redux';
import {Switch} from 'react-native-paper';
import {data} from '../Components/Data';
import {indiaIntialRegion} from '../Components/Utilities/styles/customMapStyle';
import useCordinates from '../Components/Hooks/useCordinates';
import API_CALLS from '../api/apiCalls';
import {dispatch} from '../constants/DIMENSIONS';
import ACTIONS from '../redux/actions';
import {useNavigationState} from '@react-navigation/native';
// const data = [
//   {
//     id: 1,
//     title: 'Pizza',
//     light: IMAGES.Piz,
//   },
//   {
//     id: 2,
//     title: 'Burger',
//     light: IMAGES.Bug,
//   },
//   {
//     id: 3,
//     title: 'Biryani',
//     light: IMAGES.Bir,
//   },
//   {
//     id: 4,
//     title: 'Fast Food',
//     light: IMAGES.Fast,
//   },
//   {
//     id: 5,
//     title: 'Lunch',
//     light: IMAGES.Lun,
//   },
//   {
//     id: 6,
//     title: 'Dinner',
//     light: IMAGES.Din,
//   },
// ];

const restaurants = [
  {
    id: 1,
    title: 'The Gurgaon Diner',
    light: IMAGES.Res1,
    food: 'Burger - Chicken - Pizza - Fast Food',
    rate: 4.5,
    deliveryTime: 30,
    deleveryFee: 'Free',
  },
  {
    id: 2,
    title: 'The IVY Restaurant',
    light: IMAGES.Res2,
    food: 'Burger - Chicken - Pizza - Fast Food',
    rate: 4.5,
    deliveryTime: 30,
    deleveryFee: 'Free',
  },
  {
    id: 3,
    title: 'Train Restaurant GuruGram',
    light: IMAGES.Res3,
    food: 'Burger - Chicken - Pizza - Fast Food',
    rate: 4.5,
    deliveryTime: 30,
    deleveryFee: 'Free',
  },
  {
    id: 4,
    title: 'Curry Garden',
    light: IMAGES.Res4,
    food: 'Burger - Chicken - Pizza - Fast Food',
    rate: 4.5,
    deliveryTime: 30,
    deleveryFee: 'Free',
  },
  {
    id: 5,
    title: 'Burma Burma Restaurant & Tea Room',
    light: IMAGES.Res5,
    food: 'Burger - Chicken - Pizza - Fast Food',
    rate: 4.5,
    deliveryTime: 30,
    deleveryFee: 'Free',
  },
  {
    id: 6,
    title: 'Houz of Commons',
    light: IMAGES.Res6,
    food: 'Burger - Chicken - Pizza - Fast Food',
    rate: 4.5,
    deliveryTime: 30,
    deleveryFee: 'Free',
  },
  {
    id: 7,
    title: 'Carnatic Cafe Gurugram',
    light: IMAGES.Res7,
    food: 'Burger - Chicken - Pizza - Fast Food',
    rate: 4.5,
    deliveryTime: 30,
    deleveryFee: 'Free',
  },
];
const Home = ({navigation}) => {
  const currentRouteName = useNavigationState(
    state => state.routes[state.index].name,
  );
  const hasLocation = useSelector(state => state.hasLocation);
  const [lastBackPress, setLastBackPress] = useState(0);
  const {SCREEN_HEIGHT, SCREEN_WIDTH} = DIMENSIONS;
  const getCart = useSelector(state => state?.getCart);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [newCurrent, setNewCurrent] = useState(indiaIntialRegion);
  const [resetCurrent, setResetCurrent] = useState(true);
  const getCustomerAddress = useSelector(state => state?.getCustomerAddress);
  const resetAndExitApp = () => {
    // Reset the navigation stack and navigate to the initial screen
    navigation.reset({
      index: 0,
      routes: [{name: 'SplaceScreen'}], // Replace 'Home' with your initial route name
    });

    // Exit the app
    BackHandler.exitApp();
  };

  useEffect(() => {
    const backAction = () => {
      if (currentRouteName === 'Home') {
        const currentTime = Date.now();
        if (currentTime - lastBackPress < 2000) {
          // Show dialog on the second press within 2 seconds
          Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'YES',
              onPress: () => resetAndExitApp(),
            },
          ]);
        } else {
          // Show a toast and set the last press time
          ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
          setLastBackPress(currentTime);
        }
        return true; // Prevent default back behavior
      }
      return false; // Allow default back behavior for other screens
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [currentRouteName, lastBackPress]);
  useCordinates({
    getAgain: resetCurrent,
    resetGetAgain: setResetCurrent,
    setCoordinates: setNewCurrent,
  });
  useEffect(() => {
    if (newCurrent?.latitude != indiaIntialRegion?.latitude) {
      getAddress();
    }
  }, [newCurrent]);
  const onToggleSwitch = () => setIsSwitchOn(previousState => !previousState);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigate('ItemScreen', {itemName: item?.title})}
        activeOpacity={0.8}
        key={index}
        style={[{width: 120, justifyContent: 'center', alignItems: 'center'}]}>
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'white',
            borderRadius: 20,
            justifyContent: 'center',
            elevation: 10,
          }}>
          <Image
            source={item.light}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              alignSelf: 'center',
            }}
            resizeMode="stretch"
          />
        </View>

        <AppText
          type="normal"
          value={item.title}
          color={COLORS.BLACK}
          w={'100%'}
          fontSize={14}
          fontWeight="400"
          textAlign="center"
          marginTop={10}
        />
      </TouchableOpacity>
    );
  };
  const renderItem1 = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigate('RestaurantItem', {itemName: item?.title})}
        activeOpacity={0.8}
        key={index}
        style={[
          {
            width: '90%',
            // justifyContent: 'center',
            // alignItems: 'center',
            alignSelf: 'center',
            marginVertical: 10,
          },
        ]}>
        <View
          style={{
            width: '100%',
            height: 150,
            backgroundColor: 'white',
            borderRadius: 15,
            justifyContent: 'center',
            backgroundColor: COLORS.LIGHT_GREY,
          }}>
          <Image
            source={item.light}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 15,
              alignSelf: 'center',
            }}
            resizeMode="stretch"
          />
        </View>

        <AppText
          type="SubHeading"
          value={item.title}
          color={COLORS.GRAYNEW1}
          w={'100%'}
          marginTop={15}
          fontSize={15}
        />
        <AppText
          type="normal"
          value={item.food}
          color={COLORS.LIGHT_GREY}
          w={'100%'}
          marginTop={5}
          fontSize={13}
        />
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
            width: '100%',
            alignItems: 'center',
          }}>
          <AppIcon
            name="star-outlined"
            size={22}
            type="Entypo"
            color={COLORS.GREEN}
          />
          <AppText
            type="normal"
            value={item.rate}
            color={COLORS.BLACK}
            marginHorizontal={5}
            fontSize={13}
          />
          <AppIcon
            name="truck-delivery-outline"
            size={22}
            style={{marginHorizontal: 20}}
            type="MaterialCommunityIcons"
            color={COLORS.GREEN}
          />
          <AppText
            type="normal"
            value={item.deleveryFee}
            color={COLORS.BLACK}
            marginHorizontal={-10}
            fontSize={13}
          />
          <AppIcon
            name="clock-time-four-outline"
            size={22}
            style={{marginHorizontal: 30}}
            type="MaterialCommunityIcons"
            color={COLORS.GREEN}
          />
          <AppText
            type="normal"
            value={item.deliveryTime}
            color={COLORS.BLACK}
            marginHorizontal={-20}
            fontSize={13}
          />
          <AppText
            type="normal"
            value={'min'}
            color={COLORS.BLACK}
            marginHorizontal={25}
            fontSize={13}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const getAddress = async () => {
    const fullAddress = await API_CALLS.reverseGeoCodeAPI(
      newCurrent?.latitude,
      newCurrent?.longitude,
    );

    dispatch(ACTIONS.setCustomerAddress(fullAddress));
    // setAddress(fullAddress);
  };
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return 'Good Morning';
    } else if (hours < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };
  
  
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
          <TouchableOpacity
            onPress={() => navigate('Profile')}
            activeOpacity={0.8}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',

              backgroundColor: COLORS.LIGHT_GREY,
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
          </TouchableOpacity>
          <View
            style={{
              width: '80%',

              marginHorizontal: 10,
            }}>
            <Text
              style={{fontSize: 15, fontWeight: 'bold', color: COLORS.GREEN}}>
              DELIVER TO
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                numberOfLines={1}
                style={{fontSize: 12, fontWeight: '500', width: '60%'}}>
                {getCustomerAddress}
            
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
        <TouchableOpacity
          style={styles.subHeader2}
          onPress={() => navigate('ShowCart')}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignSelf: 'flex-end',
              justifyContent: 'center',
              alignItems: 'center',

              backgroundColor: COLORS.BLACK,
            }}>
            <AppIcon
              name="shopping-bag"
              size={25}
              type="MaterialIcons"
              color="white"
            />
            <View
              style={{
                position: 'absolute',
                top:-2,
                right: -5,
                width: 20,
                height: 20,
                borderRadius: 20,
                backgroundColor: COLORS.GREEN,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 12, fontWeight: '500'}}>
                {getCart?.length}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: '90%',
          height: 40,
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBlockEnd: 15,
        }}>
        <View style={{width: '70%'}}>
          <Text
            style={{
              fontSize: 15,

              color: COLORS.BLACK,
            }}>
            Hey David,{' '}
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Poppins-Bold',
                fontWeight: 'bold',
                color: COLORS.BLACK,
              }}>
             {getGreeting()}!
            </Text>
          </Text>
        </View>
        <View
          style={{
            width: '30%',
            flexDirection: 'row',
            justifyContent: ' flex-end',
            alignItems: 'center',
          }}>
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            thumbColor={isSwitchOn ? 'red' : 'green'}
            style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
          />

          <Text
            style={{
              marginLeft: 10,
              color: COLORS.BLACK,
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            {isSwitchOn ? 'Non-Veg' : 'Veg'}
          </Text>
        </View>
      </View>
      <Search />
      <ScrollView
        style={{width: '100%', height: '100%', marginVertical: 10}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '90%',
            height: 50,
            marginVertical: 15,
            alignSelf: 'center',
            flexDirection: 'row',
          }}>
          <View style={[styles.subHeader1, {width: '70%', height: 30}]}>
            <Text style={{fontSize: 18, color: COLORS.BLACK ,fontWeight:'700'}}>
              All Categories
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigate('AllCategories')}
            style={{
              width: '30%',
              height: 30,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <Text style={{fontSize: 14, color: COLORS.GRAYNEW}}>See All </Text>
            <AppIcon
              name="right"
              size={15}
              type="AntDesign"
              color={COLORS.GRAYNEW}
            />
          </TouchableOpacity>
        </View>

        <View style={{width: '100%', top: -20}}>
          <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            pagingEnabled
            renderItem={renderItem}
          />
        </View>
        <View
          style={{
            width: '90%',
            height: 50,
            // marginVertical: 15,
            alignSelf: 'center',
            flexDirection: 'row',
          }}>
          <View style={[styles.subHeader1, {width: '70%', height: 30}]}>
            <Text style={{fontSize: 18, color: COLORS.BLACK ,fontWeight:'700'}}>
              Open Restaurants
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigate('AllCategories')}
            style={{
              width: '30%',
              height: 30,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <Text style={{fontSize: 14, color: COLORS.GRAYNEW}}>See All </Text>
            <AppIcon
              name="right"
              size={15}
              type="AntDesign"
              color={COLORS.GRAYNEW}
            />
          </TouchableOpacity>
        </View>

        <View style={{width: '100%', top: -15}}>
          <FlatList
            data={restaurants}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            pagingEnabled
            renderItem={renderItem1}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },

  header: {
    width: '90%',
    height: 50,
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

    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
});
export default Home;
