import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import TospayText from "../../tospay-library/components/TospayText";

export default function KpaButton({
  onPress,
  isDisabled,
  title,
  icon,
  height = 40,
}) {
  return (
    <TouchableOpacity
      style={
        isDisabled
          ? [styles.disabledButton, { height: height }]
          : [styles.enabledutton, { height: height }]
      }
      disabled={isDisabled}
      onPress={onPress}
    >
      <TospayText style={{ color: "#FFFFFF" }}>{title}</TospayText>

      {icon && <MaterialCommunityIcons name={icon} size={24} color="white" />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  disabledButton: {
    borderRadius: 6,
    padding: 6,
    backgroundColor: "#529AE5",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  enabledutton: {
    backgroundColor: "#1A4587",
    borderRadius: 6,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
