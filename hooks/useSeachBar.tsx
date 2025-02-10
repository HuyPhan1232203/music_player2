import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { SearchBarProps } from "react-native-screens";
import { colors } from "@/constraints/token";
import { useNavigation } from "expo-router";
const defaultSearch: SearchBarProps = {
  tintColor: colors.primary,
  hideWhenScrolling: false,
  textColor: colors.text,
};
const useSeachBar = ({
  SearchBarOption,
}: {
  SearchBarOption?: SearchBarProps;
}) => {
  const [search, setSearch] = useState("");
  const nav = useNavigation();
  const handleOnChangeText: SearchBarProps["onChangeText"] = ({
    nativeEvent: { text },
  }) => {
    setSearch(text);
  };
  useLayoutEffect(() => {
    nav.setOptions({
      headerSearchBarOptions: {
        ...defaultSearch,
        ...SearchBarOption,
        onChangeText: handleOnChangeText,
      },
    });
  }, [nav, SearchBarOption]);
  return search;
};

export default useSeachBar;

const styles = StyleSheet.create({});
