import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FailedBills from "../screens/FailedBills";
import PaidBills from "../screens/PaidBills";
import DueInvoiceHome from "../screens/DueInvoiceHome";
import PaymentSummary from "../screens/PaymentSummary";
import SuccessSummary from "../screens/SuccessSummary";
import BillerLogin from "../screens/BillerLogin";
import KpaCheckout from "../screens/KpaCheckout";

const Stack = createStackNavigator();

const InvoiceNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={"BillerLogin"}
      component={BillerLogin}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={"Due"}
      component={DueInvoiceHome}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={"Summary"}
      component={PaymentSummary}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name={"KpaCheckout"}
      component={KpaCheckout}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name={"Success"}
      component={SuccessSummary}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default InvoiceNavigation;
