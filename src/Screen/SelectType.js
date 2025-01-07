import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AppIcon from '../Components/Utilities/AppIcon';
import {COLORS} from '../constants';
import {goBack, navigate} from '../Components/Utilities/Functions/NavigationUtil';

const SelectType = () => {
  const [select, setSelect] = useState(0);
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
            }}></View>
        </View>
      </View>
      <View style={{width: '95%', height: '30%', alignItems: 'center'}}>
        <Text
          style={{
            color: 'white',
            fontWeight: '700',
            fontSize: 24,
            textAlign: 'center',
            marginVertical: 20,
            color: 'white',
          }}>
          Tell us who you are!
        </Text>
        <Text
          style={{
            color: 'white',
            fontWeight: '400',
            fontSize: 14,
            textAlign: 'center',
            top: 0,
            color: '#D7D7D7',
          }}>
          Choose your role to get started!
        </Text>
      </View>
      <View
        style={{
          width: '99%',
          height: '70%',
          alignSelf: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setSelect(1);
          }}
          style={{
            width: '95%',
            height: 60,
            marginTop: 50,
            backgroundColor: '#F6F8FA',
            borderRadius: 8,
            alignItems: 'center',
            flexDirection: 'row',
            borderWidth: select == 1 ? 1 : 0,
            borderColor: select == 1 ? COLORS.GREEN : COLORS.WHITE,
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 15,
              backgroundColor: '#FFEDB7',
              borderRadius: 25,
            }}>
            <AppIcon
              name="user-large"
              size={25}
              type="FontAwesome6"
              color={COLORS.GREEN}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '900',
                color: 'black',
                top: -5,
              }}>
              I'm a Customer
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#7C7F8B',
                top: 5,
              }}>
              Order food and enjoy fast delivery!
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            SelectType(2);
          }}
          style={{
            width: '95%',
            height: 60,
            // marginVertical: 20,
            borderRadius: 8,
            flexDirection: 'row',
            marginTop: 30,
            alignItems: 'center',
            backgroundColor: '#F6F8FA',
            borderWidth: select == 2 ? 1 : 0,
            borderColor: select == 2 ? COLORS.GREEN : COLORS.WHITE,
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: 'red',
              marginHorizontal: 20,
              backgroundColor: '#FFEDB7',
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AppIcon
              name="human-scooter"
              size={30}
              type="MaterialCommunityIcons"
              color={COLORS.GREEN}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '900',
                color: 'black',
                top: -5,
              }}>
              I'm a Driver
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#7C7F8B',
                top: 5,
              }}>
              Deliver food and earn money!
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setSelect(3);
          }}
          style={{
            width: '95%',
            height: 60,
            borderRadius: 8,
            flexDirection: 'row',
            marginTop: 30,
            alignItems: 'center',
            backgroundColor: '#F6F8FA',
            borderWidth: select == 3 ? 1 : 0,
            borderColor: select == 3 ? COLORS.GREEN : COLORS.WHITE,
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: 'red',
              marginHorizontal: 20,
              backgroundColor: '#FFEDB7',
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AppIcon
              name="chef-hat"
              size={30}
              type="MaterialCommunityIcons"
              color={COLORS.GREEN}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '900',
                color: 'black',
                top: -5,
              }}>
              I'm a Chef
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#7C7F8B',
                top: 5,
              }}>
              Cook and connect with customers!
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: '90%',
            height: '10%',
            alignItems: 'center',
            marginTop: 80,
          }}>
          <TouchableOpacity
            style={styles.locationButton}
            activeOpacity={0.8}
            onPress={() => {
              if (select == 1) {
                   navigate('Home');
              } else if (select == 2) {
              } else if (select == 3) {
              } else {
                Alert.alert('Please Select atleast one');
              }
            }}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#121223',
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
  locationButton: {
    backgroundColor: '#FF7F26',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
