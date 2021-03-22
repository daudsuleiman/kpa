import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import KpaHomeScreen from "../screens/KpaHomeScreen";
import LinkAccounts from "../screens/LinkAccounts";
import TospayCheckoutNavigation from "../../tospay-library/auth/navigation/CheckoutNavigation";
import { Image } from "react-native";
import QrLogin from "../screens/QrLogin";
import BillerLogin from "../screens/BillerLogin";
import KpaCheckout from "../screens/KpaCheckout";

const Tab = createMaterialBottomTabNavigator();

const HomeNavigation = () => (
  <Tab.Navigator
    initialRouteName={"Home"}
    activeColor="#034097"
    barStyle={{ backgroundColor: "#FFFFFF", elevation: 6 }}
  >
    <Tab.Screen
      name={"Home"}
      component={KpaHomeScreen}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
    />

    <Tab.Screen
      name={"PaymentHistory"}
      component={QrLogin}
      options={{
        tabBarLabel: "QR Login",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="qrcode-scan" color={color} size={24} />
        ),
      }}
    />
    <Tab.Screen
      name={"Accounts"}
      component={LinkAccounts}
      options={{
        tabBarLabel: "Accounts",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="wallet-outline"
            color={color}
            size={26}
          />
        ),
      }}
    />

    <Tab.Screen
      name={"Profile"}
      component={KpaCheckout}
      options={{
        tabBarLabel: "",
        tabBarIcon: ({ color }) => (
          <Image
            style={{
              width: 30,
              height: 30,
              borderWidth: 1,
              borderColor: "#034097",
              borderRadius: 15,
            }}
            source={require("../../assets/avater.png")}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default HomeNavigation;
