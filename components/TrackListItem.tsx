import { StyleProp, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Image } from 'expo-image';
import Toast from 'react-native-root-toast';

import { Colors } from '@/constants/Colors';
import { unknownTrackImageUri } from '@/constants/Images';

import { router } from 'expo-router';
import { useColorTheme } from '@/hooks/useColorTheme';
import { Track } from '@/api/types';
import { Ionicons } from '@expo/vector-icons';
import { useTracksStore } from '@/store/tracks';

export type TracksListItemProps = {
  track: Track;
  onTrackSelect?: (track: Track) => void;
  styles: { [key: string]: StyleProp<any> };
  actions?: boolean;
};

export function TrackListItem({
  track,
  onTrackSelect: handleTrackSelect,
  styles,
  actions,
}: TracksListItemProps) {
  const theme = useColorTheme();

  const isActiveTrack = false;

  const addToFavourites = useTracksStore((store) => store.addToFavourites);

  const removeFromFavourites = useTracksStore(
    (store) => store.removeFromFavourites,
  );

  const isFavourite = useTracksStore((store) =>
    store.favourites.includes(track.title),
  );

  const handleClickFavourite = (trackTitle: string) => {
    if (isFavourite) {
      removeFromFavourites(trackTitle);
      Toast.show('Removed from favourites');
    } else {
      addToFavourites(trackTitle);
      Toast.show('Added to favourites');
    }
  };

  const clickHandler =
    handleTrackSelect ??
    ((track) => {
      router.push(`/track/${track.title}`);
    });

  return (
    <TouchableWithoutFeedback onPress={() => clickHandler(track)}>
      <View style={styles.trackItemContainer}>
        <View>
          <Image
            source={track.artwork ?? unknownTrackImageUri}
            style={{
              ...styles.trackArtworkImage,
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
                color: isActiveTrack ? Colors[theme].tint : Colors[theme].text,
              }}
            >
              {track.title}
            </Text>

            {track.artist && (
              <Text
                numberOfLines={1}
                style={styles.trackArtistText}
                onPress={() => {
                  router.push(`/artist/${track.artist}`);
                }}
              >
                {track.artist}
              </Text>
            )}
          </View>
        </View>

        {actions && (
          <View style={{ gap: 12 }}>
            <Ionicons
              onPress={() => handleClickFavourite(track.title)}
              name="heart"
              size={16}
              color={isFavourite ? 'red' : styles.trackArtistText.color}
            />
            <Ionicons
              name="play"
              size={16}
              color={styles.trackArtistText.color}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   trackItemContainer: {
//     rowGap: 14,
//     width: 220,
//   },
//   trackPlayingIconIndicator: {
//     position: "absolute",
//     top: 18,
//     left: 16,
//     width: 16,
//     height: 16,
//   },
//   trackPausedIndicator: {
//     position: "absolute",
//     top: 14,
//     left: 14,
//   },
//   trackArtworkImage: {
//     borderRadius: 8,
//     width: 200,
//     height: 200,
//   },
//   trackTitleText: {
//     ...DefaultStyles.light.text,
//     fontSize: FontSize.sm,
//     fontWeight: "600",
//     maxWidth: "90%",
//   },
//   trackArtistText: {
//     ...DefaultStyles.light.text,
//     color: Colors.light.tint,
//     fontSize: 14,
//     marginTop: 4,
//   },
// });
