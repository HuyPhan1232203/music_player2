import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { defaultStyles } from "@/styles/default";

const PlaylistScreen = () => {
  return <SafeAreaView style={defaultStyles.container}></SafeAreaView>;
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});
