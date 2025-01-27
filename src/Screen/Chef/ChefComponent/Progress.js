import {FlatList, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS, DIMENSIONS} from '../../../constants';
import {data2} from '../../../Components/Data';
import {useSelector} from 'react-redux';
import useQuery, {TABLES} from '../../../Components/Hooks/useQuery';
import { indiaIntialRegion } from '../../../Components/Utilities/styles/customMapStyle';
import useCordinates from '../../../Components/Hooks/useCordinates';

const Progress = () => {
  const hasLocation = useSelector(state => state?.hasLocation);
  const {getDBdata, getConstantDBdata, postDBdata} = useQuery();
  const {SCREEN_HEIGHT, SCREEN_WIDTH} = DIMENSIONS;
  const mapRef = useRef(null);

  const [newCurrent, setNewCurrent] = useState(indiaIntialRegion);
  const [resetCurrent, setResetCurrent] = useState(true);
  const [orderData, setOrderData] = useState();
  useEffect(() => {
    const unsubscribe = getConstantDBdata(TABLES.BOOKINGS, snapshot => {
      if (snapshot.data().status == 'Food_Order' && hasLocation) {
        setOrderData(snapshot.data());
      }
    });

    return () => {
      // Ensure proper cleanup to avoid memory leaks
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
  

  useCordinates({
    getAgain: resetCurrent,
    resetGetAgain: setResetCurrent,
    setCoordinates: setNewCurrent,
  });

  const orderDispatch = () => {
      ToastAndroid.show('This is a demo app', ToastAndroid.CENTER);
    // const data = {
    //   customerAddress: orderData?.customerAddress,
    //   customerCoordinates: {
    //     latitude: orderData?.customerCoordinates?.latitude,
    //     longitude: orderData?.customerCoordinates?.longitude,
    //   },
    //   customerName: orderData?.customerName,
    //   RestaurantsName: orderData?.RestaurantsName,
    //   customerNumber: orderData?.customerNumber,
    //   destinationCoordinates: {
    //     latitude: newCurrent?.latitude,
    //     longitude: newCurrent?.longitude,
    //   },
    //   destinationAddress: 'Test Address For Restaurant',
    //   price: orderData?.amount,

    //   status: 'Food_Dispach',
    // };

    // postDBdata(TABLES.BOOKINGS, data).then(data => {
    //   console.log('sdfdsfsdfd33333', data);
    // });
  };
  const renderItem = ({item, index}) => {
    return (
      <View
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
            <Text>₹ {item?.price}</Text>
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
                activeOpacity={0.7}
                onPress={() => {
                  orderDispatch();
                }}
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
                  DONE
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

export default Progress;

const styles = StyleSheet.create({});
