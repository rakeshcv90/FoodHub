import {Platform, ViewStyle} from 'react-native';

const ShadowStyle = {
  shadowColor: 'grey',
  ...Platform.select({
    ios: {
      //shadowColor: '#000000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    android: {
      elevation: 3,
    },
  }),
};

const FlexCenter: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

const NormalCenter: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const rowStyle:ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const screenContainer: ViewStyle = {
  flex: 1,
  padding: 10,
};
const whiteContainer:ViewStyle = {
  padding: 10,
  borderRadius: 10,
}
const PredefinedStyles = {FlexCenter, ShadowStyle, rowStyle, screenContainer, NormalCenter,whiteContainer};

export default PredefinedStyles
