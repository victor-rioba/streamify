import { StackScreenWithSearchBar } from '@/constants/Layout';
import { useColorTheme } from '@/hooks/useColorTheme';
import { DefaultStyles } from '@/constants/Styles';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function TabLayout() {
  const theme = useColorTheme();

  return (
    <View style={DefaultStyles[theme].container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...StackScreenWithSearchBar[theme],
            headerLargeTitle: false,
            headerTitle: 'Search',
          }}
        />
      </Stack>
    </View>
  );
}
