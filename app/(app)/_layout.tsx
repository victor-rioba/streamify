import { Redirect, Stack } from 'expo-router';
import { Text } from 'react-native';

import { useSession } from '@/context';
import { useColorTheme } from '@/hooks/useColorTheme';
import { Colors } from '@/constants/Colors';

export default function AppLayout() {
  const { session, isLoading } = useSession();

  const theme = useColorTheme();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  const detailsPageOptions = {
    headerBackTitleVisible: false,
    headerLargeStyle: {
      backgroundColor: Colors[theme].background,
    },
    headerLargeTitleStyle: {
      color: Colors[theme].text,
    },
    headerTintColor: Colors[theme].text,
  };

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="artist/[slug]"
        options={{
          headerTitle: 'Artist Details',
          ...detailsPageOptions,
        }}
      />
      <Stack.Screen
        name="track/[slug]"
        options={{
          headerTitle: 'Track Details',
          ...detailsPageOptions,
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
