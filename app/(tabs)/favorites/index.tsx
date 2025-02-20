import { ActivityIndicator, View } from "react-native";
import React, { useMemo } from "react";
import { defaultStyles } from "@/styles/default";
import TrackList from "@/components/TrackList";
import { screenPadding } from "@/constraints/token";
import useSeachBar from "@/hooks/useSeachBar";
import { useSongData } from "@/assets/data/data";
import { useFavorite } from "@/stores/library";

const FavoriteScreen = () => {
  const search = useSeachBar({
    SearchBarOption: {
      placeholder: "find a song",
    },
  });
  const { fav } = useFavorite();
  const filteredFavoriteTrack = useMemo(() => {
    if (!search) return fav;
    return fav.filter((track) =>
      track?.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, fav]);

  const { isLoading } = useSongData();
  return (
    <View style={defaultStyles.container}>
      {isLoading ? (
        <View style={defaultStyles.center}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={{ paddingHorizontal: screenPadding.horizontal }}>
          <TrackList tracks={filteredFavoriteTrack} />
        </View>
      )}
    </View>
  );
};

export default FavoriteScreen;
