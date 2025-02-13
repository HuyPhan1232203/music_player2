import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import React from "react";
import { Track, useActiveTrack } from "react-native-track-player";
import FastImage from "react-native-fast-image";
import { defaultStyles } from "@/styles/default";
import { colors, fontSize } from "@/constraints/token";
import { unknowTrackImageUri } from "@/styles/images";
import { PlayPauseButton, SkipToNextButton } from "./PlayerControl";
import { useRouter } from "expo-router";
import MovingText from "@/animations/MovingText";
import RotatedImage from "@/animations/RotatedImage";
import useLastActiveTrack from "@/hooks/useLastActiveTrack";

const OnPlayTrack = ({ style }: ViewProps) => {
  const activeTrack = useActiveTrack();
  const prevTrack: Track | undefined = useLastActiveTrack();
  const displayedTrack: Track = activeTrack ?? prevTrack;
  const router = useRouter();
  const handleNavigate = () => {
    router.navigate("/player");
  };
  if (!displayedTrack) return null;
  return (
    <TouchableOpacity
      onPress={handleNavigate}
      activeOpacity={0.9}
      style={[styles.trackItemContainer, style]}
    >
      <>
        <FastImage
          source={{ uri: displayedTrack.artwork ?? unknowTrackImageUri }}
          style={styles.trackArtworkImage}
          resizeMode={FastImage.resizeMode.contain}
        />

        <View style={styles.trackTitleContainer}>
          <MovingText
            style={styles.trackTitleText}
            text={displayedTrack.title ?? ""}
            animationThreshold={25}
          />
          <Text style={styles.trackArtistText}>
            {displayedTrack.artist ?? "Unknow Artist"}
          </Text>
        </View>
        <PlayPauseButton iconSize={24} />
        <SkipToNextButton iconSize={24} />
      </>
    </TouchableOpacity>
  );
};

export default OnPlayTrack;

const styles = StyleSheet.create({
  trackItemContainer: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252525",
    padding: 8,
    paddingRight: 20,
    borderRadius: 12,
  },
  trackArtworkImage: {
    borderRadius: 8,
    width: 50,
    height: 50,
  },
  trackTitleText: {
    ...defaultStyles.text,
    fontSize: fontSize.base,
    fontWeight: "600",
  },
  trackArtistText: {
    ...defaultStyles.text,
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 4,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: "hidden",
    marginLeft: 10,
  },
});
