import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {
  goBack,
  navigate,
} from '../Components/Utilities/Functions/NavigationUtil';
import AppIcon from '../Components/Utilities/AppIcon';
import {COLORS, DIMENSIONS} from '../constants';
import {useSelector} from 'react-redux';
import AppText from '../Components/Utilities/AppText';
import AppButton from '../Components/Utilities/AppButton';
import ACTIONS from '../redux/actions';
import {dispatch} from '../constants/DIMENSIONS';
import LottieView from 'lottie-react-native';

const Address = () => {
  const getMyAddress = useSelector(state => state?.getMyAddress);
  const getMyDefaultAddress = useSelector(state => state?.getMyDefaultAddress);
  const {SCREEN_HEIGHT, SCREEN_WIDTH} = DIMENSIONS;
  const animationRef = useRef(null);
  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(30, 120);
  }, []);
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => dispatch(ACTIONS.setMyDefaultAddress(index))}
        activeOpacity={0.8}
        key={index}
        style={[
          {
            width: SCREEN_WIDTH * 0.9,
            height: 100,
            justifyContent: 'center',
            // alignItems: 'center',
            backgroundColor:
              getMyDefaultAddress === index ? COLORS.GREEN : COLORS.GRAYNEW2,
            marginVertical: 10,
            padding: 10,
            borderRadius: 10,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            width: '100%',
          }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AppIcon name="home" size={22} type="AntDesign" color="#2790c3" />
          </View>

          <View style={{width: '75%', marginLeft: 10}}>
            <AppText
              style={{
                fontSize: 16,
                fontWeight: '500',
                color:
                  getMyDefaultAddress === index
                    ? COLORS.WHITE
                    : COLORS.GRAYNEW1,
              }}>
              {item?.type}
            </AppText>
            <AppText
              style={{
                fontSize: 14,
                color:
                  getMyDefaultAddress === index
                    ? COLORS.WHITE
                    : COLORS.GRAYNEW1,
              }}>
              {item?.address}
              {item?.pin}
            </AppText>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              position: 'absolute',
              right: 0,
              top: -7,
            }}>
            <AppIcon
              name="edit"
              size={15}
              style={{marginRight: 10}}
              type="FontAwesome"
              color={
                getMyDefaultAddress === index ? COLORS.WHITE : COLORS.GREEN
              }
            />
            <AppIcon
              name="delete"
              size={15}
              style={{marginRight: 10}}
              type="AntDesign"
              color={
                getMyDefaultAddress === index ? COLORS.WHITE : COLORS.GREEN
              }
            />
          </View>
        </View>
      </TouchableOpacity>
    );
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

              backgroundColor: COLORS.GRAYNEW2,
            }}>
            <AppIcon
              name="arrow-back-ios"
              size={15}
              type="MaterialIcons"
              color="black"
              style={{left: 2}}
            />
          </TouchableOpacity>
          <View
            style={{
              width: '80%',
              justifyContent: 'center',

              marginHorizontal: 10,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.GRAYNEW1,
              }}>
              My Address
            </Text>
          </View>
        </View>
      </View>
      {getMyAddress?.length > 0 ? (
        <View style={{width: '95%', flex: 1}}>
          <FlatList
            data={getMyAddress}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            pagingEnabled
            renderItem={renderItem}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              // paddingBottom: 50,
            }}
          />
        </View>
      ) : (
        <View
          style={{
            width: '95%',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LottieView
            source={require('../assets/addresnotfound.json')}
            autoPlay
            loop
            style={{width: 200, height: 200}}
          />
        </View>
      )}
      <AppButton
        onPress={() => {
          navigate('MyAddress');
        }}
        buttonProps={{activeOpacity: 0.7}}
        titleText="ADD NEW ADDRESS"
        bR={10}
        w={'80%'}
      />
    </SafeAreaView>
  );
};

export default Address;

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
});
