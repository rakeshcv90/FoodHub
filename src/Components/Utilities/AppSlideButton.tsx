// import {
//   ColorValue,
//   DimensionValue,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   ViewStyle,
// } from 'react-native';
// import React, {ReactNode, useEffect, useState} from 'react';
// import AppText, {AppTextProps} from './AppText';
// import AppIcon, {AppIconTypes} from './AppIcon';
// import {
//   Gesture,
//   GestureDetector,
//   GestureHandlerRootView,
//   PanGestureHandler,
//   State,
//   TouchableOpacityProps,
// } from 'react-native-gesture-handler';
// import {COLORS} from '../../constants';
// import useAppTheme from '../Hooks/useAppTheme';
// import PredefinedStyles from './styles/PredefinedStyles';
// import Animated, {
//   runOnJS,
//   useAnimatedStyle,
//   useDerivedValue,
//   useSharedValue,
//   withSpring,
// } from 'react-native-reanimated';

// export type SlideButtonProps = {
//   id?: number;
//   bgColor?: ColorValue;
//   bColor?: ColorValue;
//   textColor?: ColorValue;
//   bR?: number;
//   bW?: number;
//   w?: 'half' | 'full' | 'contain' | DimensionValue;
//   mV?: number;
//   mH?: number;
//   padV?: number;
//   shadow?: boolean;
//   onPress: () => void;
//   IconLeft?: AppIconTypes;
//   IconLComp?: ReactNode;
//   iconW?: DimensionValue;
//   padH?: number;
//   buttonStyle?: ViewStyle;
//   containerStyle?: ViewStyle;
//   buttonProps?: TouchableOpacityProps;
//   sliderWidth?: number;
//   textArray?: Array<string>;
//   iconArray?: Array<string>;
// };

// const textData = ['Slide to complet order', 'Order delivered'];
// const buttonData = ['right', 'check'];

// const AppSlideButton = ({
//   w = 'full',
//   bgColor,
//   bColor = COLORS.GREY,
//   bR = 30,
//   bW = 0,
//   mH = 5,
//   mV = 5,
//   shadow = false,
//   textColor,
//   padV = 10,
//   padH = 5,
//   onPress,
//   IconLComp,
//   IconLeft,
//   iconW,
//   buttonStyle,
//   containerStyle,
//   buttonProps,
//   sliderWidth = 40,
//   textArray = textData,
//   iconArray = buttonData,
// }: SlideButtonProps) => {
//   const {APP_THEME, TEXT_THEME} = useAppTheme();
//   const [buttonWidth, setButtonWidth] = useState(0);
//   const [currentText, setCurrentText] = useState(textArray[0]);
//   const [currentIcon, setCurrentIcon] = useState(iconArray[0]);
//   const translateX = useSharedValue(0);

//   // Derived Value: Calculate progress percentage
//   const progress = useDerivedValue(
//     () => translateX.value / (buttonWidth - sliderWidth),
//   );

//   const panGesture = Gesture.Pan()
//     .onUpdate(e => {
//       // Update the slider position within bounds
//       translateX.value = Math.min(
//         Math.max(0, e.translationX),
//         buttonWidth - sliderWidth,
//       );
//     })
//     .onEnd(() => {
//       if (translateX.value > buttonWidth - sliderWidth - 20) {
//         // Trigger complete action if fully slid
//         translateX.value = withSpring(buttonWidth - sliderWidth);
//         runOnJS(onPress)();
//       } else {
//         // Snap back to start
//         translateX.value = withSpring(0);
//       }
//     });

//   const sliderAnimatedStyle = useAnimatedStyle(() => ({
//     transform: [{translateX: translateX.value}],
//   }));

//   const containerAnimatedStyle = useAnimatedStyle(() => ({
//     backgroundColor: progress.value > 0.7 ? '#00A735' : bgColor ?? COLORS.GREEN,
//   }));
//   const textStyle = useAnimatedStyle(() => ({
//     left: progress.value > 0.7 ? buttonWidth / 2.5 : buttonWidth / 3,
//   }));
//   // Derived Value: Calculate progress percentage and update text/icon state
//   useDerivedValue(() => {
//     if (progress.value > 0.7) {
//       runOnJS(setCurrentText)(textArray[1]);
//       runOnJS(setCurrentIcon)(iconArray[1]);
//     } else {
//       runOnJS(setCurrentText)(textArray[0]);
//       runOnJS(setCurrentIcon)(iconArray[0]);
//     }
//   });

//   return (
//     <GestureHandlerRootView style={{display: 'flex'}}>
//       <Animated.View
//         onLayout={e => setButtonWidth(e.nativeEvent.layout.width)}
//         style={[
//           {
//             marginVertical: mV,
//             marginHorizontal: mH,
//             width:
//               w === 'contain'
//                 ? '85%'
//                 : w === 'half'
//                 ? '50%'
//                 : w === 'full'
//                 ? '100%'
//                 : w,
//             paddingVertical: padV,
//             paddingHorizontal: padH,
//             borderRadius: bR,
//           },
//           containerAnimatedStyle,
//           containerStyle,
//           styles.container,
//           PredefinedStyles.rowStyle,
//         ]}>
//         <GestureDetector gesture={panGesture}>
//           <Animated.View
//             style={[
//               {
//                 borderColor: bColor,
//                 borderWidth: bW,
//                 borderRadius: 25,
//                 backgroundColor: COLORS.WHITE,
//                 width: 50,
//                 height: 50,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               },
//               sliderAnimatedStyle,
//               shadow && PredefinedStyles.ShadowStyle,
//               buttonStyle,
//             ]}
//             {...buttonProps}>
//             <AppIcon
//               color={'black'}
//               name={currentIcon}
//               size={17}
//               type="AntDesign"
//             />
//           </Animated.View>
//         </GestureDetector>
//         <Animated.Text
//           style={[
//             {
//               position: 'absolute',
//               color: textColor ?? COLORS.WHITE,
//               fontWeight: '700',
//               fontSize: 14,
//             },
//             textStyle,
//           ]}>
//           {currentText}
//         </Animated.Text>
//       </Animated.View>
//     </GestureHandlerRootView>
//   );
// };

// export default AppSlideButton;

// const styles = StyleSheet.create({
//   container: {
//     alignSelf: 'center',
//   },
// });
import {
  ColorValue,
  DimensionValue,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import AppIcon from './AppIcon';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {COLORS} from '../../constants';
import useAppTheme from '../Hooks/useAppTheme';
import PredefinedStyles from './styles/PredefinedStyles';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export type SlideButtonProps = {
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
  shadow?: boolean;
  onPress: () => void;
  IconLeft?: ReactNode;
  buttonStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  sliderWidth?: number;
  textArray?: Array<string>;
  iconArray?: Array<string>;
};

const textData = ['Slide to complete order', 'Order delivered'];
const iconData = ['right', 'check'];

const AppSlideButton = ({
  w = 'full',
  bgColor,
  bColor = COLORS.GREY,
  bR = 30,
  bW = 0,
  mH = 5,
  mV = 5,
  shadow = false,
  textColor,
  padV = 10,
  onPress,
  buttonStyle,
  containerStyle,
  sliderWidth = 40,
  textArray = textData,
  iconArray = iconData,
}: SlideButtonProps) => {
  const {APP_THEME} = useAppTheme();
  const [buttonWidth, setButtonWidth] = useState(0);
  const [currentText, setCurrentText] = useState(textArray[0]);
  const [currentIcon, setCurrentIcon] = useState(iconArray[0]);
  const translateX = useSharedValue(0);

  // Derived Value: Calculate progress percentage
  const progress = useDerivedValue(() => {
    return translateX.value / (buttonWidth - sliderWidth);
  });

  // Gesture handling
  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      // Constrain slider handle within bounds
      translateX.value = Math.min(
        Math.max(0, e.translationX),
        buttonWidth - sliderWidth,
      );
    })
    .onEnd(() => {
      if (translateX.value > buttonWidth - sliderWidth - 20) {
        // Snap to end if near completion
        translateX.value = withSpring(buttonWidth - sliderWidth);
        runOnJS(onPress)();
      } else {
        // Snap back to start
        translateX.value = withSpring(0);
      }
    });

  // Slider handle animation
  const sliderAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  // Container background color animation
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: progress.value > 0.7 ? '#00A735' : bgColor ?? COLORS.GREEN,
  }));

  // Text position animation
  const textStyle = useAnimatedStyle(() => ({
    left: progress.value > 0.7 ? buttonWidth / 2.5 : buttonWidth / 3,
  }));

  // Update text and icon dynamically based on progress
  useDerivedValue(() => {
    if (progress.value > 0.7) {
      runOnJS(setCurrentText)(textArray[1]);
      runOnJS(setCurrentIcon)(iconArray[1]);
    } else {
      runOnJS(setCurrentText)(textArray[0]);
      runOnJS(setCurrentIcon)(iconArray[0]);
    }
  });

  return (
    <GestureHandlerRootView style={{display: 'flex'}}>
      <Animated.View
        onLayout={e => setButtonWidth(e.nativeEvent.layout.width)}
        style={[
          {
            marginVertical: mV,
            marginHorizontal: mH,
            width:
              w === 'contain'
                ? '85%'
                : w === 'half'
                ? '50%'
                : w === 'full'
                ? '100%'
                : w,
            paddingVertical: padV,
            borderRadius: bR,
          },
          containerAnimatedStyle,
          containerStyle,
          styles.container,
          PredefinedStyles.rowStyle,
        ]}>
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              {
                borderColor: bColor,
                borderWidth: bW,
                borderRadius: 25,
                backgroundColor: COLORS.WHITE,
                width: sliderWidth,
                height: sliderWidth,
                justifyContent: 'center',
                alignItems: 'center',
              },
              sliderAnimatedStyle,
              shadow && PredefinedStyles.ShadowStyle,
              buttonStyle,
            ]}>
            <AppIcon
              color={'black'}
              name={currentIcon}
              size={17}
              type="AntDesign"
            />
          </Animated.View>
        </GestureDetector>
        <Animated.Text
          style={[
            {
              position: 'absolute',
              color: textColor ?? COLORS.WHITE,
              fontWeight: '700',
              fontSize: 14,
            },
            textStyle,
          ]}>
          {currentText}
        </Animated.Text>
      </Animated.View>
    </GestureHandlerRootView>
  );
};

export default AppSlideButton;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    top:10
  },
});
