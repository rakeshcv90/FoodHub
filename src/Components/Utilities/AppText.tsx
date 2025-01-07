import {
  ColorValue,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  View,
} from 'react-native';
import React, {FC, ReactNode} from 'react';
import {COLORS} from '../../constants';
import useAppTheme from '../Hooks/useAppTheme';

export type AppTextProps = TextProps & {
  customStyle?: TextStyle;
  type: 'normal' | 'SubHeading' | 'Heading' | 'none';
  color?: ColorValue;
  value: string;
  errorType?: boolean;
  textAlign?: 'center' | 'left' | 'right' | 'justify';
  textTransform?: 'capitalize' | 'uppercase' | 'none';
  letterSpacing?: number;
  fontFamily?: string;
  fontWeight?: string;
  fontSize?: number;
  lineHeight?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  fontStyle?: 'normal' | 'italic';
  w?: string | any;
  textDecorationLine?: 'line-through' | 'underline';
  onPress?: Function;
  children?: ReactNode;
  marginTop?: number;
  marginBottom?: number;
};

const AppText: FC<AppTextProps> = ({
  value,
  color,
  customStyle,
  errorType,
  type,
  letterSpacing,
  textAlign,
  textTransform,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  marginVertical,
  fontStyle,
  w,
  textDecorationLine,
  onPress,
  children,
  marginHorizontal,
  marginTop,
  marginBottom,
  ...Props
}) => {
  const {TEXT_THEME} = useAppTheme()
  const getTypeStyle = () => {
    switch (type) {
      case 'Heading':
        return {
          //   fontFamily: fontFamily || Fonts.HELVETICA_BOLD,
          fontSize: fontSize || 24,
          fontWeight: fontWeight || '600',
          lineHeight: lineHeight || 32,
          color: color || (errorType ? COLORS.RED : TEXT_THEME),
          textAlign: textAlign || 'auto',
          textTransform: textTransform || 'none',
          letterSpacing: letterSpacing || 0,
          marginVertical,
          marginHorizontal,
          fontStyle,
          width: w ?? 'auto',
          textDecorationLine,
          marginTop: marginTop,
          marginBottom: marginBottom,
        };
      case 'SubHeading':
        return {
          //   fontFamily: fontFamily || Fonts.MONTSERRAT_MEDIUM,
          fontSize: fontSize || 16,
          fontWeight: fontWeight || '600',
          lineHeight: lineHeight || 24,
          color: color || (errorType ? COLORS.RED : TEXT_THEME),
          textAlign: textAlign || 'auto',
          textTransform: textTransform || 'none',
          letterSpacing: letterSpacing || 0,
          marginVertical,
          marginHorizontal,
          fontStyle,
          width: w ?? 'auto',
          textDecorationLine,
          marginTop: marginTop,
          marginBottom: marginBottom,
        };
      case 'normal':
        return {
          //   fontFamily: fontFamily || Fonts.HELVETICA_REGULAR,
          fontSize: fontSize || 14,
          fontWeight: fontWeight || '600',
          lineHeight: lineHeight || 20,
          color: color || (errorType ? COLORS.RED : TEXT_THEME),
          textAlign: textAlign || 'auto',
          textTransform: textTransform || 'none',
          letterSpacing: letterSpacing || 0,
          marginVertical,
          marginHorizontal,
          fontStyle,
          width: w ?? 'auto',
          textDecorationLine,
          marginTop: marginTop,
          marginBottom: marginBottom,
        };
      default:
        return {};
    }
  };
  return (
    <>
      <Text onPress={onPress} style={[getTypeStyle(), customStyle]} {...Props}>
        {value}
        {children}
      </Text>
    </>
  );
};

export default AppText;

const styles = StyleSheet.create({});
