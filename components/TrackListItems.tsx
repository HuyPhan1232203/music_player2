import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import React from "react";
import { colors, fontSize } from "@/constraints/token";
import FastImage from "react-native-fast-image";
import { unknowTrackImageUri } from "@/styles/images";
import { Track, useActiveTrack, useIsPlaying } from "react-native-track-player";
import Entypo from "@expo/vector-icons/Entypo";
import LoaderKit from "react-native-loader-kit";
import FontAwesome from "@expo/vector-icons/FontAwesome";
export type TrackListItemProp = {
  track: Track;
  onTrackSelect: (track: Track) => void;
};
const TrackListItems = ({
  track,
  onTrackSelect: handleSelect,
}: TrackListItemProp) => {
  const { playing } = useIsPlaying();
  const isActiveTrack = useActiveTrack()?.url === track.url;
  return (
    <TouchableHighlight
      onPress={() => {
        handleSelect(track);
      }}
    >
      <View style={{ ...styles.container }}>
        <FastImage
          source={{ uri: track.artwork ?? unknowTrackImageUri }}
          style={styles.img}
          resizeMode={FastImage.resizeMode.contain}
        >
          {isActiveTrack &&
            (playing ? (
              <LoaderKit
                style={styles.onPlayIcon}
                name={"LineScalePulseOut"}
                color={colors.text}
              />
            ) : (
              <FontAwesome
                style={styles.onPauseIcon}
                name="play"
                size={24}
                color={colors.text}
              />
            ))}
        </FastImage>

        <View style={{ width: "70%" }}>
          <Text
            numberOfLines={1}
            style={{
              ...styles.title,
              color: isActiveTrack ? colors.primary : colors.text,
            }}
          >
            {track.title}
          </Text>
          <Text style={{ ...styles.artist }}>
            {track.artist ?? "Unknow Artist"}
          </Text>
        </View>
        <Entypo name="dots-three-horizontal" size={24} color="white" />
      </View>
    </TouchableHighlight>
  );
};
export default TrackListItems;
const styles = StyleSheet.create({
  container: {
    paddingRight: 20,
    alignItems: "center",
    flexDirection: "row",
    columnGap: 14,
  },
  img: {
    borderRadius: 8,
    width: 50,
    height: 50,
  },
  title: {
    fontWeight: 500,
    fontSize: 16,
    paddingBottom: 5,
  },
  artist: {
    fontWeight: 500,
    fontSize: 12,
    color: "#ccc",
  },
  onPauseIcon: {
    position: "absolute",
    top: 14,
    right: 14,
  },
  onPlayIcon: {
    position: "absolute",
    top: 17,
    left: 16,
    width: 16,
    height: 16,
  },
});
