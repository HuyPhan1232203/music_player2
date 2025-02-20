import { TrackWithPlaylist } from "@/helper/types";
import { Track } from "react-native-track-player";
import { create } from "zustand";
import lib from "@/assets/data/library.json";
interface LibraryState {
  tracks: TrackWithPlaylist[];
  toggleTrackFavorite: (track: Track) => void;
  addToPlaylist: (track: Track, playlistName: string) => void;
}
export const useLibraryStore = create<LibraryState>()((set) => ({
  tracks: lib,
  toggleTrackFavorite: () => {},
  addToPlaylist: () => {},
}));
export const useTrack = () => useLibraryStore((state) => state.tracks);
export const useFavorite = () => {
  const fav = useTrack().filter((track) => track.rating === 1);
  const toggleTrackFavorite = useLibraryStore(
    (state) => state.toggleTrackFavorite
  );
  return {
    fav,
    toggleTrackFavorite,
  };
};
