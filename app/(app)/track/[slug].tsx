import { ScrollView, View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/ThemedText';
import { DefaultStyles } from '@/constants/Styles';
import { useColorTheme } from '@/hooks/useColorTheme';

import tracks from '@/assets/data/library.json';
import { unknownTrackImageUri } from '@/constants/Images';
import { ThemedView } from '@/components/ThemedView';

export default function Page() {
  const theme = useColorTheme();
  const { slug } = useLocalSearchParams();

  const track = tracks.find((track) => track.title === slug)!;

  return (
    <View
      style={{
        ...DefaultStyles[theme].container,
        paddingBottom: 100,
      }}
    >
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Image
          source={track.artwork ?? unknownTrackImageUri}
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
