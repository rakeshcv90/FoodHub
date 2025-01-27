import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import {
  goBack,
  navigate,
} from '../Components/Utilities/Functions/NavigationUtil';
import {COLORS} from '../constants';
import AppIcon from '../Components/Utilities/AppIcon';
import IMAGES from '../Components/IMAGES';

const Profile = () => {
  const demoApp = () => {
    ToastAndroid.show('This is a demo app', ToastAndroid.CENTER);
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
              Profile
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          width: '90%',
          marginVertical: 20,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: 100,
            height: '100',
            justifyContent: 'center',
            borderRadius: 50,

            backgroundColor: COLORS.GRAYNEW2,
          }}>
          <Image
            source={IMAGES.Profile}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              alignSelf: 'center',
            }}
            resizeMode="stretch"
          />
        </View>
        <View
          style={{
            marginHorizontal: 30,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.GRAYNEW1,
            }}>
            David
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '400',
              color: COLORS.GRAYNEW1,
            }}>
            I love fast food
          </Text>
        </View>
      </View>
      <View
        style={{width: '95%', justifyContent: 'center', alignItems: 'center'}}>
        <ScrollView
          style={{width: '100%'}}
          contentContainerStyle={{paddingBottom: 250}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: '100%',
              borderRadius: 15,
              backgroundColor: COLORS.GRAYNEW3,
              padding: 10,
              marginVertical: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                demoApp();
              }}
              style={{
                width: '100%',
                alignItems: 'center',
                flexDirection: 'row',
                marginVertical: 10,
                marginHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}>
                <AppIcon
                  name="user"
                  size={20}
                  type="FontAwesome5"
                  color={COLORS.GREEN}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    marginHorizontal: 10,
                    color: COLORS.GRAYNEW1,
                  }}>
                  Personal Information
                </Text>
              </View>

              <AppIcon
                name="chevron-right"
                size={22}
                style={{marginRight: 10}}
                type="MaterialIcons"
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate('Address')}
              style={{
                width: '100%',
                alignItems: 'center',
                flexDirection: 'row',
                marginVertical: 10,
                marginHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}>
                <AppIcon
                  name="map-location"
                  size={20}
                  type="FontAwesome6"
                  color="#8886fd"
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    marginHorizontal: 10,
                    color: COLORS.GRAYNEW1,
                  }}>
                  Address
                </Text>
              </View>

              <AppIcon
                name="chevron-right"
                size={22}
                type="MaterialIcons"
                color="black"
                style={{marginRight: 10}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              borderRadius: 15,
              backgroundColor: COLORS.GRAYNEW3,
              padding: 10,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigate('MyOrder');
              }}
              style={{
                width: '100%',
                alignItems: 'center',
                flexDirection: 'row',
                marginVertical: 10,
                marginHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}>
                <AppIcon
                  name="shoppingcart"
                  size={22}
                  type="AntDesign"
                  color={'#81c0ff'}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    marginHorizontal: 10,
                    color: COLORS.GRAYNEW1,
                  }}>
                  My Orders
                </Text>
              </View>

              <AppIcon
                name="chevron-right"
                size={22}
                style={{marginRight: 10}}
                type="MaterialIcons"
                color="black"
              />
            </TouchableOpacity>
            {/* <View
              style={{
                width: '100%',
                alignItems: 'center',
                flexDirection: 'row',
                marginVertical: 10,
                marginHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}>
                <AppIcon
                  name="shoppingcart"
                  size={22}
                  type="AntDesign"
                  color={'#81c0ff'}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    marginHorizontal: 10,
                    color: COLORS.GRAYNEW1,
                  }}>
                  Cart
                </Text>
              </View>

              <AppIcon
                name="chevron-right"
                size={22}
                style={{marginRight: 10}}
                type="MaterialIcons"
                color="black"
              />
            </View> */}
            <TouchableOpacity
              onPress={() => {
                demoApp();
              }}
              style={{
                width: '100%',
                alignItems: 'center',
                flexDirection: 'row',
                marginVertical: 10,
                marginHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}>
                <AppIcon
                  name="hearto"
                  size={20}
                  type="AntDesign"
                  color={'#c66efc'}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    marginHorizontal: 10,
                    color: COLORS.GRAYNEW1,
                  }}>
                  Favourite
                </Text>
              </View>

              <AppIcon
                name="chevron-right"
                size={22}
                type="MaterialIcons"
                color="black"
                style={{marginRight: 10}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                demoApp();
              }}
              style={{
                width: '100%',
                alignItems: 'center',
                flexDirection: 'row',
                marginVertical: 10,
                marginHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}>
                <AppIcon
                  name="bell"
                  size={20}
                  type="FontAwesome"
                  color="orange"
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    marginHorizontal: 10,
                    color: COLORS.GRAYNEW1,
                  }}>
                  Notifications
                </Text>
              </View>

              <AppIcon
                name="chevron-right"
                size={22}
                type="MaterialIcons"
                color="black"
                style={{marginRight: 10}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                demoApp();
              }}
              style={{
                width: '100%',
                alignItems: 'center',
                flexDirection: 'row',
                marginVertical: 10,
                marginHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}>
                <AppIcon
                  name="payment"
                  size={20}
                  type="MaterialIcons"
                  color={'#81c0ff'}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    marginHorizontal: 10,
                    color: COLORS.GRAYNEW1,
                  }}>
                  Payment Method
                </Text>
              </View>

              <AppIcon
                name="chevron-right"
                size={22}
                type="MaterialIcons"
                color="black"
                style={{marginRight: 10}}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: '100%',
              borderRadius: 15,
              backgroundColor: COLORS.GRAYNEW3,
              padding: 10,
              marginVertical: 20,
            }}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                flexDirection: 'row',
                marginVertical: 10,
                marginHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  demoApp();
                }}
                style={{
                  width: '90%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}>
                <AppIcon
                  name="question-circle"
                  size={20}
                  type="FontAwesome"
                  color={COLORS.GREEN}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    marginHorizontal: 10,
                    color: COLORS.GRAYNEW1,
                  }}>
                  FAQs
                </Text>
              </TouchableOpacity>

              <AppIcon
                name="chevron-right"
                size={22}
                style={{marginRight: 10}}
                type="MaterialIcons"
                color="black"
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                demoApp();
              }}
              style={{
                width: '100%',
                alignItems: 'center',
                flexDirection: 'row',
                marginVertical: 10,
                marginHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}>
                <AppIcon
                  name="reviews"
                  size={20}
                  type="MaterialIcons"
                  color="#43e5e5"
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    marginHorizontal: 10,
                    color: COLORS.GRAYNEW1,
                  }}>
                  User Raviews
                </Text>
              </View>

              <AppIcon
                name="chevron-right"
                size={22}
                type="MaterialIcons"
                color="black"
                style={{marginRight: 10}}
              />
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                flexDirection: 'row',
                marginVertical: 10,
                marginHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  demoApp();
                }}
                style={{
                  width: '90%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}>
                <AppIcon
                  name="setting"
                  size={20}
                  type="AntDesign"
                  color="#423dfb"
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    marginHorizontal: 10,
                    color: COLORS.GRAYNEW1,
                  }}>
                  Settings
                </Text>
              </TouchableOpacity>

              <AppIcon
                name="chevron-right"
                size={22}
                type="MaterialIcons"
                color="black"
                style={{marginRight: 10}}
              />
            </View>
          </View>
          {/* <View
            style={{
              width: '100%',
              borderRadius: 15,
              backgroundColor: COLORS.GRAYNEW3,
              padding: 10,
              marginVertical: 0,
            }}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                flexDirection: 'row',
                marginVertical: 10,
                marginHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}>
                <AppIcon
                  name="log-out"
                  size={20}
                  type="Entypo"
                  color={COLORS.GREEN}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    marginHorizontal: 10,
                    color: COLORS.GRAYNEW1,
                  }}>
                  Log Out
                </Text>
              </View>

              <AppIcon
                name="chevron-right"
                size={22}
                style={{marginRight: 10}}
                type="MaterialIcons"
                color="black"
              />
            </View>
          </View> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

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
