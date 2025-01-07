import React, {FC, memo, ReactNode, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  DimensionValue,
  TextStyle,
} from 'react-native';
import {COLORS, DIMENSIONS} from '../../constants';
import AppText, {AppTextProps} from './AppText';
import AppIcon, {AppIconTypes} from './AppIcon';
import AppDropdown, {AppDropdownProps} from './AppDropdown';
import PredefinedStyles from './styles/PredefinedStyles';
import useAppTheme from '../Hooks/useAppTheme';

export type Props = TextInputProps & {
  mV?: number;
  mH?: number;
  IconLeft?: AppIconTypes;
  IconRight?: AppIconTypes;
  IconLComp?: ReactNode;
  IconRComp?: ReactNode;
  labelText?: AppTextProps;
  errors: any | undefined;
  touched: boolean;
  bgColor?: string;
  bColor?: string;
  bR?: number;
  bW?: number;
  w?: 'half' | 'full' | '2/3' | DimensionValue;
  iconW?: DimensionValue;
  country?: boolean;
  currentCountry?: string;
  countryDropdown?: AppDropdownProps<any>;
  shadow?: boolean;
  textInputStyle?: TextStyle;
};
const AppInput: FC<Props> = ({
  labelText,
  IconLeft,
  IconRight,
  IconLComp,
  IconRComp,
  w = 'full',
  bgColor,
  errors,
  touched,
  bColor = COLORS.GREY,
  bR = 10,
  bW = 0,
  mH = 5,
  mV = 5,
  country = false,
  currentCountry = 'IN',
  countryDropdown,
  shadow,
  iconW,
  textInputStyle,
  ...props
}) => {
  const {APP_THEME, TEXT_THEME, BACKGROUND_THEME, SECONDARY_BACKGROUND_THEME} =
    useAppTheme();

  const Country = () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <View style={{width: '20%'}}>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <AppText
              type="SubHeading"
              value={currentCountry}
              textAlign="center"
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };
  return (
    <>
      {labelText && <AppText {...labelText} />}
      <View
        style={[
          {
            width:
              w === 'full'
                ? DIMENSIONS.SCREEN_WIDTH * 0.95
                : w === 'half'
                ? DIMENSIONS.SCREEN_WIDTH * 0.4
                : w === '2/3'
                ? DIMENSIONS.SCREEN_WIDTH * 0.7
                : DIMENSIONS.SCREEN_WIDTH * 0.9,
            marginVertical: mV,
            marginHorizontal: mH,
            borderRadius: bR,
            borderColor: bColor,
            borderWidth: bW,
            backgroundColor: bgColor ?? SECONDARY_BACKGROUND_THEME,
          },
          shadow && PredefinedStyles.ShadowStyle,
          PredefinedStyles.rowStyle,
          styles.container,
        ]}>
        {country && <Country />}
        {(IconLeft || IconLComp) && (
          <View style={{width: iconW ?? '10%'}}>
            {IconLeft ? <AppIcon {...(IconLeft as AppIconTypes)} /> : IconLComp}
          </View>
        )}
        <TextInput
          {...props}
          style={[textInputStyle, {flex: 1, color: TEXT_THEME}]}
        />
        {(IconRight || IconRComp) && (
          <View style={{width: '10%'}}>
            {IconRight ? (
              <AppIcon {...(IconRight as AppIconTypes)} />
            ) : (
              IconRComp
            )}
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    padding: 5,
  },
});

export default memo(AppInput);
