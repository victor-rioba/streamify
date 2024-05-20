import { ScrollView, View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/ThemedText';
import { DefaultStyles } from '@/constants/Styles';
import { useColorTheme } from '@/hooks/useColorTheme';
import { ThemedView } from '@/components/ThemedView';
import AppButton from '@/components/AppButton';

export default function Page() {
  const theme = useColorTheme();
  const { slug } = useLocalSearchParams();

  const artistImage =
    'https://images.unsplash.com/photo-1595971294624-80bcf0d7eb24?q=80&w=3269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <View
      style={{
        ...DefaultStyles[theme].container,
        paddingBottom: 100,
      }}
    >
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Image
          source={artistImage}
          style={{
            ...styles.trackArtworkImage,
          }}
        />

        <ThemedView
          style={{
            ...styles.titleContainer,
            paddingVertical: 16,
            paddingHorizontal: 24,
          }}
        >
          <ThemedText type="title">{slug}</ThemedText>
        </ThemedView>
        <View style={{ alignItems: 'center' }}>
          <AppButton title="Donate" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
  },
  trackArtworkImage: {
    height: 200,
  },
});
