import { Colors } from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import { useLayoutEffect, useMemo, useState } from 'react';
import { SearchBarProps } from 'react-native-screens';
import { useColorTheme } from './useColorTheme';

export const useNavigationSearch = ({
  searchBarOptions,
}: {
  searchBarOptions?: SearchBarProps;
}) => {
  const [search, setSearch] = useState('');

  const theme = useColorTheme();

  const defaultSearchOptions: SearchBarProps = useMemo(
    () => ({
      tintColor: Colors[theme].tint,
      hideWhenScrolling: false,
    }),
    [theme],
  );

  const navigation = useNavigation();

  const handleOnChangeText: SearchBarProps['onChangeText'] = ({
    nativeEvent: { text },
  }) => {
    setSearch(text);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        ...defaultSearchOptions,
        ...searchBarOptions,
        onChangeText: handleOnChangeText,
      },
    });
  }, [navigation, searchBarOptions, defaultSearchOptions]);

  return search;
};
