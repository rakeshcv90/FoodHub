import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import AppIcon from '../Components/Utilities/AppIcon';
import {COLORS, DIMENSIONS} from '../constants';
import {dispatch} from '../constants/DIMENSIONS';
import ACTIONS from '../redux/actions';
import {useSelector} from 'react-redux';
import {
  goBack,
  navigate,
} from '../Components/Utilities/Functions/NavigationUtil';
import AppButton from '../Components/Utilities/AppButton';

import LottieView from 'lottie-react-native';
const ShowCart = () => {
  const {SCREEN_HEIGHT, SCREEN_WIDTH} = DIMENSIONS;
  const getCart = useSelector(state => state?.getCart);
  const animationRef = useRef(null);
  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(30, 120);
  }, []);
  const clearCart = () => {
    dispatch(ACTIONS.setAddToCart([]));
  };
  const increaseQuantity = itemId => {
    const updatedCart = getCart.map(item =>
      item.id === itemId ? {...item, quantity: item.quantity + 1} : item,
    );
    dispatch(ACTIONS.setAddToCart(updatedCart));
  };

  const decreaseQuantity = itemId => {
    const updatedCart = getCart.map(item =>
      item.id === itemId && item.quantity > 1
        ? {...item, quantity: item.quantity - 1}
        : item,
    );
    dispatch(ACTIONS.setAddToCart(updatedCart));
  };
  const removeItem = itemId => {
    const updatedCart = getCart.filter(item => item.id !== itemId);
    dispatch(ACTIONS.setAddToCart(updatedCart));
  };
  const calculateSubtotal = () => {
    return getCart?.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };
  const shippingCost = 8.0; // Example shipping cost
  const subtotal = calculateSubtotal();
  const total = subtotal + shippingCost;
  const renderItem = ({item}) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>

        <Text style={styles.itemDetailsText}>Quantity - {item.quantity}</Text>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={styles.itemPrice}>
          ₹{(item.price * item.quantity).toFixed(2)}
        </Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => increaseQuantity(item.id)}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => decreaseQuantity(item.id)}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeItem(item.id)}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
              Cart
              {/* {itemName} */}
            </Text>
          </View>
        </View>
      </View>
      {getCart?.length === 0 ? (
        <>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <LottieView
              source={require('../assets/animation.json')}
              autoPlay
              loop
              style={{width: 200, height: 200}}
            />
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              width: SCREEN_WIDTH * 0.9,
              alignSelf: 'center',
            }}>
            <Text style={styles.clearCartText} onPress={clearCart}>
              Remove All
            </Text>
          </View>
          <View
            style={{
              width: '95%',
              marginVertical: SCREEN_WIDTH * 0.02,
              // flex: 1,
              height: SCREEN_HEIGHT * 0.5,
              alignSelf: 'center',
            }}>
            <FlatList
              data={getCart}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.cartList}
            />
          </View>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₹{subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping Cost</Text>
              <Text style={styles.summaryValue}>
                ₹{shippingCost.toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.summaryValue}>₹0.00</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryTotalLabel}>Total</Text>
              <Text style={styles.summaryTotalValue}>₹{total.toFixed(2)}</Text>
            </View>
          </View>

          <AppButton
            onPress={() => {
              navigate('Checkout', {amount: total.toFixed(2)});
            }}
            buttonProps={{activeOpacity: 0.7}}
            titleText="Checkout"
            bR={10}
            w={'80%'}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default ShowCart;

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
  headerTitle: {fontSize: 24, fontWeight: 'bold'},
  clearCartText: {
    color: COLORS.BLACK,
    textAlign: 'right',
    fontSize: 16,
    fontWeight: '500',
  },
  cartList: {marginBottom: 16},
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  itemImage: {width: 60, height: 60, borderRadius: 8, marginRight: 12},
  itemDetails: {flex: 1},
  itemTitle: {fontSize: 16, fontWeight: 'bold', color: COLORS.BLACK},
  itemDetailsText: {fontSize: 14, color: COLORS.BLACK},
  quantityControls: {
    alignItems: 'center',
    marginRight: 0,
    marginHorizontal: 8,
    flexDirection: 'row',
  },
  quantityButton: {
    width: 24,
    height: 24,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 4,
    marginLeft: 7,
    marginTop: 6,
  },
  quantityButtonText: {color: '#fff', fontSize: 16},
  quantity: {fontSize: 16, marginVertical: 4},
  itemPrice: {fontSize: 16, fontWeight: 'bold', color: '#333'},
  summaryContainer: {marginVertical: 16, width: '95%', alignSelf: 'center'},
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {fontSize: 16, color: '#555'},
  summaryValue: {fontSize: 16, color: '#333'},
  summaryTotalLabel: {fontSize: 18, fontWeight: 'bold'},
  summaryTotalValue: {fontSize: 18, fontWeight: 'bold'},
  couponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  },
  couponInput: {flex: 1, fontSize: 16},
  couponButton: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  couponButtonText: {color: '#fff', fontSize: 16},
  checkoutButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
  removeButton: {
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#FF6347', // Tomato color
    borderRadius: 8,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
