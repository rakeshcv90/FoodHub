import {View, Text, ImageBackground, StyleSheet, StatusBar} from 'react-native';
import React, {useEffect} from 'react';

import IMAGES from '../Components/IMAGES';
import {navigate} from '../Components/Utilities/Functions/NavigationUtil';

const SplaceScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      navigate('Introduction');
    }, 2000);
  }, []);
  return (
    <>
      <StatusBar hidden={true} />
      <ImageBackground
        source={IMAGES.SPLACE}
        resizeMode="stretch"
        style={styles.image}
      />
    </>
  );
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});
export default SplaceScreen;
