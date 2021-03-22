import React from "react";
import { View } from "react-native";
import TospayText from "../../tospay-library/components/TospayText";
import TospayLinkAccount from "../../tospay-library/screens/TospayLinkAccount";

export default function LinkAccounts({navigation}) {
  return <TospayLinkAccount  navigation={navigation}/>;
}
