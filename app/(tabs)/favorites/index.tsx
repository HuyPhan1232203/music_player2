import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyles } from "@/styles/default";
import TrackList from "@/components/TrackList";
import axios from "axios";
import { Track } from "react-native-track-player";
import { screenPadding } from "@/constraints/token";
import useSeachBar from "@/hooks/useSeachBar";

const FavoriteScreen = () => {
  const search = useSeachBar({
    SearchBarOption: {
      placeholder: "find a song",
    },
  });
  const handleSearch = () => {
    if (!search) return data.filter((track) => track.rating === 1);
  };
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Track[]>([]);
  const fetchData = async () => {
    try {
      setLoading(true);
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
  return (
    <View style={defaultStyles.container}>
      {loading ? (
        <View style={defaultStyles.center}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={{ paddingHorizontal: screenPadding.horizontal }}>
          <TrackList tracks={handleSearch()} />
        </View>
      )}
    </View>
  );
};

export default FavoriteScreen;
