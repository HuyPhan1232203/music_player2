import { StyleProp, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import FastImage, { ImageStyle } from "react-native-fast-image";
import { unknowTrackImageUri } from "@/styles/images";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useIsPlaying } from "react-native-track-player";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

type imageProps = {
  source: string | undefined;
  style: StyleProp<ImageStyle>;
};

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

const RotatedImage: React.FC<imageProps> = ({ source, style }) => {
  const rotation = useSharedValue(0);
  const { playing } = useIsPlaying();
  useEffect(() => {
    if (playing) {
      rotation.value = withRepeat(
        withTiming(rotation.value + 360, {
          duration: 3000,
          easing: Easing.linear,
        }),
        -1,
        false
      );
    } else {
      cancelAnimation(rotation);
      //prevent value goes too large
      rotation.value = rotation.value % 360;
    }
    return () => cancelAnimation(rotation);
  }, [playing]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <AnimatedFastImage
      source={{ uri: source ?? unknowTrackImageUri }}
      style={[style, animatedStyle]}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};

export default RotatedImage;
