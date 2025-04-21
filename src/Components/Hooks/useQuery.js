// import React from 'react';
// import firestore, {
//   FirebaseFirestoreTypes,
// } from '@react-native-firebase/firestore';
// import {LatLng} from 'react-native-maps';

import React from 'react';
import { collection, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';

import DB from '../../../firebaseConfig';

export const DATABASE = 'Order';

export const TABLES = {
  BOOKINGS: 'Booking',
};

// const useQuery = () => {
//   const DB = firestore().collection(DATABASE);

//   const getDBdata = async tableName => {
//     try {
//       const data = await DB.doc(tableName);
//       console.log("test",data);
//     } catch (error) {
//       console.log('ERRR', error);
//     }
//   };

//   const getConstantDBdata = (tableName, successCallback) => {
//     try {
//       return DB.doc(tableName).onSnapshot(successCallback, error =>
//         console.error('Snapshot error:', error),
//       );
//     } catch (error) {
//       console.error('Error setting up snapshot listener:', error);
//     }
//   };

//   const postDBdata = async (tableName, data) => {
//     try {
//       const response = await DB.doc(tableName).set(data);
//       console.log(response);
//     } catch (error) {
//       console.log('ERRRR', error);
//     }
//   };

//   return {
//     getDBdata,
//     getConstantDBdata,
//     postDBdata,
//   };
// };
const useQuery = () => {
  const DBRef = collection(DB, DATABASE);

  const getDBdata = async (tableName) => {
    try {
      const docRef = doc(DBRef, tableName);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Data:', docSnap.data());
        return docSnap.data();
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const getConstantDBdata = (tableName, successCallback) => {
    try {
      const docRef = doc(DBRef, tableName);
      return onSnapshot(docRef, successCallback, (error) => {
        console.error('Snapshot error:', error);
      });
    } catch (error) {
      console.error('Error setting up snapshot listener:', error);
    }
  };

  const postDBdata = async (tableName, data) => {
    try {
      const docRef = doc(DBRef, tableName);
      await setDoc(docRef, data);
      console.log('Data posted successfully!');
    } catch (error) {
      console.log('Error posting data:', error);
    }
  };

  return {
    getDBdata,
    getConstantDBdata,
    postDBdata,
  };
};
export default useQuery;
