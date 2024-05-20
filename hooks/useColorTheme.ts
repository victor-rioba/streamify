import { useColorScheme } from 'react-native';

export const useColorTheme = () => {
  return useColorScheme() ?? 'light';
};
