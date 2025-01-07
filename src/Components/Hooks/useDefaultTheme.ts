import {Appearance} from 'react-native';
import {dispatch} from '../../constants/DIMENSIONS';
import ACTIONS from '../../redux/actions';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

export const THEME_TYPES = {
  SYSTEM: 'system',
  LIGHT: 'light',
  DARK: 'dark',
};

const useDefaultTheme = () => {
  const appTheme = useSelector((state: any) => state.appTheme);
  const isSystemTheme = useSelector((state: any) => state.isSystemTheme);
  const setAppTheme = ACTIONS.setAppTheme;

  useEffect(() => {
    const updateTheme = () => {
      const systemTheme = Appearance.getColorScheme(); // 'light' or 'dark'

      dispatch(
        setAppTheme(
          systemTheme == THEME_TYPES.DARK
            ? THEME_TYPES.DARK
            : THEME_TYPES.LIGHT,
        ),
      );
    };

    // Listen for system theme changes
    const listener = Appearance.addChangeListener(() => {
      if (isSystemTheme) {
        updateTheme();
      }
    });

    // Cleanup listener
    return () => listener?.remove();
  }, [appTheme, isSystemTheme]);
  console.log('SYSTEMTJE', appTheme, isSystemTheme);
};

export default useDefaultTheme;
