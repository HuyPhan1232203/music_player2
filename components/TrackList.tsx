import { FlatList, FlatListProps, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { utilsStyles } from "@/styles/default";
import TrackListItems from "./TrackListItems";
import TrackPlayer, { Track } from "react-native-track-player";
import { colors } from "@/constraints/token";
export type TrackListProps = {
  tracks: Track[];
};
const ItemDivider = () => (
  <View
    style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }}
  />
);

const TrackList = ({ tracks, ...FlatListProps }: TrackListProps) => {
  const handleSelectTrack = async (track: Track) => {
    console.log(track.title);
    await TrackPlayer.load(track);
    await TrackPlayer.play();
  };
  return (
    <FlatList
      data={tracks}
      style={{ paddingTop: 20 }}
      ItemSeparatorComponent={ItemDivider}
      contentContainerStyle={{ paddingBottom: 200 }}
      contentInsetAdjustmentBehavior="automatic"
      ListEmptyComponent={
        <View>
          <Text style={utilsStyles.emptyContentText}>No songs found</Text>
        </View>
      }
      renderItem={({ item }) => (
        <TrackListItems
          onTrackSelect={handleSelectTrack}
          track={{
            ...item,
          }}
        />
      )}
    />
  );
};

export default TrackList;
