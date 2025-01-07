import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ViewStyle,
  StatusBar,
  ColorValue,
  StatusBarStyle,
} from 'react-native';
import React, {ReactNode} from 'react';
import useAppTheme from './Hooks/useAppTheme';
import PredefinedStyles from './Utilities/styles/PredefinedStyles';

type Props = {
  children: ReactNode;
  wrapperStyle?: ViewStyle;
  translucent?: boolean;
  statusBackground?: ColorValue;
  barStyle?: StatusBarStyle;
};
const Wrapper = ({
  children,
  wrapperStyle,
  translucent = false,
  statusBackground,
  barStyle,
}: Props) => {
  const {BACKGROUND_THEME, STATUSBAR_THEME} = useAppTheme();
  return (
    <SafeAreaView
      style={[
        wrapperStyle,
        {
          backgroundColor: 'white',
          ...PredefinedStyles.screenContainer,
        },
      ]}>
      {/* <StatusBar
        barStyle={barStyle ?? STATUSBAR_THEME ?? 'default'}
        translucent={translucent}
        backgroundColor={statusBackground ?? BACKGROUND_THEME}
      /> */}
      {children}
    </SafeAreaView>
  );
};

export default Wrapper;
