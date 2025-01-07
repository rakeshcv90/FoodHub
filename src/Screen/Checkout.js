import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  goBack,
  navigate,
} from '../Components/Utilities/Functions/NavigationUtil';
import {COLORS} from '../constants';
import AppIcon from '../Components/Utilities/AppIcon';
import {useSelector} from 'react-redux';
import useQuery, {TABLES} from '../Components/Hooks/useQuery';
import useCordinates from '../Components/Hooks/useCordinates';
import {indiaIntialRegion} from '../Components/Utilities/styles/customMapStyle';

const Checkout = ({route}) => {
  const amount = route.params?.amount;
  const getCustomerAddress = useSelector(state => state?.getCustomerAddress);
  const getMyAddress = useSelector(state => state?.getMyAddress);
  const getMyDefaultAddress = useSelector(state => state?.getMyDefaultAddress);
  const paymentType = useSelector(state => state?.paymentType);
  const [subtotal] = useState(200); // Static for demo
  const {getDBdata, getConstantDBdata, postDBdata} = useQuery();
  const shippingCost = 8.0;
  const tax = 0.0;
  const total = subtotal + shippingCost + tax;
  const [resetCurrent, setResetCurrent] = useState(false);
  const [newCurrent, setNewCurrent] = useState(indiaIntialRegion);
  useCordinates({
    getAgain: resetCurrent,
    resetGetAgain: setResetCurrent,
    setCoordinates: setNewCurrent,
  });
  const handlePlaceOrder = async () => {
    if (
      !paymentType?.name ||
      !getMyAddress[getMyDefaultAddress] ||
      (Array.isArray(getMyAddress[getMyDefaultAddress]) &&
        getMyAddress[getMyDefaultAddress].length === 0) ||
      (typeof getMyAddress[getMyDefaultAddress] === 'object' &&
        Object.keys(getMyAddress[getMyDefaultAddress]).length === 0)
    ) {
      Alert.alert(
        'Error',
        'Please complete all fields before placing an order.',
      );
      return;
    } else {
      const data = {
        customerAddress: "Uttam nagar",
        customerCoordinates: {
          latitude: newCurrent?.latitude,
          longitude: newCurrent?.longitude,
        },
        customerName: 'Cyber Vision Infotech',
        RestaurantsName: 'Test Restaurant',
        customerNumber: 9876543210,
        destinationCoordinates: {
          latitude: RideAddressDetails.destination.latitude,
          longitude: RideAddressDetails.destination.longitude,
        },
        destinationAddress: 'Test Address For Restaurant',
        price: amount,

        status: 'Food_Order',
      };

      postDBdata(TABLES.BOOKINGS, data).then(data => {
        console.log('sdfdsfsdfd33333', data);
      });

      // getdata();

      // Alert.alert('Success', 'Order placed successfully');
    }
    // navigate('OrderComplete');
  };
  // const getdata = async () => {
  //   getConstantDBdata(TABLES.BOOKINGS, data => {
  //     console.log('Placing order', data);
  //   });
  // };
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
              Checkout
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={{padding: 15}}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <Text style={{color: COLORS.WHITE, fontWeight: '400', fontSize: 17}}>
            {' '}
            {getMyAddress[getMyDefaultAddress]?.type}
          </Text>
          <Text style={{color: COLORS.WHITE, fontWeight: '400', fontSize: 17}}>
            {getMyAddress[getMyDefaultAddress]?.address}{' '}
            {getMyAddress[getMyDefaultAddress]?.pin}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigate('MyAddress');
          }}>
          <AppIcon
            name="chevron-right"
            size={30}
            type="MaterialIcons"
            color="white"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.section}
        onPress={() => navigate('Payment', {fromCheckoutScreen: true})}>
        <View style={{padding: 15}}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentType?.name == '' ? (
            <Text
              style={{color: COLORS.BLACK, fontWeight: '400', fontSize: 17}}>
              Add Payment
            </Text>
          ) : (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  marginRight: 10,
                  color: COLORS.WHITE,
                  fontWeight: '500',
                }}>
                {paymentType?.name}
              </Text>
              <Image
                source={paymentType?.image}
                style={{height: 40, width: 40, borderRadius: 20}}
                resizeMode="cover"
              />
            </View>
          )}
        </View>

        <AppIcon
          name="chevron-right"
          size={30}
          type="MaterialIcons"
          color="white"
        />
      </TouchableOpacity>
      <View
        style={{
          marginVertical: 10,
          // backgroundColor: COLORS.GREEN,
          borderRadius: 14,

          width: '90%',
          // justifyContent: 'space-between',
          // alignItems: 'center',
        }}>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>₹{amount - shippingCost}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping Cost</Text>
            <Text style={styles.summaryValue}>₹{shippingCost.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>₹{tax.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotalLabel}>Total</Text>
            <Text style={styles.summaryTotalValue}>₹{amount}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={handlePlaceOrder}>
        <Text style={styles.selectedSizeButtonText}>₹{amount}</Text>
        <Text style={styles.selectedSizeButtonText}>Place order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Checkout;

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
  section: {
    marginVertical: 10,
    backgroundColor: COLORS.GREEN,
    borderRadius: 14,
    flexDirection: 'row',

    width: '95%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 10,
    color: COLORS.GREY,
    padding: 12,
  },
  summaryContainer: {marginVertical: 20},
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {fontSize: 16, color: COLORS.GRAYNEW},
  summaryValue: {fontSize: 16, color: COLORS.GRAYNEW},
  summaryTotalLabel: {fontSize: 18, fontWeight: 'bold'},
  summaryTotalValue: {fontSize: 18, fontWeight: 'bold'},
  placeOrderButton: {
    backgroundColor: COLORS.GRAYNEW,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  placeOrderButtonText: {color: COLORS.WHITE, fontSize: 18, fontWeight: 'bold'},
  checkoutButton: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: COLORS.GREEN,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'space-between',
    padding: 14,
    marginBottom: 10,
  },
  selectedSizeButtonText: {
    color: COLORS.WHITE,
    fontWeight: '700',
  },
});
