import { create } from 'zustand';
import tracks from '@/assets/data/library.json';
import { Track } from '@/api/types';

type State = {
  tracks: Track[];
  favourites: string[];
};

type Action = {
  addToFavourites: (trackTitle: string) => void;
  removeFromFavourites: (trackTitle: string) => void;
};

export const useTracksStore = create<State & Action>((set) => ({
  tracks,
  favourites: [],
  addToFavourites: (trackTitle) => {
    set((state) => ({ favourites: [...state.favourites, trackTitle] }));
  },
  removeFromFavourites: (trackTitle) => {
    set((state) => ({
      favourites: state.favourites.filter((t) => t !== trackTitle),
    }));
  },
}));
