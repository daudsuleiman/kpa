import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import HomeScreen from "../components/HomeScreen";
import TospayText from "../../tospay-library/components/TospayText";
import TospayButton from "../../tospay-library/components/TospayButton";
import TospayAuth from "../../tospay-library/auth/secure/Storage";
import TospayContext from "../../tospay-library/provider/TospayContext";
import BillItem from "../components/BillItem";
import { ScrollView } from "react-native-gesture-handler";

function KpaHomeScreen({ navigation }) {
  const { user, setUser, setToken, setCountry, setWallet } = useContext(
    TospayContext
  );
  return (
    <HomeScreen
      onViewOpenBills={() => navigation.navigate("OpenBills")}
      onViewInvoice={() => navigation.navigate("ViewInvoice")}
      username={user.firstname}
    >
      <ScrollView>
        <BillItem />
        <BillItem />
        <BillItem />
        <BillItem />
        <BillItem />
        <BillItem />
        <BillItem />
        <BillItem />
        <BillItem />
        <BillItem />
        <BillItem />
        <BillItem />
        <BillItem />
        <BillItem />
      </ScrollView>
    </HomeScreen>
  );
}

const styles = StyleSheet.create({
  texxt: {
    margin: 16,
  },
});
export default KpaHomeScreen;
