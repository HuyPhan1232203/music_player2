import { StyleSheet, Text, View, ViewProps } from "react-native";
import React from "react";
import { Slider } from "react-native-awesome-slider";
import TrackPlayer, { useProgress } from "react-native-track-player";
import { useSharedValue } from "react-native-reanimated";
import { colors, fontSize } from "@/constraints/token";
import { defaultStyles, utilsStyles } from "@/styles/default";
import { secondToMin } from "@/helper/converter";
const PlayerProgressBar = ({ style }: ViewProps) => {
  // The hook will update these values every 250ms (4 times per second)
  const { duration, position } = useProgress(250);
  const isSliding = useSharedValue(false);
  const progress = useSharedValue(0); //percentage 0 - 1
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  const trackElapsedTime = secondToMin(position);
  const remainingTime = secondToMin(duration - position);
  if (!isSliding.value) {
    progress.value = duration > 0 ? position / duration : 0;
  }
  return (
    <View style={style}>
      <Slider
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        containerStyle={utilsStyles.slider}
        thumbWidth={0}
        renderBubble={() => null}
        theme={{
          maximumTrackTintColor: colors.maximumTrackTintColor,
          minimumTrackTintColor: colors.minimumTrackTintColor,
        }}
        onSlidingStart={() => (isSliding.value = true)}
        onValueChange={async (value) => {
          await TrackPlayer.seekTo(value * duration);
        }}
        onSlidingComplete={async (value) => {
          if (!isSliding) return;
          isSliding.value = false;
          await TrackPlayer.seekTo(value * duration);
        }}
      />
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{trackElapsedTime}</Text>
        <Text style={styles.timeText}>{remainingTime}</Text>
      </View>
    </View>
  );
};

export default PlayerProgressBar;

const styles = StyleSheet.create({
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 20,
  },
  timeText: {
    ...defaultStyles.text,
    color: colors.text,
    opacity: 0.75,
    fontSize: fontSize.xs,
    letterSpacing: 0.7,
    fontWeight: 500,
  },
});
