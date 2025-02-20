import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { defaultStyles } from "@/styles/default";
import TrackList from "@/components/TrackList";
import { screenPadding } from "@/constraints/token";
import useSeachBar from "@/hooks/useSeachBar";
import { useSongData } from "@/assets/data/data";
const SongsScreen = () => {
  const { data, isLoading } = useSongData();
  const search = useSeachBar({
    SearchBarOption: {
      placeholder: "Find in songs",
    },
  });
  const handleSearchTrackTitle = () => {
    if (search == null) {
      return data;
    }
    return data.filter((track) =>
      track?.title?.toLowerCase().includes(search.toLowerCase())
    );
  };
  return (
    <View style={defaultStyles.container}>
      {isLoading ? (
        <View style={defaultStyles.center}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={{ paddingHorizontal: screenPadding.horizontal }}>
          <View>
            <Text style={defaultStyles.text}>sdakjdnsakjndjask</Text>
          </View>
          <TrackList tracks={handleSearchTrackTitle()} />
        </View>
      )}
    </View>
  );
};

export default SongsScreen;
