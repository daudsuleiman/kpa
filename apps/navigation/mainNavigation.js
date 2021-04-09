import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LinkAccounts from "../screens/LinkAccounts";

import HomeNavigation from "./HomeNavigation";
import QrLogin from "../screens/QrLogin";
import KpaProfile from "../screens/KpaProfile";
import BillerAccount from "../screens/BillerAccount";
import KpaClientContext from "../provider/KpaClientContext";
import KpaStore from "../Cache/KpaStore";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [billerClient, setBillerclient] = useState({});

  const checkClientAccounts = async () => {
    const response = await KpaStore.getBillerAccount();

    if (response !== null) {
      response.forEach((item) => {
        if (item.active) {
          setBillerclient(item);
        }
      });
    }
  };

  useEffect(() => {
    checkClientAccounts();
  }, []);
  return (
    <KpaClientContext.Provider value={{ billerClient, setBillerclient }}>
      <Stack.Navigator
        initialRouteName={"Home"}
        activeColor="#034097"
        barStyle={{ backgroundColor: "#FFFFFF", elevation: 6 }}
      >
        <Stack.Screen
          name={"Home"}
          component={HomeNavigation}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="KpaAccounts"
          component={BillerAccount}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={"BilllerAccounts"}
          component={LinkAccounts}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={"webLogin"}
          component={QrLogin}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={"Accounts"}
          component={LinkAccounts}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={"TospayProfile"}
          component={KpaProfile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </KpaClientContext.Provider>
  );
}
