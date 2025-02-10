import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { defaultStyles } from "@/styles/default";
import TrackList from "@/components/TrackList";
import { screenPadding } from "@/constraints/token";
import useSeachBar from "@/hooks/useSeachBar";
import axios from "axios";
import lib from "@/assets/data/library.json";
import { Track } from "react-native-track-player";
const SongsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Track[]>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://6721f1212108960b9cc22b59.mockapi.io/songs"
      );
      setData(response.data);
    } catch {
      console.log("no data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
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
      {loading ? (
        <View style={defaultStyles.center}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={{ paddingHorizontal: screenPadding.horizontal }}>
          <TrackList tracks={handleSearchTrackTitle()} />
        </View>
      )}
    </View>
  );
};

export default SongsScreen;
