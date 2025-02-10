import { defaultStyles } from "@/styles/default";
import { StackScreenWithSearchBar } from "@/styles/layout";
import { Stack } from "expo-router";
import { View } from "react-native";

const PlaylistScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ ...StackScreenWithSearchBar, headerTitle: "playlist" }}
        ></Stack.Screen>
      </Stack>
    </View>
  );
};
export default PlaylistScreenLayout;
