import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import BillScreens from "../components/BillScreens";
import DueBills from "./DueBills";
import PaidBills from "./PaidBills";
import FailedBills from "./FailedBills";

const Tab = createMaterialTopTabNavigator();
export default function OpenBillsHome({ navigation }) {
  return (
    <BillScreens onBackPress={() => navigation.goBack()} title={"Open Bills"}>
      <Tab.Navigator
        timingConfig={0.2}
        timing
        tabBarOptions={{
          style: {
            elevation: 0,
            backgroundColor: "white",
          },
        }}
      >
        <Tab.Screen name={"Due"} component={DueBills} />
        <Tab.Screen name={"Paid"} component={PaidBills} />
        <Tab.Screen name={"Failed"} component={FailedBills} />
      </Tab.Navigator>
    </BillScreens>
  );
}
