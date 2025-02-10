import { StyleSheet, Text, View, ViewProps } from "react-native";
import React from "react";
import { useSharedValue } from "react-native-reanimated";
import { colors } from "@/constraints/token";
import Feather from "@expo/vector-icons/Feather";
import { Slider } from "react-native-awesome-slider";
import { utilsStyles } from "@/styles/default";
import usePlayerVolume from "@/hooks/usePlayerVolume";

const PlayerVolumeBar = ({ style }: ViewProps) => {
  const { volume, updateVolume } = usePlayerVolume();
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);
  progress.value = volume ?? 0;
  return (
    <View
      style={[
        style,
        {
          flexDirection: "row",
          alignItems: "center",
        },
      ]}
    >
      <Feather
        name="volume-1"
        size={20}
        style={{ opacity: 0.8 }}
        color={colors.icon}
      />
      <View style={{ flex: 1, flexDirection: "row", paddingHorizontal: 10 }}>
        <Slider
          progress={progress}
          minimumValue={min}
          maximumValue={max}
          containerStyle={utilsStyles.slider}
          onValueChange={(value) => {
            updateVolume(value);
          }}
          renderBubble={() => null}
          theme={{
            maximumTrackTintColor: colors.maximumTrackTintColor,
            minimumTrackTintColor: colors.minimumTrackTintColor,
          }}
          thumbWidth={0}
        />
      </View>
      <Feather
        name="volume-2"
        size={20}
        style={{ opacity: 0.8 }}
        color={colors.icon}
      />
    </View>
  );
};

export default PlayerVolumeBar;

const styles = StyleSheet.create({});
