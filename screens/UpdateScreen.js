import React, { useState, useEffect, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import * as Yup from "yup";
import { StyleSheet, View, Alert, Text } from "react-native";
import ImageP from "../apps/components/ImageP";
import KoodiButton from "../apps/components/KoodiButton";
import KoodiText from "../apps/components/KoodiText";
import KoodiTextInput from "../apps/components/KoodiTextInput";
import Screen from "../apps/components/TabScreen";
import colors from "../apps/configs/colors";
import endpoint from "../apps/api/endpoints";
import AuthContext from "../apps/auth/context";
import KoodiLoadIndicator from "../apps/components/KoodiLoadIndicator";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  email: Yup.string().email().required().label("Email"),
  phone: Yup.string().required().label("Phone"),
});

function UpdateScreen() {
  const [imageUri, setImageUri] = useState(null);
  const [imageError, setImageError] = useState(null);
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (!granted) Alert("You need to allow permisions for this request");
  };

  const selectImage = async () => {
    try {
      const results = await ImagePicker.launchImageLibraryAsync();
      if (!results.cancelled) {
        setImageError(null);
        setImageUri(results.uri);
      }
    } catch (error) {
      alert("Error: " + error);
    }
  };

  const handleDataUpdate = async (values) => {
    if (imageUri === null) return setImageError("Image is required");

    setIsLoading(true);

    const data = {
      username: values.username,
      phone: values.phone,
      image: imageUri,
      email: values.email,
    };

    const result = await endpoint.updateInfo(data, user.token);
    if (!result.ok) {
      setIsLoading(false);
      return alert("Update was not successful");
    }

    setIsLoading(false)
    alert("Your profile has been successfully updated");
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <Screen>
      {isLoading ? (
        <KoodiLoadIndicator visibility={isLoading} />
      ) : (
        <View style={styles.container}>
          <Formik
            initialValues={{
              username: user.username,
              phone: user.phone,
              email: user.email,
            }}
            onSubmit={handleDataUpdate}
          >
            {({ handleChange, handleSubmit }) => (
              <>
                <View style={styles.tagin}>
                  <KoodiText style={styles.tag}>Update information</KoodiText>
                </View>
                <View style={styles.inputs}>
                  <ImageP
                    icon={"camera"}
                    placeholder={"Select image"}
                    onPress={selectImage}
                    imageUri={imageUri}
                  />
                  <Text style={{ color: "red" }}>{imageError}</Text>

                  <KoodiTextInput
                    width={"80%"}
                    size={60}
                    placeholder={"Username"}
                    onChangeText={handleChange("username")}
                  />
                  <KoodiTextInput
                    width={"70%"}
                    size={60}
                    placeholder={"email address"}
                    onChangeText={handleChange("email")}
                  />
                  <KoodiTextInput
                    width={"80%"}
                    size={60}
                    placeholder={"Phone"}
                    onChangeText={handleChange("phone")}
                  />
                </View>
                <View style={styles.button}>
                  <KoodiButton
                    onPress={handleSubmit}
                    style={styles.buitem}
                    size={60}
                    width={"80%"}
                  >
                    <KoodiText style={styles.text}>Update</KoodiText>
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
  images: {
    height: 150,
    width: 150,
    borderRadius: 20,
    elevation: 1,
    overflow: "hidden",
  },
  tagin: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  tag: {
    margin: 3,
    fontSize: 25,
    color: colors.darkGray,
    fontWeight: "bold",
  },
  text: {
    margin: 3,
    fontSize: 18,
    color: colors.white,
  },
  buitem: {
    height: 60,
  },
  button: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  inputs: {
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: "100%",
    backgroundColor: colors.white,
    padding: 16,
  },
});

export default UpdateScreen;
