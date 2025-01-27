import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import React from 'react';
import {COLORS, DIMENSIONS} from '../constants';
import AppIcon from './Utilities/AppIcon';

const {SCREEN_HEIGHT, SCREEN_WIDTH} = DIMENSIONS;
const Search = () => {
  return (
    <TouchableOpacity
      // onPress={() => (buttonType ? navigate('SearchScreen') : {})}
      style={[
        styles.container,
        {width: SCREEN_WIDTH * 0.9, paddingVertical: 6},
      ]}>
      <AppIcon name="search1" size={25} type="AntDesign" color="black" />

      <TextInput
        placeholder="Search dishes,  restaurants"
        placeholderTextColor={COLORS.BLACK}
        cursorColor={COLORS.LIGHT_GREY}
        // value={value}
        // onChangeText={setValue}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.LIGHT_GREY,
    width: SCREEN_WIDTH * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    opacity: 0.3,
    marginTop:-10,
    paddingHorizontal: 12,
  },
});
export default Search;
