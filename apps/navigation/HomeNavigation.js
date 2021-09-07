import React, { useState, useContext } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { Root, Popup } from "popup-ui";
import { ModalContent, BottomModal } from "react-native-modals";

import KpaHomeScreen from "../screens/KpaHomeScreen";
import { Image } from "react-native";
import InvoiceNavigation from "./InvoiceNavigation";
import OpenBillsNavigation from "./OpenBillsNavigation";
import KpaClientContext from "../provider/KpaClientContext";
import AccountNavItem from "../components/AccountNavItem";
import KpaStore from "../Cache/KpaStore";
import Storage from "../../tospay-library/auth/secure/Storage";
import TospayContext from "../../tospay-library/provider/TospayContext";
const Tab = createMaterialBottomTabNavigator();

const AccountComponent = () => {
  console.log("you are getting here");
  return null;
};

const HomeNavigation = ({ navigation }) => {
  const { billerClient, setBillerclient } = useContext(KpaClientContext);
  const { setUser, setToken, setCountry, setWallet } = useContext(
    TospayContext
  );
  const [openAccount, setOpenAccount] = useState(false);

  const isEmpty = (obj) => {
    for (var x in obj) {
      return false;
    }
    return true;
  };

  const logoutUser = () => {
    setOpenAccount(false);

    KpaStore.deleteBillerAccount();
    Storage.logoutUser();

    setUser(null);
    setToken(null);
    setCountry(null);
    setWallet(null);
    setBillerclient(null);
  };

  return (
    <Root>
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
              <FontAwesome5
                name="file-invoice-dollar"
                size={20}
                color={color}
              />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();

              if (isEmpty(billerClient)) {
                Popup.show({
                  type: "Warning",
                  title: "Biller Account Missing",
                  textBody:
                    "Go to -> Profile tab -> Biller Account and add a KPA Biller Account",
                  buttontext: "Close",
                  callback: () => Popup.hide(),
                });

                return;
              }
              navigation.navigate("PaymentReference");
            },
          })}
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
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();

              if (isEmpty(billerClient)) {
                Popup.show({
                  type: "Warning",
                  title: "Biller Account Missing",
                  textBody:
                    "Go to -> Profile tab -> Biller Account and add a KPA Biller Account",
                  buttontext: "Close",
                  callback: () => Popup.hide(),
                });
                return;
              }
              navigation.navigate("ViewInvoice");
            },
          })}
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
              setOpenAccount(true);
            },
          })}

          
        />
      </Tab.Navigator>

      <BottomModal
        visible={openAccount}
        onTouchOutside={() => {
          setOpenAccount(false);
        }}
        height={0.4}
        width={1}
        onSwipeOut={() => setOpenAccount(false)}
      >
        <ModalContent
          style={{
            flex: 1,
            backgroundColor: "fff",
          }}
        >
          <AccountNavItem
            onPress={() => {
              setOpenAccount(false);
              navigation.navigate("KpaAccounts");
            }}
            icon={"plus"}
            name={"Biller Account"}
          />
          <AccountNavItem
            onPress={() => {
              setOpenAccount(false);
              navigation.navigate("Accounts");
            }}
            icon={"wallet-outline"}
            iconSize={26}
            name={"Payment Accounts"}
          />

          <AccountNavItem
            onPress={() => {
              setOpenAccount(false);
              navigation.navigate("TospayProfile");
            }}
            icon={"account"}
            name={"Profile"}
          />

          <AccountNavItem
            onPress={() => {
              setOpenAccount(false);
              navigation.navigate("webLogin");
            }}
            icon={"qrcode-scan"}
            name={"Web Login"}
          />
          <AccountNavItem
            onPress={() => {
              setOpenAccount(false);
              logoutUser();
            }}
            icon={"location-exit"}
            name={"Log out"}
          />
        </ModalContent>
      </BottomModal>
    </Root>
  );
};

export default HomeNavigation;
