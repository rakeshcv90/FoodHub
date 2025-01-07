import {
  DimensionValue,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {useCallback} from 'react';
import AppButton, {ButtonProps} from './AppButton';
import {
  AddressTypes,
  RideAddressDetailsType,
  SavedAddressType,
} from './CommonTypes';
import {useSelector} from 'react-redux';
import {DIMENSIONS} from '../../constants';
import {LatLng} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';

interface Props {
  containerW?: DimensionValue;
  containerPadding?: number;
  containerStyle?: ViewStyle;
  propsData: Partial<ButtonProps>;
  renderItem?: ListRenderItem<any>;
  currentLocation: AddressTypes;
  fromWhere?: boolean
  mR?: number
}

const AppButtonGroup = ({
  containerPadding = 5,
  containerStyle,
  containerW = '100%',
  propsData,
  renderItem,
  currentLocation,
  mR = 0
}: Props) => {
  const savedLocation = useSelector((state: any) => state.savedLocation);
  const navigation: any = useNavigation();

  const getBoundingRegion = useCallback((current: LatLng, dest: LatLng) => {
    const latMin = Math.min(current.latitude, dest.latitude);
    const latMax = Math.max(current.latitude, dest.latitude);
    const lngMin = Math.min(current.longitude, dest.longitude);
    const lngMax = Math.max(current.longitude, dest.longitude);

    const latitudeDelta = (latMax - latMin) * 1.5;
    const longitudeDelta = (lngMax - lngMin) * 1.5;

    const centerLatitude = (latMax + latMin) / 2;
    const centerLongitude = (lngMax + lngMin) / 2;
    return {
      latitude: centerLatitude,
      longitude: centerLongitude,
      latitudeDelta,
      longitudeDelta,
    };
  }, []);
  const handlePress = (item: SavedAddressType) => {
    const delta = getBoundingRegion(
      {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      },
      item.coords,
    );
    const finalData: RideAddressDetailsType = {
      current: {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: delta.latitudeDelta,
        longitudeDelta: delta.longitudeDelta,
      },
      region: delta,
      currentAddress: currentLocation.address,
      destination: {
        ...item.coords,
        latitudeDelta: delta.latitudeDelta,
        longitudeDelta: delta.longitudeDelta,
      },
      destinationAddress: {
        name: item.name,
        fullAddress: item.address,
      },
    };
    // console.log("FINAL",finalData)
    // setOpenWhere(false);
    navigation?.navigate('BookRide', {
      RideAddressDetails: finalData,
    });
  };

  return (
    <View
      style={
        containerStyle ?? {
          padding: containerPadding,
          width: containerW,
          flexDirection: 'row',
        }
      }>
      {savedLocation && (
        <FlatList
          data={savedLocation}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          style={{marginRight:  mR}}
          renderItem={
            renderItem
              ? renderItem
              : ({item, index}: {item: SavedAddressType; index: number}) => (
                  <AppButton
                    {...propsData}
                    key={index}
                    titleText={item.name}
                    onPress={() => handlePress(item)}
                    w={'auto'}
                  />
                )
          }
          horizontal
        />
      )}
    </View>
  );
};

export default AppButtonGroup;

const styles = StyleSheet.create({});
