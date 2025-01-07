import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../constants';
import AppIcon from '../Components/Utilities/AppIcon';
import IMAGES from '../Components/IMAGES';
import AppButton from '../Components/Utilities/AppButton';
import { dispatch } from '../constants/DIMENSIONS';
import ACTIONS from '../redux/actions';
import { goBack } from '../Components/Utilities/Functions/NavigationUtil';

const Payment = ({route}) => {
  const fromCheckoutScreen = route?.params?.fromCheckoutScreen;
  const [selected, setSelected] = useState(-1);
  const Types = [
    {
      id: 1,
      name: 'UPI Payment',
      image: IMAGES.UPI,
    },
    {
      id: 2,
      name: 'Card Payment',
      image: IMAGES.CARD,
    },

    {
      id: 3,
      name: 'Cash on Delivery',
      image: IMAGES.COD,
    },
  ];
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
              Payment
            </Text>
          </View>
        </View>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <View
          style={{
            width: '65%',
            alignItems: 'center',
            backgroundColor: 'lightgray',
            borderRadius: 10,
            padding: 10,
            marginVertical: 10,
          }}>
          {Types.map((item, index) => {
            const isSelected = item.id == selected;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelected(item.id)}
                style={[
                  styles.whiteContainer,
                  {
                    borderWidth: 1,
                    borderColor: isSelected ? COLORS.GREEN : COLORS.WHITE,
                    backgroundColor: COLORS.WHITE,
                    flexDirection: 'row',
                  },
                ]}>
                <Image
                  source={item.image}
                  style={{height: 100, width: 100, marginRight: 10}}
                  resizeMode="contain"
                />
                <Text style={styles.cardText}>{item.name}</Text>

                <AppIcon
                  name="check"
                  size={20}
                  type="MaterialCommunityIcons"
                  color={isSelected ? COLORS.PRIMARY_APP_COLOR : COLORS.WHITE}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{position: 'absolute', bottom: 0}}>
          <AppButton
            onPress={() => {
                dispatch(ACTIONS.setPaymentType(Types[selected - 1]));
                goBack();

            }}
            buttonProps={{activeOpacity: 0.7}}
            titleText="DONE"
            bR={10}
            mV={15}
            w={'80%'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Payment;

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
  whiteContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    width: '90%',
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 15,
  },
  cardStyle: {
    width: '90%',
    backgroundColor: COLORS.LIGHT_GREY,
    marginVertical: 10,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 7,
    alignItems: 'center',
    borderRadius: 12,
  },
});
