import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import * as Yup from "yup";
import ImageP from "../apps/components/ImageP";
import KoodiButton from "../apps/components/KoodiButton";
import KoodiText from "../apps/components/KoodiText";
import KoodiTextInput from "../apps/components/KoodiTextInput";
import Screen from "../apps/components/Screen";
import colors from "../apps/configs/colors";
import endpoint from "../apps/api/endpoints";
import KoodiLoadIndicator from "../apps/components/KoodiLoadIndicator";

const validationSchema = Yup.object().shape({
  userName: Yup.string().required().label("Username"),
  userEmail: Yup.string().email().required().label("Email"),
  phone: Yup.string().required().label("Phone"),
  password: Yup.string().required("Password is required"),
  confirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords do not match"
  ),
});

function RegistrationScreen() {
  const [imageUri, setImageUri] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const createUser = async (values) => {
    if (imageUri === null) return setImageError("add a profile");

    setisLoading(true)
    const data = {
      username: values.userName,
      useremail: values.userEmail,
      phone: values.phone,
      password: values.password,
      image: imageUri,
    };

    const result = await endpoint.SignUpUser(data);
    if (!result.ok){
      setisLoading(false)
      return alert("User could not be Signed up");}

    setisLoading(false)
    alert(`user ${result.data.data.userName} was successfully Created`);
  };

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (!granted) Alert("You need to allow permisions for this request");
  };

  const selectImage = async () => {
    try {
      const results = await ImagePicker.launchImageLibraryAsync();
      if (!results.cancelled) {
        setImageUri(results.uri);
      }
    } catch (error) {
      alert("Error: " + error);
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <Screen>
      {isLoading ? (
        <KoodiLoadIndicator visibility={isLoading} />
      ) : (
        <View style={styles.screen}>
          <Formik
            initialValues={{
              userName: "",
              userEmail: "",
              phone: "",
              password: "",
              confirm: "",
            }}
            onSubmit={createUser}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleSubmit, errors }) => (
              <>
                <View style={styles.logoHolder}>
                  <KoodiText>Create Account</KoodiText>
                </View>

                <View style={styles.inputHolder}>
                  <KoodiTextInput
                    size={60}
                    placeholder={"Username"}
                    onChangeText={handleChange("userName")}
                  />
                  <KoodiText style={{ color: "red", fontSize: 12 }}>
                    {errors.userName}
                  </KoodiText>
                  <KoodiTextInput
                    size={60}
                    keyboardType={"email-address"}
                    placeholder={"Email Address"}
                    onChangeText={handleChange("userEmail")}
                  />
                  <KoodiText style={{ color: "red", fontSize: 12 }}>
                    {errors.userEmail}
                  </KoodiText>
                  <KoodiTextInput
                    width="70%"
                    size={60}
                    placeholder={"Phone number"}
                    onChangeText={handleChange("phone")}
                  />
                  <KoodiText style={{ color: "red", fontSize: 12 }}>
                    {errors.phone}
                  </KoodiText>
                  <KoodiTextInput
                    width="80%"
                    secureTextEntry
                    size={60}
                    placeholder={"Password"}
                    onChangeText={handleChange("password")}
                  />
                  <KoodiText style={{ color: "red", fontSize: 12 }}>
                    {errors.password}
                  </KoodiText>

                  <KoodiTextInput
                    width="90%"
                    secureTextEntry
                    size={60}
                    placeholder={"confirm Password"}
                    onChangeText={handleChange("confirm")}
                  />
                  <KoodiText style={{ color: "red", fontSize: 12 }}>
                    {errors.confirm}
                  </KoodiText>
                  <ImageP
                    icon={"camera"}
                    placeholder={"Select Image"}
                    onPress={selectImage}
                    imageUri={imageUri}
                  />
                  <KoodiText style={{ color: "red", fontSize: 12 }}>
                    {imageError}
                  </KoodiText>
                </View>
                <View style={styles.buttonHolder}>
                  <KoodiButton
                    onPress={handleSubmit}
                    width={"80%"}
                    style={styles.button}
                  >
                    <KoodiText style={styles.text}>Sign up</KoodiText>
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
    flexGrow: 1,
    width: "100%",
  },
  screen: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft:8,
    backgroundColor: colors.white,
  },
});

export default RegistrationScreen;
