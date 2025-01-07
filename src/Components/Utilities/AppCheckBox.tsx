import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import AppText, {AppTextProps} from './AppText';
import AppIcon from './AppIcon';
import useAppTheme from '../Hooks/useAppTheme';
import {COLORS} from '../../constants';
import PredefinedStyles from './styles/PredefinedStyles';

type Props = {
  text: AppTextProps;
  checked: boolean;
  setChecked: () => void;
  checkStyle?: ViewStyle;
  mV?: number;
  bW?: number
};

const AppCheckBox = ({
  checked = false,
  setChecked,
  text,
  checkStyle,
  mV = 5,
  bW = 1
}: Props) => {
  const {APP_THEME, SECONDARY_BACKGROUND_THEME} = useAppTheme();
  return (
    <View style={[PredefinedStyles.rowStyle, {marginVertical: mV}]}>
      <TouchableOpacity
        onPress={setChecked}
        style={[
          {
            borderRadius: 5,
            borderColor: APP_THEME,
            borderWidth: bW,
            backgroundColor: checked ? APP_THEME : SECONDARY_BACKGROUND_THEME,
            width: 20,
            height: 20,
            marginRight: 15
          },
          checkStyle,
        ]}>
        {checked && (
          <AppIcon name="check" size={15} type="FontAwesome5" color="white" />
        )}
      </TouchableOpacity>
      {text && <AppText {...text} />}
    </View>
  );
};

export default AppCheckBox;

const styles = StyleSheet.create({});
