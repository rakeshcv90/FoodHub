import {createNavigationContainerRef} from '@react-navigation/native';
import {Dimensions, Platform} from 'react-native';
import {store} from '../redux/store';
import {initialState} from '../redux/reducers';

const {height, width} = Dimensions.get('window');

export const DIMENSIONS = {
  SCREEN_HEIGHT: height,
  SCREEN_WIDTH: width,
};

export const PLATFORM_IOS = Platform.OS == 'ios';


export const dispatch = store.dispatch;

