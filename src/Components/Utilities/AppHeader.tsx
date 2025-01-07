import {StyleSheet, Text, View} from 'react-native';
import React, {ReactNode} from 'react';
import PredefinedStyles from './styles/PredefinedStyles';
import AppButton from './AppButton';
import {useNavigation} from '@react-navigation/native';
import useAppTheme from '../Hooks/useAppTheme';
import AppText from './AppText';
import AppIcon, {AppIconTypes} from './AppIcon';
import {COLORS} from '../../constants';
import { NavigationRef } from '../../constants/DIMENSIONS';

type Props = {
  title: string;
  showBack?: boolean;
  showRight?: boolean;
  handleLeft?: () => void;
  handleRight?: () => void;
  LeftIconCustom?: AppIconTypes;
  RightIconCustom?: AppIconTypes;
};

const AppHeader = ({
  title,
  showBack = true,
  showRight = false,
  handleLeft,
  handleRight,
  LeftIconCustom,
  RightIconCustom,
}: Props) => {
  const {TEXT_THEME} = useAppTheme();
  return (
    <View
      style={[
        // PredefinedStyles.rowStyle,
        {marginVertical: 10},
      ]}>
      {showBack && (
        <AppIcon
          name="left"
          size={20}
          type="AntDesign"
          color={TEXT_THEME}
          style={{position: 'absolute', top: 10}}
          {...LeftIconCustom}
          onPress={() => {
            NavigationRef.goBack();
            // handleLeft();
          }}
        />
      )}
      <AppText type="Heading" value={title} textAlign="center" />
      {showRight && (
        <AppIcon
          onPress={handleRight}
          name="left"
          size={20}
          type="AntDesign"
          color={TEXT_THEME}
          style={{position: 'absolute', right: 10, bottom: 10}}
          {...RightIconCustom}
        />
      )}
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({});
