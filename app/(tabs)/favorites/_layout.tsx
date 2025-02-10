import { defaultStyles } from "@/styles/default";
import { StackScreenWithSearchBar } from "@/styles/layout";
import { Stack } from "expo-router";
import { View } from "react-native";

const FavoriteScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ ...StackScreenWithSearchBar, headerTitle: "Favorite" }}
        ></Stack.Screen>
      </Stack>
    </View>
  );
};
export default FavoriteScreenLayout;
