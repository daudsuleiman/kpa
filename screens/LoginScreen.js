import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import KoodiButton from "../apps/components/KoodiButton";
import KoodiTextInput from "../apps/components/KoodiTextInput";
import KoodiText from "../apps/components/KoodiText";
import Screen from "../apps/components/Screen";
import colors from "../apps/configs/colors";
import endpoints from "../apps/api/endpoints";
import AuthContext from "../apps/auth/context";
import authStorage from "../apps/auth/authStorage";
import KoodiLoadIndicator from "../apps/components/KoodiLoadIndicator";

const validationShema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().min(4).required().label("Password"),
});

function LoginScreen() {
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const submitData = async ({ email, password }) => {
    setIsLoading(true);
    const result = await endpoints.Login(email, password);

    if (!result.ok) {
      setIsLoading(false);
      setErrorMessage(result.data.error.message);
      return console.log(result.data);
    }

    setErrorMessage("");
    setIsLoading(false);
    const data = {
      token: result.data.data.token,
      email: result.data.data.email,
      username: result.data.data.username,
      phone: result.data.data.phone,
      profile: result.data.data.profile,
      role: result.data.data.isAdmin ? "Admin" : "User",
    };
    console.log(data)
    setUser(data);
    authStorage.storeToken(data);
  };

  return (
    <Screen>
      {isLoading ? (
        <KoodiLoadIndicator visibility={isLoading} />
      ) : (
        <View style={styles.screen}>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={submitData}
            validationSchema={validationShema}
          >
            {({ handleChange, handleSubmit, errors }) => (
              <>
                <View style={styles.logoHolder}>
                  <Image
                    style={styles.logo}
                    source={require("../assets/icon.png")}
                  />
                </View>

                <View style={styles.inputHolder}>
                  <KoodiTextInput
                    size={60}
                    keyboardType={"email-address"}
                    placeholder={"Email Address"}
                    onChangeText={handleChange("email")}
                  />
                  <KoodiText style={{ color: "red" }}>{errors.email}</KoodiText>
                  <KoodiTextInput
                    size={60}
                    secureTextEntry
                    placeholder={"Password"}
                    onChangeText={handleChange("password")}
                  />
                  <KoodiText style={{ color: "red" }}>
                    {errors.password}
                  </KoodiText>
                </View>

                <Text style={{ color: "red" }}>{errorMessage}</Text>

                <View style={styles.buttonHolder}>
                  <KoodiButton
                    onPress={handleSubmit}
                    width={"80%"}
                    style={styles.button}
                  >
                    <KoodiText style={styles.text}>Log in</KoodiText>
                  </KoodiButton>
                </View>
              </>
            )}
          </Formik>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 60,
  },
  text: {
    margin: 3,
    fontSize: 18,
    color: colors.white,
  },
  logoHolder: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 2,
    width: "100%",
  },
  logo: {
    height: 100,
    width: 400,
  },
  inputHolder: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 2,
    width: "100%",
  },
  buttonHolder: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    width: "100%",
  },
  screen: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
});

export default LoginScreen;
