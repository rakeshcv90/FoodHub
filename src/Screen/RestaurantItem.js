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
import React, {useState} from 'react';
import {COLORS, DIMENSIONS} from '../constants';
import AppIcon from '../Components/Utilities/AppIcon';
import {SegmentedButtons} from 'react-native-paper';
import {
  goBack,
  navigate,
} from '../Components/Utilities/Functions/NavigationUtil';
import {data} from '../Components/Data';
import AppText from '../Components/Utilities/AppText';
const RestaurantItem = ({route}) => {
  const itemName = route?.params?.itemName;
  const [value, setValue] = useState('breakfast');
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
            marginBottom: 20,
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
          fontSize={16}
          fontWeight="500"
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
            />
          </TouchableOpacity>
          <View
            style={{
              width: '80%',
              justifyContent: 'center',
              //   alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.GRAYNEW1,
              }}>
              {itemName}
            </Text>
          </View>
        </View>
      </View>
      <SegmentedButtons
        value={value}
        style={{width: '90%', marginVertical: 10, alignSelf: 'center'}}
        onValueChange={setValue}
        theme={{
          colors: {
            primary: COLORS.GREEN, // This sets the primary color for the buttons
            background: 'lightgray', // Optional: background color for unselected buttons
          },
        }}
        buttons={[
          {
            value: 'breakfast',
            label: 'Breakfast',
            style:
              value === 'breakfast'
                ? {backgroundColor: COLORS.GREEN, color: 'white'}
                : {},
            labelStyle: {
              color: value === 'breakfast' ? 'white' : 'black', // Change text color dynamically
            },
          },
          {
            value: 'lunch',
            label: 'Lunch',
            style:
              value === 'lunch'
                ? {backgroundColor: COLORS.GREEN, color: 'white'}
                : {},
            labelStyle: {
              color: value === 'lunch' ? 'white' : 'black', // Change text color dynamically
            },
          },

          {
            value: 'dinner',
            label: 'Dinner',
            style:
              value === 'dinner'
                ? {backgroundColor: COLORS.GREEN, color: 'white'}
                : {},

            labelStyle: {
              color: value === 'dinner' ? 'white' : 'black', // Change text color dynamically
            },
          },
        ]}
      />
      <View
        style={{width: '95%', marginVertical: SCREEN_WIDTH * 0.03, flex: 1}}>
        <FlatList
          data={data}
          // horizontal
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          // pagingEnabled
          renderItem={renderItem}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 20,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default RestaurantItem;

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
});
