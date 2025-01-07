import {
  ColorValue,
  DimensionValue,
  FlexStyle,
  StyleSheet,
  
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import React, {ReactNode} from 'react';
import {COLORS, } from '../../constants';
import AppText, {AppTextProps} from './AppText';
import useAppTheme from '../Hooks/useAppTheme';
import AppIcon, {AppIconTypes} from './AppIcon';
import PredefinedStyles from './styles/PredefinedStyles';

export type ButtonProps = {
  id?: number;
  bgColor?: ColorValue;
  bColor?: ColorValue;
  textColor?: ColorValue;
  bR?: number;
  bW?: number;
  w?: 'half' | 'full' | 'contain' | DimensionValue;
  mV?: number;
  mH?: number;
  padV?: number;
  titleText: AppTextProps | string;
  shadow?: boolean;
  onPress: () => void;
  IconLeft?: AppIconTypes;
  IconLComp?: ReactNode;
  iconW?: DimensionValue;
  justifyContent?: FlexStyle['justifyContent'];
  padH?: number;
  style?: ViewStyle;
  buttonProps?: TouchableOpacityProps
  hasIcon?: boolean
};

const AppButton = ({
  w = 'full',
  bgColor,
  bColor = COLORS.GREY,
  bR = 30,
  bW = 0,
  mH = 5,
  mV = 5,
  titleText = '',
  shadow = false,
  textColor,
  padV = 12,
  padH = 10,
  onPress,
  IconLComp,
  IconLeft,
  iconW,
  justifyContent,
  style,
  hasIcon = false,
  buttonProps
}: ButtonProps) => {
  const {APP_THEME, TEXT_THEME} = useAppTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          width:
            w === 'contain'
              ? '85%'
              : w === 'half'
              ? '50%'
              : w === 'full'
              ? '100%'
              : w,
          marginVertical: mV,
          marginHorizontal: mH,
          borderRadius: bR,
          borderColor: bColor,
          borderWidth: bW,
          backgroundColor: bgColor ?? APP_THEME,
          justifyContent: justifyContent ?? 'center',
          paddingVertical: padV,
          paddingHorizontal: padH,
        },
        shadow && PredefinedStyles.ShadowStyle,
       hasIcon && PredefinedStyles.rowStyle,
        styles.container,
        style,
      ]}
      {...buttonProps}>
      {(IconLeft || IconLComp) && (
        <View style={{width: iconW ?? '10%'}}>
          {IconLeft ? <AppIcon {...(IconLeft as AppIconTypes)} /> : IconLComp}
        </View>
      )}
      {typeof titleText == 'string' ? (
        <AppText
          type="SubHeading"
          value={titleText}
          color={textColor ?? TEXT_THEME}
          textAlign={hasIcon ? 'justify': 'center'}
        />
      ) : (
        <AppText {...(titleText as AppTextProps)} />
      )}
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
});
