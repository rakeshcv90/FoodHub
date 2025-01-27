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
import React, {useEffect, useState} from 'react';
import {COLORS, DIMENSIONS} from '../constants';
import AppIcon from '../Components/Utilities/AppIcon';
import {
  goBack,
  navigate,
} from '../Components/Utilities/Functions/NavigationUtil';
import {
  pizza,
  burger,
  biryani,
  fastfood,
  lunch,
  dinner,
} from '../Components/Data';
import AppText from '../Components/Utilities/AppText';
import {dispatch} from '../constants/DIMENSIONS';
import ACTIONS from '../redux/actions';
import {useSelector} from 'react-redux';


const ItemScreen = ({route}) => {
  const itemName = route?.params?.itemName;
  const {SCREEN_HEIGHT, SCREEN_WIDTH} = DIMENSIONS;
  const [quantities, setQuantities] = useState({});

  const [cartVisible, setCartVisible] = useState(false);
  const getCart = useSelector(state => state?.getCart);
  useEffect(() => {
    // Initialize quantities from cart
    const initialQuantities = {};
    getCart.forEach(item => {
      initialQuantities[item.id] = item.quantity;
    });
    setQuantities(initialQuantities);
  }, [getCart]);

  const increment = item => {
    const updatedQuantities = {
      ...quantities,
      [item.id]: (quantities[item.id] || 0) + 1,
    };
    setQuantities(updatedQuantities);

    const existingItem = getCart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      // Update existing item quantity in the cart
      const updatedCart = getCart.map(cartItem =>
        cartItem.id === item.id
          ? {...cartItem, quantity: updatedQuantities[item.id]}
          : cartItem,
      );
      dispatch(ACTIONS.setAddToCart(updatedCart)); // Dispatch updated cart to Redux
    } else {
      // Add a new item to the cart if it doesn't exist
      const updatedCart = [...getCart, {...item, quantity: 1}];
      dispatch(ACTIONS.setAddToCart(updatedCart)); // Dispatch new cart to Redux
    }
  };

  const decrement = item => {
    if (quantities[item.id] > 0) {
      const updatedQuantities = {
        ...quantities,
        [item.id]: Math.max((quantities[item.id] || 0) - 1, 0),
      };
      setQuantities(updatedQuantities);

      const updatedCart = getCart
        .map(cartItem =>
          cartItem.id === item.id
            ? {...cartItem, quantity: updatedQuantities[item.id]}
            : cartItem,
        )
        .filter(cartItem => cartItem.quantity > 0); // Filter out items with zero quantity

      dispatch(ACTIONS.setAddToCart(updatedCart)); // Dispatch updated cart to Redux
    }
  };

  const renderItem = ({item, index}) => {
    const quantity = quantities[item.id] || 0;
    return (
      <View
        activeOpacity={0.8}
        key={index}
        style={[
          {
            width: 200,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
            alignSelf: 'center',
          },
        ]}>
        <View
          style={{
            width: 160,
            backgroundColor: 'white',
            borderRadius: 20,
            // alignItems: 'center',
            justifyContent: 'center',
            elevation: 10,
            padding: 10,
          }}>
          <Image
            source={item.image}
            style={{
              width: 150,
              height: 120,
              borderRadius: 10,
              alignItems: 'center',
              alignSelf:'center'
            }}
            resizeMode="stretch"
          />
          <AppText
            type="normal"
            value={item.title}
            color={COLORS.BLACK}
            fontSize={14}
            fontWeight="400"
            marginTop={10}
          />

          <AppText
            type="normal"
            value={`₹${item.price}`}
            color={COLORS.BLACK}
            fontSize={12}
            marginHorizontal={5}
            fontWeight="400"
            marginTop={5}
          />
      
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => decrement(item)}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => increment(item)}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
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
              // opacity: 0.3,
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
      <View
        style={{width: '95%', marginVertical: SCREEN_WIDTH * 0.04, flex: 1}}>
        <FlatList
          data={
            itemName === 'Pizza'
              ? pizza
              : itemName === 'Burger'
              ? burger
              : itemName === 'Biryani'
              ? biryani
              : itemName === 'Fast Food'
              ? fastfood:itemName === 'Fast Food'
              ? fastfood:itemName === 'Lunch'?lunch:dinner
          }
          // horizontal
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          pagingEnabled
          renderItem={renderItem}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        {getCart.length > 0 && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigate('ShowCart')}
            style={{
              width: 60,
              height: 60,
              backgroundColor: COLORS.GRAYNEW,
              position: 'absolute',
              alignSelf: 'center',
              bottom: 20,
              borderRadius: 35,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 5,
            }}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: COLORS.BLACK,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AppIcon
                name="shopping-bag"
                size={25}
                type="MaterialIcons"
                color="white"
              />

              <View
                style={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: COLORS.GREEN,
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 3,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  {getCart?.length}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ItemScreen;

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
  subHeader2: {
    width: '20%',
    height: '100%',

    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: '#FFA500',
    borderRadius: 35,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  subHeader2: {
    width: '20%',
    height: '100%',

    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
});
