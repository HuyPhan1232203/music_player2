import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { act } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { defaultStyles } from "@/styles/default";
import { Track, useActiveTrack } from "react-native-track-player";
import { colors, screenPadding } from "@/constraints/token";
import RotatedImage from "@/animations/RotatedImage";
import MovingText from "@/animations/MovingText";
import { PlayerControls } from "@/components/PlayerControl";
import PlayerProgressBar from "@/components/PlayerProgressBar";
import PlayerVolumeBar from "@/components/PlayerVolumeBar";
import { LinearGradient } from "react-native-linear-gradient";
import usePlayerBackground from "@/hooks/usePlayerBackground";
import { unknowTrackImageUri } from "@/styles/images";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const playerScreen = () => {
  const activeTrack: Track | undefined = useActiveTrack();
  const { top, bottom } = useSafeAreaInsets();
  const { imageColors } = usePlayerBackground(
    activeTrack?.artwork ?? unknowTrackImageUri
  );
  const threshHold: number = 30;
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={
        imageColors
          ? [imageColors.background, imageColors.primary]
          : [colors.backgound]
      }
    >
      <View style={styles.overlayContainer}>
        <DismissPlayerSymbol />
        <View style={{ flex: 1, marginTop: top + 70, marginBottom: bottom }}>
          <View style={styles.artworkContainer}>
            <View>
              <RotatedImage
                source={activeTrack?.artwork}
                style={styles.artwork}
              />
            </View>
          </View>

          <View
            style={[
              styles.titleContainer,
              activeTrack?.title?.length < threshHold && {
                alignItems: "center",
              },
            ]}
          >
            <MovingText
              animationThreshold={threshHold}
              text={activeTrack?.title ?? ""}
              style={styles.titleText}
            />
          </View>
          <View style={styles.artistContainer}>
            <Text style={styles.artist}>
              {activeTrack?.artist ?? "Unknow artist"}
            </Text>
          </View>
          <PlayerProgressBar style={{ marginTop: 32 }} />
          <PlayerControls style={{ marginTop: 40 }} />
          <PlayerVolumeBar style={{ marginTop: 50, marginBottom: 30 }} />
          {/* <TouchableOpacity style={{ alignItems: "center" }}>
            <MaterialCommunityIcons
              name="repeat-once"
              size={40}
              color={colors.icon}
            />
          </TouchableOpacity> */}
        </View>
      </View>
    </LinearGradient>
  );
};
const DismissPlayerSymbol = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{
        position: "absolute",
        top: top + 8,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <View
        accessible={false}
        style={{
          width: 50,
          height: 8,
          borderRadius: 8,
          backgroundColor: "#ccc",
          opacity: 0.7,
        }}
      ></View>
    </View>
  );
};
export default playerScreen;

const styles = StyleSheet.create({
  overlayContainer: {
    ...defaultStyles.container,
    paddingHorizontal: screenPadding.horizontal,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  artworkContainer: {
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 11.0,
    flexDirection: "row",
    justifyContent: "center",
    height: "45%",
  },
  artwork: {
    width: 300,
    height: 300,
    borderRadius: 350,
    resizeMode: "cover",
  },
  titleContainer: {
    paddingTop: 30,
    overflow: "hidden",
  },
  titleText: {
    ...defaultStyles.text,
    fontSize: 25,
    fontWeight: 600,
  },
  artistContainer: {
    width: "100%",
    marginTop: 6,
  },
  artist: {
    ...defaultStyles.text,
    color: colors.textMuted,
    textAlign: "center",
    fontSize: 20,
  },
});
