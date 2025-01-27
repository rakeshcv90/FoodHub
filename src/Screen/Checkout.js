import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
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
import {dispatch} from '../constants/DIMENSIONS';
import ACTIONS from '../redux/actions';

const Checkout = ({route}) => {
  const amount = route.params?.amount;
  const getCustomerAddress = useSelector(state => state?.getCustomerAddress);
  const getMyAddress = useSelector(state => state?.getMyAddress);
  const getMyDefaultAddress = useSelector(state => state?.getMyDefaultAddress);
  const paymentType = useSelector(state => state?.paymentType);
  const [subtotal] = useState(200); // Static for demo
  const {getDBdata, getConstantDBdata, postDBdata} = useQuery();
  const [loading, setLoading] = useState(false);
  const shippingCost = 8.0;
  const tax = 0.0;
  const total = subtotal + shippingCost + tax;
  const [resetCurrent, setResetCurrent] = useState(true);
  const [newCurrent, setNewCurrent] = useState(indiaIntialRegion);
  useCordinates({
    getAgain: resetCurrent,
    resetGetAgain: setResetCurrent,
    setCoordinates: setNewCurrent,
  });
  const handlePlaceOrder = async () => {
    setLoading(true);

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
        customerAddress: 'GURUGRAM',
        customerCoordinates: {
          latitude: newCurrent?.latitude,
          longitude: newCurrent?.longitude,
        },
        customerName: 'Cyber Vision Infotech',
        RestaurantsName: 'Test Restaurant',
        customerNumber: 9876543210,
        destinationCoordinates: {
          latitude: newCurrent?.latitude,
          longitude: newCurrent?.longitude,
        },
        destinationAddress: 'Test Address For Restaurant',
        price: amount,

        status: 'Food_Order',
      };

      postDBdata(TABLES.BOOKINGS, data).then(data => {
        console.log('sdfdsfsdfd33333', data);
      });
      setTimeout(() => {
        setLoading(false);
        navigate('OrderPlaced');
      }, 2000);
    }
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
              Checkout
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: 100,
          position: 'absolute',
          top: 300,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',

          zIndex: 1,
        }}>
        {loading && <ActivityIndicator size="large" color="#000000" />}
      </View>

      <View style={styles.section}>
        <View style={{padding: 15}}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <Text style={{color: COLORS.BLACK, fontWeight: '400', fontSize: 17,marginHorizontal:10}}>
            
            {getMyAddress[getMyDefaultAddress]?.type}
          </Text>
          <Text style={{color: COLORS.BLACK, fontWeight: '400', fontSize: 17,marginHorizontal:13}}>
            {getMyAddress[getMyDefaultAddress]?.address}
            {getMyAddress[getMyDefaultAddress]?.pin}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigate('Address');
          }}>
          <AppIcon
            name="chevron-right"
            size={30}
            type="MaterialIcons"
            color="black"
            style={{right:15}}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.section}
        // onPress={() => navigate('Payment', {fromCheckoutScreen: true})}
      >
        <View style={{padding: 15}}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentType?.name == '' ? (
            <Text
              style={{color: COLORS.BLACK, fontWeight: '400', fontSize: 17}}>
              Add Payment
            </Text>
          ) : (
            <View style={{flexDirection: 'row', alignItems: 'center',marginHorizontal:10}}>
              <Text
                style={{
                  marginRight: 10,
                  color: COLORS.BLACK,
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
        <TouchableOpacity
          onPress={() => navigate('Payment', {fromCheckoutScreen: true})}>
          <AppIcon
            name="chevron-right"
            size={30}
            type="MaterialIcons"
            color="black"
            style={{right:5}}
          />
        </TouchableOpacity>
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
        onPress={() => {
          handlePlaceOrder();
        }}>
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
    backgroundColor: COLORS.GRAYNEW2,
    borderRadius: 14,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    width: '95%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 10,
    color: COLORS.BLACK,
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
