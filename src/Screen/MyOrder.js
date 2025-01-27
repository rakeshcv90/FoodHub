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
import {
  goBack,
  navigate,
} from '../Components/Utilities/Functions/NavigationUtil';
import {COLORS, DIMENSIONS} from '../constants';
import AppIcon from '../Components/Utilities/AppIcon';
import {data3, myOrder} from '../Components/Data';

const MyOrder = () => {
  const {SCREEN_HEIGHT, SCREEN_WIDTH} = DIMENSIONS;
  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={{width: '100%'}}>
        <TouchableOpacity
          onPress={() => {
            navigate('OrderTrack');
          }}
          activeOpacity={0.8}
          style={{
            width: '100%',
            alignSelf: 'center',
            marginVertical: 10,
            marginLeft: 10,
          }}>
          <View
            style={{
              width: '100%',
              paddingBottom: 25,
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
                  style={{width: '100%', height: 120}}
                />
              </View>

              <View
                style={{
                  width: '67%',
                  marginLeft: 10,
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
                      fontWeight: '700',
                    }}>
                    {item?.title2}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.BLACK,
                      fontSize: 16,
                      fontWeight: '700',
                      marginRight: 10,
                    }}>
                    $ {item?.price}
                  </Text>
                </View>

                <View>
                  <Text
                    style={{
                      color: COLORS.BLACK,
                      marginVertical: 5,
                      fontSize: 15,
                      fontWeight: '600',
                    }}>
                    {item?.title}
                  </Text>
                </View>
                <Text
                  style={{
                    color: COLORS.BLACK,
                    fontSize: 13,
                    fontWeight: '600',
                    marginVertical: 5,
                  }}>
                  {item?.date}
                </Text>
                <View
                  style={{
                    width: '98%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
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
                  <View
                    style={{
                      width: 100,
                      height: 30,
                      backgroundColor:
                        item?.status == 'Delivered'
                          ? '#34C75929'
                          : item?.status == 'Pending'
                          ? '#FF950029'
                          : '#FFB8BA',
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontWeight: '500',
                        color:
                          item?.status == 'Delivered'
                            ? '#0CC25F'
                            : item?.status == 'Pending'
                            ? '#FF9500'
                            : 'black',
                      }}>
                      {item?.status}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {/* Divider Line */}
        <View
          style={{
            height: 1.5,
            backgroundColor: '#EFEFEF', // Adjust to your desired color
            marginVertical: -10, // Add spacing above and below the line
            width: '100%',
            alignSelf: 'center', // Center the divider
          }}
        />
      </View>
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
              style={{left:2}}
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
              My Orders
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <Text
          style={{
            marginLeft: 10,
            marginVertical: 8,
            fontSize: 18,
            fontWeight: '600',
          }}>
          Total 5 items
        </Text>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={myOrder}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          pagingEnabled
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyOrder;

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
  body: {
    width: '95%',
  },
});
