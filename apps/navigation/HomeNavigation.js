import React, { useState, useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

import KpaHomeScreen from "../screens/KpaHomeScreen";
import LinkAccounts from "../screens/LinkAccounts";

import { Image } from "react-native";
import QrLogin from "../screens/QrLogin";
import InvoiceNavigation from "./InvoiceNavigation";
import OpenBillsNavigation from "./OpenBillsNavigation";
const Tab = createMaterialBottomTabNavigator();

const AccountComponent = () => {
  console.log("you are getting here");
  return null;
};

const HomeNavigation = ({ navigation }) => {
  return (
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
        name={"PaymentReference"}
        component={OpenBillsNavigation}
        options={{
          tabBarLabel: "PRN",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="file-invoice-dollar" size={20} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={"ViewInvoice"}
        component={InvoiceNavigation}
        options={{
          tabBarLabel: "Bills",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="file-invoice" size={20} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={"Profile"}
        component={AccountComponent}
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
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            if (event.target.includes("Profile")) {
              navigation.navigate("Home", { account: true });
            }
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigation;
