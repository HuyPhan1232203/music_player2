import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Track, useActiveTrack } from "react-native-track-player";

const useLastActiveTrack = () => {
  const activeTrack = useActiveTrack();
  const [prev, setPrev] = useState<Track>();
  useEffect(() => {
    setPrev(activeTrack);
  }, [activeTrack]);
  console.log(prev);
  return prev;
};

export default useLastActiveTrack;

const styles = StyleSheet.create({});
