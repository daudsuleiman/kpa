import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


import LinkAccounts from "../screens/LinkAccounts";

import HomeNavigation from "./HomeNavigation";
import InvoiceNavigation from "./InvoiceNavigation";
import OpenBillsNavigation from "./OpenBillsNavigation";

const Stack = createStackNavigator();

const AppNavigator = () => (
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
      name={"OpenBills"}
      component={OpenBillsNavigation}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name={"ViewInvoice"}
      component={InvoiceNavigation}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name={"BilllerAccounts"}
      component={LinkAccounts}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AppNavigator;
