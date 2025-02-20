import React, { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSetupTrackPlayer } from "@/hooks/useSetupTrackPlayer";
import useLogTrackPlayerState from "@/hooks/useLogTrackPlayerState";
import { GestureHandlerRootView } from "react-native-gesture-handler";
try {
  SplashScreen.preventAutoHideAsync();
} catch {
  console.error("Log spashScreen");
}
const App = () => {
  useLogTrackPlayerState();
  const handleTrackPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  useSetupTrackPlayer({
    onLoad: handleTrackPlayerLoaded,
  });

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <RootNavigation />
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};
const RootNavigation = () => (
  <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen
      name="player"
      options={{
        presentation: "card",
        gestureEnabled: true,
        gestureDirection: "vertical",
        animationDuration: 400,
        headerShown: false,
      }}
    />
  </Stack>
);
export default App;
