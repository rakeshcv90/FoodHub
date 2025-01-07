import {ColorValue, TextStyle, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {COLORS} from '../../constants';
import useAppTheme from '../Hooks/useAppTheme';

export type AppIconTypes = {
  type:
    | 'MaterialCommunityIcons'
    | 'AntDesign'
    | 'MaterialIcons'
    | 'FontAwesome5'
    | 'Entypo'
    | 'FontAwesome6';
  color?: string;
  size: number;
  onPress?: () => void;
  name: string;
  mL?: number;
  mR?: number;
  style?: TextStyle;
  roundIcon?: boolean;
  bR?: number;
  bC?: ColorValue;
  roundBackground?: ColorValue;
  bW?: number;
  roundStyle?: ViewStyle;
};

const AppIcon: FC<AppIconTypes> = ({
  size,
  type,
  color,
  onPress,
  name,
  mR,
  mL,
  style,
  bC,
  bR,
  bW,
  roundIcon = false,
  roundBackground,
  roundStyle,
}) => {
  const {TEXT_THEME, BACKGROUND_THEME} = useAppTheme();
  return (
    <View
      style={[
        roundIcon && {
          padding: 10,
          borderRadius: bR ?? 100,
          borderWidth: bW ?? 1,
          borderColor: bC ?? color,
          backgroundColor: roundBackground ?? BACKGROUND_THEME,
          ...roundStyle,
        },
      ]}>
      {type == 'AntDesign' ? (
        <AntDesign
          name={name}
          size={size}
          onPress={onPress}
          color={color ?? TEXT_THEME}
          style={[style ? style : {marginLeft: mL ?? 0, marginRight: mR ?? 0}]}
        />
      ) : type == 'MaterialIcons' ? (
        <MaterialIcons
          name={name}
          size={size}
          onPress={onPress}
          color={color ?? TEXT_THEME}
          style={[style ? style : {marginLeft: mL ?? 0, marginRight: mR ?? 0}]}
        />
      ) : type == 'Entypo' ? (
        <Entypo
          name={name}
          size={size}
          onPress={onPress}
          color={color ?? TEXT_THEME}
          style={[style ? style : {marginLeft: mL ?? 0, marginRight: mR ?? 0}]}
        />
      ) : type == 'MaterialCommunityIcons' ? (
        <MaterialCommunityIcons
          name={name}
          size={size}
          onPress={onPress}
          color={color ?? TEXT_THEME}
          style={[style ? style : {marginLeft: mL ?? 0, marginRight: mR ?? 0}]}
        />
      ) : type == 'FontAwesome6' ? (
        <FontAwesome6
          name={name}
          size={size}
          onPress={onPress}
          color={color ?? TEXT_THEME}
          style={[style ? style : {marginLeft: mL ?? 0, marginRight: mR ?? 0}]}
        />
      ) : (
        <FontAwesome5
          name={name}
          size={size}
          onPress={onPress}
          color={color ?? TEXT_THEME}
          style={[style ? style : {marginLeft: mL ?? 0, marginRight: mR ?? 0}]}
        />
      )}
    </View>
  );
};

export default AppIcon;
