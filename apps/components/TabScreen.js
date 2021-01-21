import React from "react";
import { Platform, SafeAreaView, StyleSheet } from "react-native";
import Constants from "expo-constants";

const TabScreen = ({ children }) => {
  return <SafeAreaView style={styles.screen}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  screen: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    width: "100%",
    height: "100%",
  },
});

export default TabScreen;
