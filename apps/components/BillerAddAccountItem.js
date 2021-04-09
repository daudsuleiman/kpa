import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import TospayText from "../../tospay-library/components/TospayText";

export default function BillerAddAccountItem({ onPress, icon, name, iconColor,style }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, styles]}>
      <View style={styles.icon}>
        <MaterialCommunityIcons name={icon} size={20} color={iconColor} />
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
    margin: 16,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 3,
    backgroundColor: "#1A4587",
    justifyContent: "center",
    alignItems: "center",
  },

  description: {
    fontSize: 16,
  },
  text: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 16,
  },
});
