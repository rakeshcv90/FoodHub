import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {data2} from '../../../Components/Data';
import AppText from '../../../Components/Utilities/AppText';
import AppIcon from '../../../Components/Utilities/AppIcon';
import {COLORS, DIMENSIONS} from '../../../constants';
import IMAGES from '../../../Components/IMAGES';

const OrderRequesr = () => {
  const demoApp = () => {
    ToastAndroid.show('This is a demo app', ToastAndroid.CENTER);
  };
  const {SCREEN_HEIGHT, SCREEN_WIDTH} = DIMENSIONS;
  const renderItem = ({item, index}) => {
    return (
      <View
        activeOpacity={0.8}
        key={index}
        style={{
          width: '90%',

          // justifyContent: 'center',
          // alignItems: 'center',
          alignSelf: 'center',
          marginVertical: 10,
        }}>
        <View
          style={{
            width: '100%',
            padding: 20,
            height: 150,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <View
            style={{
              width: '100%',

              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{color: COLORS.GREEN, fontSize: 13, fontWeight: '400'}}>
              {item?.title2}
            </Text>
            <Text>₹{item?.price}</Text>
          </View>
          <Text style={{color: COLORS.BLACK, marginVertical: 10, fontSize: 17}}>
            {item?.title}
          </Text>
          <View
            style={{
              width: '100%',

              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: '#7C7F8B', fontSize: 13, fontWeight: '400'}}>
              Quantity:{'  '}
              <Text
                style={{color: COLORS.BLACK, fontSize: 14, fontWeight: '500'}}>
                {item?.quantity}
              </Text>
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  demoApp();
                }}
                activeOpacity={0.7}
                style={{
                  width: 70,
                  height: 40,
                  backgroundColor: COLORS.GREEN,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: COLORS.WHITE,
                    fontSize: 12,
                    fontWeight: '400',
                    textAlign: 'auto',
                  }}>
                  START
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  demoApp();
                }}
                style={{
                  width: 70,
                  height: 40,
                  borderRadius: 8,
                  borderWidth: 1,
                  marginLeft: 10,
                  borderColor: COLORS.GREEN,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: COLORS.GREEN,
                    fontSize: 12,
                    fontWeight: '400',
                    textAlign: 'auto',
                  }}>
                  CANCEL
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
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
          Total {data2?.length} items
        </Text>
      </View>

      <View style={{flex: 1}}>
        <FlatList
          data={data2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          pagingEnabled
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default OrderRequesr;

const styles = StyleSheet.create({});
