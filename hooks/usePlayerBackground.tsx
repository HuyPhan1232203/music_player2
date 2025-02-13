import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { IOSImageColors } from "react-native-image-colors/build/types";
import { getColors } from "react-native-image-colors";
import { colors } from "@/constraints/token";
const usePlayerBackground = (imageUrl: string) => {
  const [imageColors, setImageColor] = useState<IOSImageColors | null>(null);
  useEffect(() => {
    getColors(imageUrl, {
      fallback: colors.backgound,
      cache: true,
      key: imageUrl,
    }).then((colors) => setImageColor(colors as IOSImageColors));
  }, [imageUrl]);
  return { imageColors };
};

export default usePlayerBackground;

const styles = StyleSheet.create({});
