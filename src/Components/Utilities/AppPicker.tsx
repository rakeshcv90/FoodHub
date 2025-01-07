import React, {memo, useRef} from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  DimensionValue,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import useAppTheme from '../Hooks/useAppTheme';
import {DIMENSIONS} from '../../constants';

type Props = {
  items: Array<any>;
  onIndexChange: Function;
  itemHeight: number;
};

const {SCREEN_HEIGHT, SCREEN_WIDTH} = DIMENSIONS;

const AppPicker = (props: Props) => {
  const {items, onIndexChange, itemHeight} = props;
  const scrollY = useRef(new Animated.Value(0)).current;
  const modifiedItems = ['', '', ...items, '', ' '];

  const {APP_THEME, BACKGROUND_THEME, TEXT_THEME, SECONDARY_BACKGROUND_THEME} =
    useAppTheme();

  const renderItem = ({item, index}: any) => {
    const inputRange = [
      (index - 4) * itemHeight,
      (index - 3) * itemHeight,
      (index - 2) * itemHeight,
      (index - 1) * itemHeight,
      index * itemHeight,
    ];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1.4, 2.8, 1.4, 1],
    });
    return (
      <Animated.View
        style={[
          {height: itemHeight, transform: [{scale}]},
          styles.animatedContainer,
        ]}>
        <Text
          style={[styles.pickerItem, {textAlign: 'center', color: APP_THEME}]}>
          {item < 10 && index - 2 >= 0 && index < modifiedItems.length - 2
            ? '0' + item
            : item}
        </Text>
      </Animated.View>
    );
  };

  const momentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / itemHeight);
    onIndexChange(index);
  };
  return (
    <View
      style={{
        height: itemHeight * 5,
        justifyContent: 'center',
        width: SCREEN_WIDTH / 2,
        backgroundColor: BACKGROUND_THEME,
      }}>
      <Animated.FlatList
        data={modifiedItems}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        onMomentumScrollEnd={momentumScrollEnd}
        scrollEventThrottle={30}
        initialNumToRender={5}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
      />
      <View style={[styles.indicatorHolder, {top: itemHeight * 2}]}>
        <View style={styles.indicator} />
        <View style={[styles.indicator, {marginTop: itemHeight}]} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  pickerItem: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  indicatorHolder: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  indicator: {
    width: 120,
    height: 1,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:1,
  },
});

export default memo(AppPicker);
