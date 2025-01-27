import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, DIMENSIONS} from '../../../constants';
import {data3} from '../../../Components/Data';
import {navigate} from '../../../Components/Utilities/Functions/NavigationUtil';

const Completed = () => {
  const {SCREEN_HEIGHT, SCREEN_WIDTH} = DIMENSIONS;
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigate('RiderDetails');
        }}
        activeOpacity={0.8}
        key={index}
        style={{
          width: '90%',

          alignSelf: 'center',
          marginVertical: 10,
        }}>
        <View
          style={{
            width: '100%',
            paddingBottom: 25,
            //  paddingLeft:5,
            paddingRight: 20,
            paddingTop: 25,

            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: '33%',
              }}>
              <Image
                source={item?.light}
                resizeMode="contain"
                style={{width: '100%', height: 80}}
              />
            </View>

            <View
              style={{
                width: '67%',
                marginHorizontal: SCREEN_WIDTH >= 391 ? 0 : 5,
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: COLORS.GREEN,
                    fontSize: 15,
                    fontWeight: '400',
                  }}>
                  {item?.title2}
                </Text>
                <Text
                  style={{
                    color: COLORS.BLACK,
                    fontSize: 15,
                    fontWeight: '400',
                  }}>
                  ₹ {item?.price}
                </Text>
              </View>

              <View>
                <Text
                  style={{
                    color: COLORS.BLACK,
                    marginVertical: 5,
                    fontSize: 17,
                  }}>
                  {item?.title}
                </Text>
              </View>
              <View>
                <Text
                  style={{color: '#7C7F8B', fontSize: 13, fontWeight: '400'}}>
                  Quantity:{'  '}
                  <Text
                    style={{
                      color: COLORS.BLACK,
                      fontSize: 14,
                      fontWeight: '500',
                    }}>
                    {item?.quantity}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: '400',
            color: '#7C7F8B',
            marginVertical: 10,
          }}>
          Total {data3?.length} items
        </Text>
      </View>

      <View style={{flex: 1}}>
        <FlatList
          data={data3}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          pagingEnabled
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default Completed;

const styles = StyleSheet.create({});
