import useSeachBar from "@/hooks/useSeachBar";
import { defaultStyles } from "@/styles/default";
import { StackScreenWithSearchBar } from "@/styles/layout";
import { Stack } from "expo-router";
import { View } from "react-native";
const SongsScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ ...StackScreenWithSearchBar, headerTitle: "Songs" }}
        ></Stack.Screen>
      </Stack>
    </View>
  );
};
export default SongsScreenLayout;
