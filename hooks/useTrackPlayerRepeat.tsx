import { useCallback, useEffect, useState } from "react";
import TrackPlayer, { RepeatMode } from "react-native-track-player";

const useTrackPlayerRepeat = () => {
  const [repeatMode, setrepeatMode] = useState<RepeatMode>();
  const changeRepeatMode = useCallback(async (repeatMode: RepeatMode) => {
    await TrackPlayer.setRepeatMode(repeatMode);
    setrepeatMode(repeatMode);
  }, []);
  useEffect(() => {
    TrackPlayer.getRepeatMode().then(setrepeatMode);
  }, []);
  return { repeatMode, changeRepeatMode };
};

export default useTrackPlayerRepeat;
