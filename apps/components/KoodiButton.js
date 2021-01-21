import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../configs/colors";
import KoodiText from "./KoodiText";

function KoodiButton({ children, onPress, style, width, icon, ...otherProps }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style, { width }]}
      {...otherProps}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 6,
    backgroundColor: colors.primary,
    display: "flex",
    padding: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 16,
  },
});

export default KoodiButton;
