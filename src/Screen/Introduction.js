import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Wrapper from '../Components/Wrapper';
import PredefinedStyles from '../Components/Utilities/styles/PredefinedStyles';
import {COLORS, DIMENSIONS} from '../constants';
import AppText from '../Components/Utilities/AppText';
import useAppTheme from '../Components/Hooks/useAppTheme';
import AppButton from '../Components/Utilities/AppButton';
import {navigate} from '../Components/Utilities/Functions/NavigationUtil';
import IMAGES from '../Components/IMAGES';
import {dispatch} from '../constants/DIMENSIONS';
import ACTIONS from '../redux/actions';
import {useLocation} from '../Components/Hooks/useLocation';

const data = [
  {
    id: 1,
    title: 'All your favorites',
    desc: `Get all your loved foods in one once place you just place the order we do the rest`,
    light: IMAGES.Intro1Light,
    // dark: IMAGES.Intro1Dark,
  },
  {
    id: 2,
    title: 'Order from choosen chef',
    desc: `get all your loved foods in one once place you just place the order we do the rest`,
    light: IMAGES.Intro2Light,
    // dark: IMAGES.Intro2Dark,
  },
  {
    id: 3,
    title: 'Free delivery offer',
    desc: `get all your loved foods in one once place you just place the order we do the rest`,
    light: IMAGES.Intro3Light,
    // dark: IMAGES.Intro3Dark,
  },
];

const Introduction = () => {
  const {askLocationPermission, checkLocationPermission} = useLocation();
  const {SECONDARY_BACKGROUND_THEME, BACKGROUND_THEME, APP_THEME} =
    useAppTheme();
  const {SCREEN_HEIGHT, SCREEN_WIDTH} = DIMENSIONS;
  const flatListRef = useRef(null);
  const [current, setCurrent] = useState(1);
  const MINIMUM_SCROLL = SCREEN_WIDTH / 2;
  useEffect(() => {

  }, []);
  const modalOpenFunction = async () => {
    const permission = await checkLocationPermission();
    if (permission == 'granted') {
      // navigate('Home');
      navigate('SelectType');
      dispatch(ACTIONS.setHasLocation(true));
    } else navigate('LocationPermission');
  };

  const onMomentumScrollEnd = ({nativeEvent}) => {
    const {contentOffset} = nativeEvent;
    const offsetX = contentOffset.x;
    const newIndex = Math.round(offsetX / SCREEN_WIDTH);

    if (newIndex + 1 !== current) {
      setCurrent(newIndex + 1);
      flatListRef.current &&
        flatListRef.current?.scrollToIndex({index: newIndex, animated: true});
    }
  };

  const renderItem = ({_, index}) => {
    return (
      <View key={index} style={[{width: SCREEN_WIDTH, alignItems: 'center'}]}>
        <Image
          source={data[current - 1]?.light}
          style={{
            width: SCREEN_WIDTH * 0.8,
            height: SCREEN_HEIGHT * 0.4,
            marginTop: SCREEN_HEIGHT * 0.1,
            alignSelf: 'center',
          }}
          resizeMode="stretch"
        />
        <AppText
          type="Heading"
          value={data[current - 1]?.title}
          color={'black'}
          textAlign="center"
          w={'90%'}
          marginTop={20}
        />
        <AppText
          type="normal"
          value={data[current - 1]?.desc}
          color={COLORS.LIGHT_GREY}
          w={'90%'}
          textAlign="center"
          marginTop={20}
        />
      </View>
    );
  };

  const navigation = () => {
    // navigate('Home');
    modalOpenFunction();
  };
  return (
    <>
      <View style={{flex: 3}}>
        <FlatList
          ref={flatListRef}
          data={[1, 2, 3]}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          onMomentumScrollEnd={onMomentumScrollEnd}
          pagingEnabled
          renderItem={renderItem}
        />
        <View
          style={[
            PredefinedStyles.rowStyle,
            {
              justifyContent: 'space-between',
              width: '20%',
              top: -30,
              alignSelf: 'center',
            },
          ]}>
          {[1, 2, 3].map(item => (
            <View
              key={item}
              style={{
                width: item == current ? 30 : 10,
                height: 10,
                borderRadius: 10,
                backgroundColor:
                  item == current ? APP_THEME : SECONDARY_BACKGROUND_THEME,
              }}
            />
          ))}
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          top: -30,
        }}>
        {current <= 2 ? (
          <>
            <AppButton
              onPress={() => {
                setCurrent(current + 1);
              }}
              buttonProps={{activeOpacity: 0.7}}
              titleText="Next"
              bR={10}
              w={'80%'}
            />
            <TouchableOpacity
              onPress={() => navigation()}
              style={{
                width: '80%',

                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.LIGHT_GREY,
                  fontSize: 15,
                  fontWeight: '400',
                }}>
                Skip
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <AppButton
            onPress={() => navigation()}
            titleText="Get Started"
            bR={10}
            w={'80%'}
            textColor={COLORS.WHITE}
          />
        )}
      </View>
    </>
  );
};

export default Introduction;
