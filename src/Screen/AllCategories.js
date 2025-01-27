import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, DIMENSIONS} from '../constants';
import AppIcon from '../Components/Utilities/AppIcon';
import IMAGES from '../Components/IMAGES';
import AppText from '../Components/Utilities/AppText';
import {
  goBack,
  navigate,
} from '../Components/Utilities/Functions/NavigationUtil';

const data = [
  {
    id: 1,
    title: 'Pizza',
    light: IMAGES.Piz,
  },
  {
    id: 2,
    title: 'Burger',
    light: IMAGES.Bug,
  },
  {
    id: 3,
    title: 'Biryani',
    light: IMAGES.Bir,
  },
  {
    id: 4,
    title: 'Fast Food',
    light: IMAGES.Fast,
  },
  {
    id: 5,
    title: 'Lunch',
    light: IMAGES.Lun,
  },
  {
    id: 6,
    title: 'Dinner',
    light: IMAGES.Din,
  },
];
const AllCategories = () => {
  const {SCREEN_HEIGHT, SCREEN_WIDTH} = DIMENSIONS;
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigate('ItemScreen', {itemName: item?.title})}
        activeOpacity={0.8}
        key={index}
        style={[
          {
            width: 200,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginBlockEnd: 20,
          },
        ]}>
        <View
          style={{
            width: 160,
            height: 160,
            backgroundColor: 'white',
            borderRadius: 20,

            justifyContent: 'center',
            elevation: 10,
          }}>
          <Image
            source={item.light}
            style={{
              width: 160,
              height: 160,
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
              // opacity: 0.3,
              backgroundColor: COLORS.GRAYNEW2,
            }}>
            <AppIcon
              name="arrow-back-ios"
              size={15}
              type="MaterialIcons"
              color="black"
              style={{left:2}}
            />
          </TouchableOpacity>
          <View
            style={{
              width: '80%',
              justifyContent: 'center',
              // alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.GRAYNEW1,
              }}>
              All Categories
            </Text>
          </View>
        </View>
      </View>
      <View style={{width: '95%', marginVertical: SCREEN_WIDTH * 0.04}}>
        <FlatList
          data={data}
          // horizontal
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          pagingEnabled
          renderItem={renderItem}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AllCategories;

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
  },
  subHeader1: {
    width: '80%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  subHeader2: {
    width: '20%',
    height: '100%',

    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
});
