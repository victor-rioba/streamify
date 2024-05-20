import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { DefaultStyles, UtilStyles } from '@/constants/Styles';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useMemo } from 'react';
import { Image } from 'expo-image';

import { Colors } from '@/constants/Colors';
import { FontSize } from '@/constants/Fonts';
import { unknownTrackImageUri } from '@/constants/Images';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useApi } from '@/hooks/useApi';

import { useSession } from '@/context';
import { TrackListItem } from '@/components/TrackListItem';
import { useColorTheme } from '@/hooks/useColorTheme';
import AppButton from '@/components/AppButton';
import { router } from 'expo-router';
import { useTracksStore } from '@/store/tracks';

const trackTitleFilter = (title: string) => (track: any) =>
  track.title?.toLowerCase().includes(title.toLowerCase());

export default function HomeScreen() {
  const { signOut } = useSession();

  const theme = useColorTheme();

  const styles = themeStyles(theme);

  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: 'Find in songs',
    },
  });

  const isActiveTrack = false;

  const tracks = useTracksStore((state) => state.tracks);

  const recommendedTrack = useMemo(() => {
    return tracks[12];
  }, [tracks]);

  const filteredTracks = useMemo(() => {
    if (!search) return tracks;

    return tracks.filter(trackTitleFilter(search));
  }, [search, tracks]);

  const api = useApi();

  function fetchUsers() {
    api.users.$get().then((res) => {
      console.log(res);
    });
  }

  fetchUsers();

  return (
    <View
      style={{
        ...DefaultStyles[theme].container,
        paddingBottom: 100,
      }}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: 24 }}
      >
        <ThemedView style={{ ...styles.titleContainer, paddingVertical: 16 }}>
          <ThemedText type="subtitle">Song of the day</ThemedText>
        </ThemedView>
        <TouchableWithoutFeedback
          onPress={() => {
            router.push(`/track/${recommendedTrack.title}`);
          }}
        >
          <View style={{ ...styles.trackItemContainer, width: '100%' }}>
            <View>
              <Image
                source={recommendedTrack.artwork ?? unknownTrackImageUri}
                style={{
                  ...styles.trackArtworkImage,
                  width: '100%',
                  opacity: isActiveTrack ? 0.6 : 1,
                }}
              />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{ width: '100%' }}>
                <Text
                  numberOfLines={1}
                  style={{
                    ...styles.trackTitleText,
                    color: isActiveTrack
                      ? Colors[theme].tint
                      : Colors[theme].text,
                  }}
                >
                  {recommendedTrack.title}
                </Text>

                {recommendedTrack.artist && (
                  <Text
                    numberOfLines={1}
                    style={styles.trackArtistText}
                    onPress={() => {
                      router.push(`/artist/${recommendedTrack.artist}`);
                    }}
                  >
                    {recommendedTrack.artist}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <ThemedView style={{ ...styles.titleContainer, paddingTop: 16 }}>
          <ThemedText type="subtitle">Recommended Songs</ThemedText>
        </ThemedView>
        <FlatList
          horizontal={true}
          data={filteredTracks}
          keyExtractor={({ title }) => title}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}
          ListEmptyComponent={
            <View>
              <Text style={UtilStyles[theme].emptyContentText}>
                No songs found
              </Text>

              <Image
                source={unknownTrackImageUri}
                style={UtilStyles[theme].emptyContentImage}
              />
            </View>
          }
          renderItem={({ item: track }) => (
            <TrackListItem track={track} styles={styles} />
          )}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 4,
          }}
        >
          <AppButton
            title="Sign Out"
            onPress={() => {
              signOut();
            }}
          ></AppButton>
        </View>
      </ScrollView>
    </View>
  );
}

const themeStyles = (theme: 'light' | 'dark') => {
  return StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    trackItemContainer: {
      rowGap: 14,
      width: 220,
    },
    trackPlayingIconIndicator: {
      position: 'absolute',
      top: 18,
      left: 16,
      width: 16,
      height: 16,
    },
    trackPausedIndicator: {
      position: 'absolute',
      top: 14,
      left: 14,
    },
    trackArtworkImage: {
      borderRadius: 8,
      width: 200,
      height: 200,
    },
    trackTitleText: {
      ...DefaultStyles.light.text,
      fontSize: FontSize.sm,
      fontWeight: '600',
      maxWidth: '90%',
    },
    trackArtistText: {
      ...DefaultStyles.light.text,
      color: Colors.light.tint,
      fontSize: 14,
      marginTop: 4,
    },
  });
};
