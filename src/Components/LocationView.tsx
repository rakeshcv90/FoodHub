import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {COLORS} from '../constants';
import AppIcon from './Utilities/AppIcon';
import useAppTheme from './Hooks/useAppTheme';
import AppText from './Utilities/AppText';
import PredefinedStyles from './Utilities/styles/PredefinedStyles';

type LocationViewTypes = {
  currentName: string;
  destinationName: string;
  containerStyle?: ViewStyle;
  setLayout: Dispatch<SetStateAction<number>>;
};

const LocationView = ({
  currentName,
  destinationName,
  containerStyle,
  setLayout,
}: LocationViewTypes) => {
  const {APP_THEME, BACKGROUND_THEME, TEXT_THEME} = useAppTheme();
  return (
    <View
      onLayout={({nativeEvent}: LayoutChangeEvent) =>
        setLayout(nativeEvent.layout.height)
      }
      style={[
        {
          borderWidth: 0.5,
          borderColor: COLORS.LIGHT_GREY,
          padding: 10,
          borderRadius: 10,
          backgroundColor: BACKGROUND_THEME,
          alignSelf: 'center',
        },
        containerStyle,
      ]}>
      <View style={PredefinedStyles.rowStyle}>
        <AppIcon
          name="location-pin"
          type="MaterialIcons"
          size={15}
          color={APP_THEME}
        />
        <AppText
          type="SubHeading"
          customStyle={{marginLeft: 25}}
          value={currentName}
        />
      </View>
      <View
        style={{...PredefinedStyles.rowStyle, justifyContent: 'space-between'}}>
        <AppText
          value="---"
          type="normal"
          customStyle={{transform: [{rotate: '90deg'}]}}
          marginVertical={5}
          marginHorizontal={2}
          color={COLORS.LIGHT_GREY}
        />
        <View style={styles.border} />
      </View>
      <View style={{...PredefinedStyles.rowStyle}}>
        <AppIcon
          name="location-pin"
          type="MaterialIcons"
          size={15}
          color={COLORS.RED}
        />
        <AppText
          type="SubHeading"
          customStyle={{marginLeft: 25}}
          value={destinationName}
        />
      </View>
    </View>
  );
};

export default LocationView;

const styles = StyleSheet.create({
  border: {
    height: 1,
    backgroundColor: COLORS.LIGHT_BLACK,
    width: '90%',
  },
});
