import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import HomeScreen from "../components/HomeScreen";
import TospayText from "../../tospay-library/components/TospayText";
import TospayButton from "../../tospay-library/components/TospayButton";
import TospayAuth from "../../tospay-library/auth/secure/Storage";
import TospayContext from "../../tospay-library/provider/TospayContext";
import BillItem from "../components/BillItem";
import { ScrollView } from "react-native-gesture-handler";
import KpaStore from "../Cache/KpaStore";

function KpaHomeScreen({ navigation }) {
  const { user, setUser, setToken, setCountry, setWallet } = useContext(
    TospayContext
  );
  const [account, setaccount] = useState({});

  const checkIfBillerAccountExits = async () => {
    const accountInfo = await KpaStore.getBillerAccount();
    setaccount(accountInfo);
  };

  const navigateToOpenBills = () => {
    navigation.navigate("OpenBills", {
      data: {
        customernumber: account.customernumber,
        password: account.password,
      },
    });
  };

  const navigateToInvoice = () => {
    navigation.navigate("ViewInvoice", {
      data: {
        customernumber: account.customernumber,
        password: account.password,
      },
    });
  };

  useEffect(() => {
    checkIfBillerAccountExits();
  }, []);

  return (
    <HomeScreen
      onViewOpenBills={navigateToOpenBills}
      onViewInvoice={navigateToInvoice}
      onViewBillerAccounts={() => navigation.navigate("KpaAccounts")}
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
