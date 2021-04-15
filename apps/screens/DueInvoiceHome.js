import React, { useContext, useState } from "react";
import { Root } from 'popup-ui'

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BillScreens from "../components/BillScreens";
import DueInvoice from "./DueInvoice";
import PaidInvoice from "./PaidInvoice";
import KpaContext from "../provider/KpaContext";
import KpaAccountContext from "../providers/KpaAccountContext";
import KpaClientContext from "../provider/KpaClientContext";

const Tab = createMaterialTopTabNavigator();

export default function DueInvoiceHome({ navigation }) {
  const { billerClient, setBillerclient } = useContext(KpaClientContext);

  const [customerNumber, setCustomerNumber] = useState(
    billerClient.customernumber
  );

  const [cusPassword, setCusPassword] = useState(billerClient.password);

  return (
    <Root>
      <KpaContext.Provider
        value={{
          cusPassword,
          setCusPassword,
          customerNumber,
          setCustomerNumber,
        }}
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
            {/* <Tab.Screen name={"Paid"} component={PaidInvoice} /> */}
          </Tab.Navigator>
        </BillScreens>
      </KpaContext.Provider>
    </Root>
  );
}
