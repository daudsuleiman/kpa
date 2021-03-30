import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FailedBills from "../screens/FailedBills";
import PaymentSummary from "../screens/PaymentSummary";
import OpenBillsHome from "../screens/OpenBillsHome";
import OpenBillLogin from "../screens/OpenBillLogin";
import KpaAccountContext from "../providers/KpaAccountContext";

const Stack = createStackNavigator();

const OpenBillsNavigation = ({ route }) => (
  <KpaAccountContext.Provider value={{ route }} >
    <Stack.Navigator>
      <Stack.Screen
        name={"OpenBills"}
        component={OpenBillsHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"Summary"}
        component={PaymentSummary}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"Fails"}
        component={FailedBills}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </KpaAccountContext.Provider>
);

export default OpenBillsNavigation;
