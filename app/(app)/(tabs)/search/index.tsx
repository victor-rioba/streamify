import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { DefaultStyles, UtilStyles } from '@/constants/Styles';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useMemo } from 'react';
import { Image } from 'expo-image';

import tracks from '@/assets/data/library.json';
import { Colors } from '@/constants/Colors';
import { FontSize } from '@/constants/Fonts';
import { unknownTrackImageUri } from '@/constants/Images';
import { TrackListItem } from '@/components/TrackListItem';
import { useColorTheme } from '@/hooks/useColorTheme';

const trackTitleFilter = (title: string) => (track: any) =>
  track.title?.toLowerCase().includes(title.toLowerCase());

export default function Screen() {
  const theme = useColorTheme();

  const styles = themedStyles(theme);

  const ItemDivider = () => (
    <View
      style={{
        ...UtilStyles[theme].itemSeparator,
        marginVertical: 9,
        marginLeft: 60,
      }}
    />
  );

  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: 'Find in songs',
    },
  });

  const filteredTracks = useMemo(() => {
    if (!search) return tracks;

    return tracks.filter(trackTitleFilter(search));
  }, [search]);

  return (
    <View style={DefaultStyles[theme].container}>
      <SafeAreaView>
        <FlatList
          style={{ paddingHorizontal: 24 }}
          data={filteredTracks}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
          ListFooterComponent={ItemDivider}
          ItemSeparatorComponent={ItemDivider}
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
      </SafeAreaView>
    </View>
  );
}

const themedStyles = (theme: 'light' | 'dark') => {
  return StyleSheet.create({
    trackItemContainer: {
      flexDirection: 'row',
      columnGap: 14,
      alignItems: 'center',
      paddingRight: 20,
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
      width: 50,
      height: 50,
    },
    trackTitleText: {
      ...DefaultStyles[theme].text,
      fontSize: FontSize.sm,
      fontWeight: '600',
      maxWidth: '90%',
    },
    trackArtistText: {
      ...DefaultStyles[theme].text,
      color: Colors[theme].tint,
      fontSize: 14,
      marginTop: 4,
    },
  });
};
