import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import IMAGES from '../../../Components/IMAGES';
import {COLORS} from '../../../constants';
import useQuery, { TABLES } from '../../../Components/Hooks/useQuery';

const OrderView = ({open, onClose, orderData}) => {
  if (!open) return null;

  const {getDBdata, getConstantDBdata, postDBdata} = useQuery();
  const acceptOrder = async () => {
    const data = {
      customerAddress: orderData?.customerAddress,
      customerCoordinates: {
        latitude: orderData?.customerCoordinates?.latitude,
        longitude: orderData?.customerCoordinates?.longitude,
      },
      customerName: orderData?.customerName,
      RestaurantsName: orderData?.RestaurantsName,
      customerNumber: orderData?.customerNumber,
      destinationCoordinates: {
        latitude: 28.5057,
        longitude: 77.0967,
      },
      destinationAddress: orderData?.destinationAddress,
      price: orderData?.price,

      status: 'Order_Accepted',
    };

    postDBdata(TABLES.BOOKINGS, data).then(data => {
      console.log('sdfdsfsdfd33333', data);
    });
    setTimeout(() => {
      onClose();
    }, 1000);
  };
  const acceptCancel = async () => {
    const data = {
      customerAddress: orderData?.customerAddress,
      customerCoordinates: {
        latitude: orderData?.customerCoordinates?.latitude,
        longitude: orderData?.customerCoordinates?.longitude,
      },
      customerName: orderData?.customerName,
      RestaurantsName: orderData?.RestaurantsName,
      customerNumber: orderData?.customerNumber,
      destinationCoordinates: {
        latitude: 28.5057,
        longitude: 77.0967,
      },
      destinationAddress: orderData?.destinationAddress,
      price: orderData?.price,

      status: 'Food_Cancel',
    };

    postDBdata(TABLES.BOOKINGS, data).then(data => {
      console.log('sdfdsfsdfd33333', data);
    });
    setTimeout(() => {
      onClose();
    }, 1000);
  };
  return (
    // <View style={styles.container}>

    <Modal
      transparent
      visible={open}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => onClose()}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
              }}>
              <Image
                source={IMAGES.Profile}
                style={{
                  width: 100,
                  height: 100,

                  borderRadius: 10,
                  alignSelf: 'center',
                }}
                resizeMode="stretch"
              />
              <View style={{marginHorizontal: 15, marginVertical: 5}}>
                <Text
                  style={{
                    color: COLORS.GREEN,
                    textDecorationLine: 'underline',
                  }}>
                  #123456
                </Text>
                <Text
                  style={{
                    color: COLORS.BLACK,
                    fontWeight: '600',
                    fontSize: 15,
                    marginTop: 10,
                  }}>
                  Chicken Thai Biriyani
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 10,
                    justifyContent: 'space-between',
                    width: '80%',
                  }}>
                  <Text style={{color: '#7C7F8B', fontSize: 14}}>
                    Quantity:{' '}
                    <Text
                      style={{color: '#000', fontSize: 14, fontWeight: '600'}}>
                      Half
                    </Text>
                  </Text>
                  <Text
                    style={{color: '#000', fontSize: 14, fontWeight: '600'}}>
                    $60
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                height: 3,
                marginVertical: 10,
                backgroundColor: '#F5F5F5',
              }}></View>

            <View style={styles.locationContainer}>
              <View style={styles.locationItem}>
                <View style={styles.dot} />
                <Text style={styles.locationText}>
                  samaspur, sector 51, gurgaon
                </Text>
              </View>

              <View style={[styles.line, {top: -20}]} />

              <View style={styles.locationItem}>
                <View
                  style={[
                    styles.squar,
                    {
                      top: -35,
                    },
                  ]}
                />
                <Text style={[styles.locationText, {top: -35}]}>
                  cyber city, sector 48, gurgaon
                </Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.rejectButton}
                onPress={() => {
                  acceptCancel();
                }}>
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => {
                  acceptOrder();
                }}>
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
    // </View>
  );
};

export default OrderView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  openButton: {
    padding: 10,
    backgroundColor: '#3378ff',
    borderRadius: 8,
  },
  openButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 600,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  verifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'red',
  },
  rating: {
    fontSize: 16,
    marginRight: 10,
  },
  verified: {
    fontSize: 16,
    color: '#4caf50',
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  // locationContainer: {
  //   width: '100%',
  //   marginBottom: 20,
  // },
  // locationItem: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginBottom: 10,
  // },
  // dot: {
  //   width: 8,
  //   height: 8,
  //   borderRadius: 4,
  //   backgroundColor: 'black',
  //   marginRight: 10,
  // },
  // locationText: {
  //   fontSize: 16,
  //   flex: 1,
  // },
  // locationType: {
  //   fontSize: 14,
  //   color: 'gray',
  // },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: -30,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#ff5252',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: COLORS.GREEN,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  locationContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 16,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
    marginRight: 8,
  },
  squar: {
    width: 10,
    height: 10,

    backgroundColor: 'black',
    marginRight: 8,
  },
  locationText: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  locationType: {
    fontSize: 14,
    color: 'gray',
  },
  line: {
    width: 2,
    backgroundColor: 'black',
    // alignSelf: 'center',
    height: 100, // Adjust the height to match the distance between dots
    marginLeft: 5, // Align with the dot
  },
});
