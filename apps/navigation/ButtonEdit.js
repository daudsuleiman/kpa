import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../configs/colors";

function ButtonEdit({onPress}) {
  return (
      <TouchableOpacity style={styles.container} onPress={onPress}>

    <View >
      <MaterialCommunityIcons name="account-edit" size={40} color={colors.white} />
    </View>

      </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: 80,
    justifyContent: "center",
    borderRadius: 40,
    borderWidth: 6,
    borderColor:colors.white,
    bottom: 30,
    elevation:2,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
});

export default ButtonEdit;
