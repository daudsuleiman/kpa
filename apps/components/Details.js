import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import KoodiText from "./KoodiText";
import colors from "../configs/colors";

const Details = ({description}) => {
  return (
    <View style={styles.main}>
     
      <KoodiText style={styles.text}>{description}</KoodiText>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
      color:colors.darkGray
  },
  main: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 8,
    backgroundColor:colors.lightGray
  },
  icon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
});

export default Details;
