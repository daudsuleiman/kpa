import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import TospayText from "../../tospay-library/components/TospayText";

export default function AccountNavItem({ icon, name, onPress, iconSize=20 }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.icon}>
        <MaterialCommunityIcons name={icon} size={iconSize} color="#3F4047" />
      </View>
      <View style={styles.text}>
        <TospayText numberOfLines={1} style={styles.description}>
          {name}
        </TospayText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 6,
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
  },
  icon: {
    width: 35,
    height: 35,
    ///elevation: 6,
    borderRadius: 35 / 2,
    borderWidth: 1,
    borderColor: "#b0b0b0",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 16,
  },
});
