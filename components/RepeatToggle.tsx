import { colors } from "@/constraints/token";
import useTrackPlayerRepeat from "@/hooks/useTrackPlayerRepeat";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RepeatMode } from "react-native-track-player";
import { match } from "ts-pattern";
const repeatOrder = [RepeatMode.Off, RepeatMode.Track, RepeatMode.Queue];

// type IconProps = Omit<ComponentProps<typeof MaterialCommunityIcons>, "name">;

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];
const RepeatToggle = () => {
  const { changeRepeatMode, repeatMode } = useTrackPlayerRepeat();

  const toggleRepeatMode = () => {
    if (repeatMode == null) return;
    const currentIndex = repeatOrder.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % repeatOrder.length;
    changeRepeatMode(repeatOrder[nextIndex]);
  };
  const icon = match(repeatMode)
    .returnType<IconName>()
    .with(RepeatMode.Off, () => "repeat-off")
    .with(RepeatMode.Queue, () => "repeat")
    .with(RepeatMode.Track, () => "repeat-once")
    .otherwise(() => "repeat-off");
  return (
    <MaterialCommunityIcons
      name={icon}
      onPress={toggleRepeatMode}
      color={colors.icon}
      size={30}
    />
  );
};

export default RepeatToggle;

const styles = StyleSheet.create({});
