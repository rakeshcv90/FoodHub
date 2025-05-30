import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Introduction from '../Screen/Introduction';
import SplaceScreen from '../Screen/SplaceScreen';

import AllCategories from '../Screen/AllCategories';
import Home from '../Screen/Home';
import ItemScreen from '../Screen/ItemScreen';
import ShowCart from '../Screen/ShowCart';
import RestaurantItem from '../Screen/RestaurantItem';
import LocationPermission from '../Screen/LocationPermission';
import Checkout from '../Screen/Checkout';
import Profile from '../Screen/Profile';
import Address from '../Screen/Address';
import MyAddress from '../Screen/MyAddress';
import Payment from '../Screen/Payment';
import SelectType from '../Screen/SelectType';
import ChefHome from '../Screen/Chef/ChefHome';
import RiderDetails from '../Screen/Chef/RiderDetails';
import OrderDelivered from '../Screen/Chef/OrderDelivered';
import MyOrder from '../Screen/MyOrder';
import OrderPlaced from '../Screen/OrderPlaced';
import OrderTrack from '../Screen/OrderTrack';

const Stack = createStackNavigator();
const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SplaceScreen" component={SplaceScreen} />
      <Stack.Screen name="Introduction" component={Introduction} />
      <Stack.Screen name="LocationPermission" component={LocationPermission} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AllCategories" component={AllCategories} />
      <Stack.Screen name="ItemScreen" component={ItemScreen} />
      <Stack.Screen name="ShowCart" component={ShowCart} />
      <Stack.Screen name="RestaurantItem" component={RestaurantItem} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="MyAddress" component={MyAddress} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="SelectType" component={SelectType} />
      <Stack.Screen name="ChefHome" component={ChefHome} />
      <Stack.Screen name="RiderDetails" component={RiderDetails} />
      <Stack.Screen name="OrderDelivered" component={OrderDelivered} />
      <Stack.Screen name="MyOrder" component={MyOrder} />
      <Stack.Screen name="OrderPlaced" component={OrderPlaced} />
      <Stack.Screen name="OrderTrack" component={OrderTrack} />
    </Stack.Navigator>
  );
};

export default Router;
