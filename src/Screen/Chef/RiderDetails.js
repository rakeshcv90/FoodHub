import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  goBack,
  navigate,
} from '../../Components/Utilities/Functions/NavigationUtil';
import {COLORS, DIMENSIONS} from '../../constants';
import AppIcon from '../../Components/Utilities/AppIcon';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import {GOOGLE_API} from '../../api/urls';
import {
  customMapStyle,
  indiaIntialRegion,
} from '../../Components/Utilities/styles/customMapStyle';
import IMAGES from '../../Components/IMAGES';
import AppSlideButton from '../../Components/Utilities/AppSlideButton';
import useCordinates from '../../Components/Hooks/useCordinates';

const RiderDetails = () => {
  const mapRef = useRef(null);
  const {SCREEN_HEIGHT, SCREEN_WIDTH} = DIMENSIONS;
  const [newCurrent, setNewCurrent] = useState(indiaIntialRegion);
  const [resetCurrent, setResetCurrent] = useState(true);

  // const [selectType, setSelectType] = useState('Home');
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
  useCordinates({
    getAgain: resetCurrent,
    resetGetAgain: setResetCurrent,
    setCoordinates: setNewCurrent,
  });
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        hidden={false}
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
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
          height: SCREEN_HEIGHT * 0.65,
        }}>
        {/* <MapView
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
        </View> */}
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
        >
          <Marker
            coordinate={{
              latitude: 28.5057,
              longitude: 77.0967,
            }}>
            {console.log('cxvcxvxcvcxv', indiaIntialRegion)}
            <Image
              source={IMAGES.BIKE}
              style={{width: 35, height: 35, borderRadius: 15}}
              resizeMode="contain"
            />
            <Text style={{color: 'black', fontWeight: '700', fontSize: 16}}>
              Rider
            </Text>
          </Marker>
          <Polyline
            coordinates={[
              // Point 1
              {
                latitude: newCurrent?.latitude,
                longitude: newCurrent?.longitude,
              },
              {latitude: 28.5057, longitude: 77.0967}, // Point 2
            ]}
            strokeColor={COLORS.GREEN} // Line color
            strokeWidth={2} // Line width
          />
        </MapView>
        <View style={styles.centerMarkerContainer}>
         
          <Image
            source={IMAGES.Profile}
            style={{width: 30, height: 30, borderRadius: 15}}
            resizeMode="contain"
          />
          {/* <AppIcon
            name="map-marker-alt"
            size={30}
            type="FontAwesome5"
            color="red"
          /> */}
        </View>
      </View>
      <View
        style={{
          width: '100%',
          bottom: 0,
          position: 'absolute',
          height: SCREEN_HEIGHT * 0.39,
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <View
          style={{
            width: '95%',
            height: '33%',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '20%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={IMAGES.Profile}
              style={{
                width: 70,
                height: 70,

                borderRadius: 35,
                alignSelf: 'center',
              }}
              resizeMode="stretch"
            />
          </View>
          <View
            style={{
              width: '52%',
              height: '100%',
              marginLeft: 5,
              justifyContent: 'center',
            }}>
            <Text
              style={{fontWeight: '600', fontSize: 17, color: COLORS.BLACK}}>
              Jon Deo
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',

                // justifyContent: 'space-evenly',
              }}>
              <Image
                source={IMAGES.RATING}
                style={{
                  width: '35%',
                  height: 35,
                  top: 10,
                  alignSelf: 'center',
                }}
                resizeMode="stretch"
              />
              <Image
                source={IMAGES.VER}
                style={{
                  width: '50%',
                  height: 35,
                  top: 10,
                  marginLeft: 20,
                  alignSelf: 'center',
                }}
                resizeMode="stretch"
              />
            </View>
          </View>
          <View
            style={{
              width: '30%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              // justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}>
            <Image
              source={IMAGES.CALL}
              style={{
                width: 40,
                height: 40,
                left: -10,
                alignSelf: 'center',
              }}
              resizeMode="stretch"
            />
            <Image
              source={IMAGES.MSG}
              style={{
                width: 40,
                height: 40,

                alignSelf: 'center',
              }}
              resizeMode="stretch"
            />
          </View>
        </View>
        <View
          style={{
            width: '95%',
            height: '1%',
            backgroundColor: '#F5F5F5',
            alignSelf: 'center',
          }}></View>
        <View style={{width: '95%', height: '33%', alignSelf: 'center'}}>
          <Text
            style={{
              color: COLORS.BLACK,
              fontWeight: '700',
              fontSize: 20,
              textAlign: 'center',
              marginTop: 10,
            }}>
            7 min
            <Text
              style={{
                color: 'gray',
                fontWeight: '700',
                fontSize: 20,
                textAlign: 'center',
                marginTop: 10,
              }}>
              (1.2km)
            </Text>
          </Text>
          <Text
            style={{
              color: 'gray',
              fontWeight: '400',
              fontSize: 18,
              textAlign: 'center',
            }}>
            Fastest route, despite heavier traffic than usual
          </Text>
        </View>
        <View
          style={{
            width: '95%',
            height: '1%',
            backgroundColor: '#F5F5F5',
            alignSelf: 'center',
          }}></View>
        <View style={{width: '95%', height: '33%', alignSelf: 'center'}}>
          <AppSlideButton onPress={() => navigate('OrderDelivered')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RiderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // backgroundColor: 'white',
  },
  header: {
    width: '95%',
    height: 40,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 30,
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
});
