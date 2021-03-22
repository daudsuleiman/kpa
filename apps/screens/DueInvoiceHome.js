import React, { useState } from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BillScreens from "../components/BillScreens";
import DueInvoice from "./DueInvoice";
import PaidInvoice from "./PaidInvoice";
import KpaContext from "../provider/KpaContext";

const Tab = createMaterialTopTabNavigator();

export default function DueInvoiceHome({ navigation, route }) {
  const [invoices, setInvoices] = useState(route.params.bills);
  const [customerNumber, setCustomerNumber] = useState(
    route.params.customernumber
  );

  return (
    <KpaContext.Provider
      value={{ invoices, setInvoices, customerNumber, setCustomerNumber }}
    >
      <BillScreens onBackPress={() => navigation.goBack()} title={"Invoice "}>
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
          <Tab.Screen name={"Due"} component={DueInvoice} />
          <Tab.Screen name={"Paid"} component={PaidInvoice} />
        </Tab.Navigator>
      </BillScreens>
    </KpaContext.Provider>
  );
}
