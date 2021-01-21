import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { color } from "react-native-reanimated";
import KoodiButton from "../apps/components/KoodiButton";
import KoodiText from "../apps/components/KoodiText";
import Screen from "../apps/components/Screen";
import colors from "../apps/configs/colors";

function WelcomeScreen({navigation}) {
  return (
    <Screen>
      <View style={styles.screen}>
        <View style={styles.logoHolder}>
          <Image style={styles.logo} source={require('../assets/icon.png')} />
        </View>
        <View style={styles.inputHolder}></View>
        <View style={styles.buttonHolder}>
          <KoodiButton
          onPress={()=>navigation.navigate("Login")}
            width={"80%"}
            style={[styles.button, { backgroundColor: colors.accent }]}
          >
            <KoodiText style={styles.text}>Log in</KoodiText>
          </KoodiButton>

          <KoodiButton onPress={()=>navigation.navigate("SignUp")} width={"80%"} style={styles.button}>
            <KoodiText style={styles.text}>Sign up</KoodiText>
          </KoodiButton>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logo: {
     height:100,
     width:400
  },
  button: {
    height: 60,
    marginVertical: 6,
  },
  text: {
    margin: 3,
    fontSize: 18,
    color: colors.white,
    fontWeight: "bold",
  },
  logoHolder: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    flexGrow: 2,
    width: "100%",
  },
  inputHolder: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    flexGrow: 4,
    width: "100%",
  },
  buttonHolder: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 2,
    width: "100%",
  },
  screen: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:colors.white
  },
});

export default WelcomeScreen;
