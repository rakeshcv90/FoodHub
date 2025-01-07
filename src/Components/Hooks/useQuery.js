import React from 'react';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {LatLng} from 'react-native-maps';

export const DATABASE = 'Order';

export const TABLES = {
  BOOKINGS: 'Booking',
};

const useQuery = () => {
  const DB = firestore().collection(DATABASE);

  const getDBdata = async tableName => {
    try {
      const data = await DB.doc(tableName);
      console.log("test",data);
    } catch (error) {
      console.log('ERRR', error);
    }
  };

  const getConstantDBdata = (tableName, successCallback) => {
    try {
      return DB.doc(tableName).onSnapshot(successCallback, error =>
        console.error('Snapshot error:', error),
      );
    } catch (error) {
      console.error('Error setting up snapshot listener:', error);
    }
  };

  const postDBdata = async (tableName, data) => {
    try {
      const response = await DB.doc(tableName).set(data);
      console.log(response);
    } catch (error) {
      console.log('ERRRR', error);
    }
  };

  return {
    getDBdata,
    getConstantDBdata,
    postDBdata,
  };
};

export default useQuery;
