import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyles } from "@/styles/default";
import TrackList from "@/components/TrackList";
import axios from "axios";
import { Track } from "react-native-track-player";
import { screenPadding } from "@/constraints/token";

const FavoriteScreen = () => {
  const [data, setData] = useState<Track[]>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://6721f1212108960b9cc22b59.mockapi.io/songs"
      );
      setData(response.data);
      console.log(response.data);
    } catch {
      console.log("no data");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={defaultStyles.container}>
      <View style={{ paddingHorizontal: screenPadding.horizontal }}>
        <TrackList tracks={data.filter((track) => track.rating === 1)} />
      </View>
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});
