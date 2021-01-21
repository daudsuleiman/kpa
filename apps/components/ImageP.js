import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../configs/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import KoodiText from "./KoodiText";

const ImageP = ({ icon, placeholder, onPress, imageUri }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
     {imageUri &&  <Image  source={{ uri: imageUri }} style={{ height: "100%", width: "100%" }}/>}
     
      {!imageUri && (
        <MaterialCommunityIcons
          name={icon}
          size={100}
          color={colors.fadeGray}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  container: {
    width: 150,
    height: 150,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: colors.white,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default ImageP;
