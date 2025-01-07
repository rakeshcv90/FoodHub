import {COLORS} from '../../constants';
import {Appearance, StatusBarStyle} from 'react-native';
import {THEME_TYPES} from './useDefaultTheme';
import { useSelector } from 'react-redux';

const useAppTheme = () => {
  const appTheme = useSelector((state: any) =>state.appTheme)
  const curentSystem = Appearance.getColorScheme();

  const isDarkTheme =
    appTheme === THEME_TYPES.SYSTEM
      ? curentSystem === THEME_TYPES.DARK
      : appTheme === THEME_TYPES.DARK;

  const BACKGROUND_THEME = isDarkTheme ? COLORS.DARK_THEME_BLACK : COLORS.GREY;

  const SECONDARY_BACKGROUND_THEME = isDarkTheme
    ? COLORS.DARK_THEME_BLACK2
    : COLORS.WHITE;

  const TEXT_THEME = !isDarkTheme ? COLORS.BLACK : COLORS.WHITE;

  const APP_THEME = COLORS.GREEN;

  const STATUSBAR_THEME: StatusBarStyle = !isDarkTheme
    ? 'dark-content'
    : 'light-content';

  return {
    BACKGROUND_THEME,
    TEXT_THEME,
    APP_THEME,
    STATUSBAR_THEME,
    SECONDARY_BACKGROUND_THEME,
  };
};

export default useAppTheme;
