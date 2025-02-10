import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Event, useTrackPlayerEvents } from "react-native-track-player";
const events = [
  Event.PlaybackState,
  Event.PlaybackError,
  Event.PlaybackActiveTrackChanged,
];
const useLogTrackPlayerState = () => {
  useTrackPlayerEvents(events, async (event) => {
    if (event.type === Event.PlaybackError) {
      console.warn("An error occurred ", event);
    }
    if (event.type === Event.PlaybackState) {
      console.log("Playback State ", event.state);
    }
    if (event.type === Event.PlaybackActiveTrackChanged) {
      console.log("Track changed ", event.index);
    }
  });
};

export default useLogTrackPlayerState;

const styles = StyleSheet.create({});
