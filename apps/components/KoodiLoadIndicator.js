import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";
import colors from "../configs/colors";

const KoodiLoadIndicator = ({ visibility }) => {
  if (!visibility) return null;

  return (
    <View style={styles.loader}>
      <LottieView
        autoPlay={true}
        loop={true}
        source={require("../../assets/lottie/loader.json")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.white,
  },
});

export default KoodiLoadIndicator;
