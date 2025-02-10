import { StyleSheet, Text, View } from "react-native";
import Animated, {
  StyleProps,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  cancelAnimation,
} from "react-native-reanimated";
import React, { useEffect } from "react";
export type MovingTextProps = {
  text: string;
  animationThreshold: number;
  style?: StyleProps;
};

const MovingText = ({ text, animationThreshold, style }: MovingTextProps) => {
  const translateX = useSharedValue(0);
  const shouldAnimate = text.length >= animationThreshold;
  const textWidth = text.length * 3;
  useEffect(() => {
    if (!shouldAnimate) return;
    //-1 : forever  true:left to right
    translateX.value = withDelay(
      1000,
      withRepeat(
        withTiming(-textWidth, { duration: 5000, easing: Easing.linear }),
        -1,
        true
      )
    );
    return () => {
      cancelAnimation(translateX);
      translateX.value = 0;
    };
  }, [translateX, text, animationThreshold, shouldAnimate, textWidth]);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  return (
    <Animated.Text
      numberOfLines={1}
      style={[
        style,
        animatedStyle,
        shouldAnimate && {
          width: 9999, //preventing the ellipsis from appearing
          paddingLeft: 16, //avoid the init character being barely visible
        },
      ]}
    >
      {text}
    </Animated.Text>
  );
};

export default MovingText;

const styles = StyleSheet.create({});
