import React from "react";
import { Image, StyleSheet, View } from "react-native";
import colors from "../configs/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Profile = ({ imageUri }) => {
  return (
    <View style={styles.container}>
      {imageUri ? (
        <Image style={styles.image} source={{uri: "http://koodiweb-service-apis.herokuapp.com/"+imageUri}} />
      ) : (
        <MaterialCommunityIcons
          name="account"
          size={100}
          color={colors.fadeGray}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
      height:'100%',
      width:'100%',
  },
  container: {
    width: 200,
    height: 200,
    borderRadius: 100,
    elevation: 2,
    backgroundColor: colors.white,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default Profile;
