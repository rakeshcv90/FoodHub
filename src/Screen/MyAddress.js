import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {goBack} from '../Components/Utilities/Functions/NavigationUtil';
import {COLORS, DIMENSIONS} from '../constants';
import AppIcon from '../Components/Utilities/AppIcon';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {GOOGLE_API} from '../api/urls';
import {
  customMapStyle,
  indiaIntialRegion,
} from '../Components/Utilities/styles/customMapStyle';
import useCordinates from '../Components/Hooks/useCordinates';
import AppText from '../Components/Utilities/AppText';
import {TextInput} from 'react-native-paper';
import AppButton from '../Components/Utilities/AppButton';
import {useSelector} from 'react-redux';
import {dispatch} from '../constants/DIMENSIONS';
import ACTIONS from '../redux/actions';

const MyAddress = () => {
  const mapRef = useRef(null);
  const {SCREEN_HEIGHT, SCREEN_WIDTH} = DIMENSIONS;
  const [newCurrent, setNewCurrent] = useState(indiaIntialRegion);
  const [resetCurrent, setResetCurrent] = useState(true);
  const getMyAddress = useSelector(state => state?.getMyAddress);
  const [selectType, setSelectType] = useState('Home');
  const getCustomerAddress = useSelector(state => state?.getCustomerAddress);

  const parts = getCustomerAddress?.split(',');

  const street = parts[0]?.trim();
  const sector = parts[1]?.trim();
  const city = parts[2]?.trim();
  const stateAndPostal = parts[5]?.trim();
  const country = parts[6]?.trim();
  const [address, setAddress] = useState(
    street + ' ' + sector + ' ' + city + ' ' + country,
  );
  const [landmarrk, setLandmark] = useState('');
  const [pin, setpin] = useState(stateAndPostal);
  useCordinates({
    getAgain: resetCurrent,
    resetGetAgain: setResetCurrent,
    setCoordinates: setNewCurrent,
  });
  useEffect(() => {
    if (mapRef.current && !resetCurrent) {
      mapRef.current.animateToRegion(newCurrent, 1000);
      handleRegionChangeComplete(newCurrent, {
        isGesture: false,
      });
    }
  }, [mapRef, resetCurrent]);
  const handleRegionChangeComplete = async (newRegion, {isGesture}) => {
    if (isGesture) {
      setNewCurrent({
        ...newCurrent,
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
      });
    }
  };
  const saveAddress = () => {
    if (address === '') {
      alert('Please enter address');
      return;
    } else {
      const newAddress = {
        type: selectType,
        address: address,
        landmark: landmarrk,
        pin: pin,
      };
      const currentAddresses = getMyAddress;
      // const updatedAddresses = [...currentAddresses, newAddress];
      dispatch(ACTIONS.setMyAddress([...getMyAddress, newAddress]));
      setAddress('');
      setLandmark('');
      setpin('');
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
            activeOpacity={0.8}
            onPress={() => goBack()}
            style={{
              width: 35,
              height: 35,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 10,
              zIndex: 10,
              backgroundColor: COLORS.GRAYNEW,
            }}>
            <AppIcon
              name="arrow-back-ios"
              size={15}
              type="MaterialIcons"
              color="white"
            />
          </TouchableOpacity>
          <View
            style={{
              width: '80%',
              justifyContent: 'center',

              marginHorizontal: 10,
            }}></View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: SCREEN_HEIGHT * 0.4,
          backgroundColor: 'red',
          position: 'absolute',
          overflow: 'hidden',
        }}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={[, StyleSheet.absoluteFill]}
          pitchEnabled={false}
          key={GOOGLE_API}
          onRegionChangeComplete={handleRegionChangeComplete}
          initialRegion={indiaIntialRegion}
          customMapStyle={customMapStyle}
          showsMyLocationButton={false}
          showsCompass={false}
          showsIndoors={false}
          showsTraffic={false}
          showsScale={false}
          showsBuildings={false}
          showsIndoorLevelPicker={false}
          showsPointsOfInterest={false}
          showsUserLocation
          followsUserLocation
          // region={{
          //   latitude: 37.78825,
          //   longitude: -122.4324,
          //   latitudeDelta: 0.015,
          //   longitudeDelta: 0.0121,
          // }}
        ></MapView>
        <View style={styles.centerMarkerContainer}>
          <AppIcon
            name="map-marker-alt"
            size={30}
            type="FontAwesome5"
            color="red"
          />
        </View>
      </View>
      <View
        style={{
          width: '93%',
          bottom: 0,
          position: 'absolute',
          height: SCREEN_HEIGHT * 0.55,
          backgroundColor: 'white',
        }}>
        <AppText
          type="normal"
          value={'Address'}
          color={COLORS.BLACK}
          w={'100%'}
          fontSize={14}
          fontWeight="500"
          marginTop={5}
          marginBottom={10}
        />
        <View
          style={{
            width: '100%',
            height: 50,
            backgroundColor: '#f0f5f9',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
            borderRadius: 10,
          }}>
          <AppIcon
            name="map-marker-alt"
            size={20}
            type="FontAwesome5"
            color="GRAY"
          />
          <TextInput
            underlineColor="transparent"
            placeholder="House Number / Area / Section / Locality"
            placeholderTextColor={COLORS.GRAYNEW}
            style={{
              width: '95%',
              height: 40,
              borderBottomWidth: 0,
              backgroundColor: 'transparent',
              borderBottomWidth: 0,
            }}
            theme={{
              colors: {
                background: 'transparent',
                text: 'black',
                placeholder: 'gray',
                primary: 'transparent',
              },
            }}
            underlineColorAndroid="transparent"
            value={address}
            onChangeText={text => setAddress(text)}
          />
        </View>
        <AppText
          type="normal"
          value={'Landmark (Optional)'}
          color={COLORS.BLACK}
          w={'100%'}
          fontSize={14}
          fontWeight="500"
          marginTop={5}
          marginBottom={10}
        />
        <View
          style={{
            width: '100%',
            height: 50,
            backgroundColor: '#f0f5f9',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
            borderRadius: 10,
          }}>
          <AppIcon
            name="map-marker-alt"
            size={20}
            type="FontAwesome5"
            color="GRAY"
          />
          <TextInput
            underlineColor="transparent"
            placeholder="landmark"
            placeholderTextColor={COLORS.GRAYNEW}
            style={{
              width: '95%',
              height: 40,
              borderBottomWidth: 0,
              backgroundColor: 'transparent',
              borderBottomWidth: 0,
            }}
            theme={{
              colors: {
                background: 'transparent',
                text: 'black',
                placeholder: 'gray',
                primary: 'transparent',
              },
            }}
            underlineColorAndroid="transparent"
            value={landmarrk}
            onChangeText={text => setLandmark(text)}
          />
        </View>
        <AppText
          type="normal"
          value={'Post Code'}
          color={COLORS.BLACK}
          w={'100%'}
          fontSize={14}
          fontWeight="500"
          marginTop={5}
          marginBottom={10}
        />
        <View
          style={{
            width: '100%',
            height: 50,
            backgroundColor: '#f0f5f9',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
            borderRadius: 10,
          }}>
          <AppIcon
            name="map-marker-alt"
            size={20}
            type="FontAwesome5"
            color="GRAY"
          />
          <TextInput
            underlineColor="transparent"
            placeholder="Enter Post Code"
            placeholderTextColor={COLORS.GRAYNEW}
            style={{
              width: '95%',
              height: 40,
              borderBottomWidth: 0,
              backgroundColor: 'transparent',
              borderBottomWidth: 0,
            }}
            theme={{
              colors: {
                background: 'transparent',
                text: 'black',
                placeholder: 'gray',
                primary: 'transparent',
              },
            }}
            underlineColorAndroid="transparent"
            value={pin}
            onChangeText={text => setpin(text)}
          />
        </View>
        <AppText
          type="normal"
          value={'Label As'}
          color={COLORS.BLACK}
          w={'100%'}
          fontSize={14}
          fontWeight="500"
          marginTop={5}
          marginBottom={10}
        />
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 10,
            borderRadius: 10,
          }}>
          <TouchableOpacity
            onPress={() => setSelectType('Home')}
            style={{
              width: 110,
              height: 50,
              backgroundColor:
                selectType === 'Home' ? COLORS.GREEN : 'lightgray',
              borderRadius: 40,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
            }}>
            <AppIcon
              name="home"
              size={15}
              type="FontAwesome5"
              color={selectType === 'Home' ? COLORS.WHITE : 'black'}
              style={{left: 15}}
            />
            <AppText
              type="normal"
              value="Home"
              color={selectType === 'Home' ? COLORS.WHITE : 'black'}
              w="100%"
              textAlign="center"
              fontSize={15}
              fontWeight="500"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectType('Work')}
            style={{
              width: 110,
              height: 50,
              backgroundColor:
                selectType === 'Work' ? COLORS.GREEN : 'lightgray',
              borderRadius: 40,
              flexDirection: 'row',
              alignItems: 'center', // Align items vertically center
              justifyContent: 'center', // Align items horizontally center
              paddingHorizontal: 10, // Add padding to ensure content fits
            }}>
            <AppIcon
              name="work"
              size={15}
              type="MaterialIcons"
              color={selectType === 'Work' ? 'white' : 'black'}
              style={{left: 15}}
            />
            <AppText
              type="normal"
              value="Work"
              color={selectType === 'Work' ? 'white' : 'black'}
              w="100%"
              textAlign="center"
              fontSize={15}
              fontWeight="500"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectType('Other')}
            style={{
              width: 110,
              height: 50,
              backgroundColor:
                selectType === 'Other' ? COLORS.GREEN : 'lightgray',
              borderRadius: 40,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
            }}>
            <AppIcon
              name="map-marker-alt"
              size={15}
              type="FontAwesome5"
              color={selectType === 'Other' ? 'white' : 'black'}
              style={{left: 15}}
            />
            <AppText
              type="normal"
              value="Other"
              color={selectType === 'Other' ? 'white' : 'black'}
              w="100%"
              textAlign="center"
              fontSize={15}
              fontWeight="500"
            />
          </TouchableOpacity>
        </View>

        <AppButton
          onPress={() => {
            saveAddress();
          }}
          buttonProps={{activeOpacity: 0.7}}
          titleText="ADD NEW ADDRESS"
          bR={10}
          mV={15}
          w={'80%'}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    width: '95%',
    height: 40,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subHeader1: {
    width: '80%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },

  centerMarkerContainer: {
    left: '50%',
    marginLeft: -15,
    marginTop: -5,
    // zIndex:1,
    position: 'absolute',
    top: '50%',
  },
  // marker: {
  //   resizeMode: 'contain',
  //   height: 30,
  //   width: 30,
  // },
});
