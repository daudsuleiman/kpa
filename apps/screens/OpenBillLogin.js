import React from "react";
import * as Yup from "yup";

import Screen from "./Screen";
import backgroundImage from "../../assets/library/background.png";
import { Image, View } from "react-native";
import TospayText from "../../tospay-library/components/TospayText";
import TospayForm from "../../tospay-library/components/TospayForm";
import TospayInputForm from "../../tospay-library/components/TospayInputForm";
import TospaySubmitButton from "../../tospay-library/components/TospaySubmitButton";

const validationSchema = Yup.object().shape({
  customernumber: Yup.string().required().label("Customer Number"),
  password: Yup.string().required().label("Pass code"),
});

export default function OpenBillLogin({ navigation }) {
  const accessBillerAccount = (values) => {
    console.log(values);
    navigation.navigate("OpenBills");
  };
  return (
    <Screen
      backgroundImage={backgroundImage}
      tilte={"Access Biller Account"}
      leftIcon={"arrowleft"}
      onBackPress={() => navigation.goBack()}
    >
      <View style={{ padding: 16, flex: 4 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            style={{ width: 100, height: 100 }}
            source={require("../../assets/success.png")}
          />
          <TospayText style={{ marginTop: 16, fontSize: 24, color: "#3F4047" }}>
            Login To Biller Account
          </TospayText>
        </View>

        <TospayForm
          initialValues={{
            customernumber: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => accessBillerAccount(values)}
        >
          <TospayInputForm
            name="customernumber"
            keyboardType="default"
            isVisible
            textContentType="username"
            underlineColor={"red"}
            placeholder="Customer Number"
          />

          <TospayInputForm
            icon="lock-open"
            placeholder="Pass code"
            isVisible
            textContentType="password"
            name="password"
            isPassword
          />

          <TospaySubmitButton
            icon={"login-variant"}
            title={"Biller Login"}
            height={50}
            isLoading={false}
            style={{ marginTop: 26 }}
          />
        </TospayForm>
      </View>
    </Screen>
  );
}
