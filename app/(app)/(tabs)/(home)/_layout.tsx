import { StackScreenWithSearchBar } from '@/constants/Layout';
import { DefaultStyles } from '@/constants/Styles';
import { useColorTheme } from '@/hooks/useColorTheme';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function HomeLayout() {
  const theme = useColorTheme();

  return (
    <View style={DefaultStyles[theme].container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...StackScreenWithSearchBar[theme],
            headerTitle: 'Home',
          }}
        />
      </Stack>
    </View>
  );
}
