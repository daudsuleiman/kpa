import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import KoodiText from "./KoodiText";
import colors from "../configs/colors";

const ListItem = ({icon,onPress,placeholder}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.main}>
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name={icon}
            size={30}
            color={colors.white}
          />
        </View>
        <KoodiText style={styles.text}>{placeholder}</KoodiText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    text: {
        color:colors.darkGray
    },
  main: {
    display: "flex",
    flexDirection: "row",
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor: colors.lightGray,
    padding:8,
    elevation:1
  },
  icon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    marginRight:16
  },
});

export default ListItem;
