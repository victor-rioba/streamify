import { type NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Colors } from './Colors';

const getStackNavigationOptions = (
  theme: 'light' | 'dark',
): NativeStackNavigationOptions => {
  return {
    headerLargeTitle: true,
    headerLargeStyle: {
      backgroundColor: Colors[theme].background,
    },
    headerLargeTitleStyle: {
      color: Colors[theme].text,
    },
    headerTintColor: Colors[theme].text,
    headerTransparent: true,
    headerBlurEffect: 'prominent',
    headerShadowVisible: false,
  };
};

export const StackScreenWithSearchBar = {
  light: getStackNavigationOptions('light'),
  dark: getStackNavigationOptions('dark'),
};
