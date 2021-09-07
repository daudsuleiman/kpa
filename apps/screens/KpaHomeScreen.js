import React, { useContext, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ModalContent, BottomModal } from "react-native-modals";
import { Root } from "popup-ui";

import { useNetInfo } from "@react-native-community/netinfo";

import HomeScreen from "../components/HomeScreen";
import BillItem from "../components/BillItem";
import AccountNavItem from "../components/AccountNavItem";
import TospayText from "../../tospay-library/components/TospayText";
import TouchableText from "../components/TouchableText";
import KpaClientContext from "../provider/KpaClientContext";
import { SafeAreaView } from "react-native-safe-area-context";

function KpaHomeScreen({ navigation }) {
  const { billerClient } = useContext(KpaClientContext);
  const netInfo = useNetInfo();

  const [openAccount, setOpenAccount] = useState(false);

  const openBill = [
    {
      referenceNo: "1617827366691",
      expiryAt: "2021-04-10T20:32:46.694+0000",
      amount: "1",
      currency: "USD",
      shared: true,
    },
    {
      referenceNo: "1617837566691",
      expiryAt: "2021-04-10T20:32:46.694+0000",
      amount: "1",
      currency: "USD",
      shared: false,
    },
    {
      referenceNo: "1614527566691",
      expiryAt: "2021-04-10T20:32:46.694+0000",
      amount: "1",
      currency: "USD",
      shared: false,
    },
    {
      referenceNo: "1617827556691",
      expiryAt: "2021-04-10T20:32:46.694+0000",
      amount: "1",
      currency: "USD",
      shared: true,
    },
    {
      referenceNo: "1617827565791",
      expiryAt: "2021-04-10T20:32:46.694+0000",
      amount: "1",
      currency: "USD",
      shared: false,
    },
  ];

  const invoice = [
    {
      bill_no: "1617827366691",
      expiryAt: "2021-04-10T20:32:46.694+0000",
      amount: "1",
      currency: "USD",
    },
    {
      bill_no: "1617837566691",
      expiryAt: "2021-04-10T20:32:46.694+0000",
      amount: "1",
      currency: "USD",
    },
    {
      bill_no: "1614527566691",
      expiryAt: "2021-04-10T20:32:46.694+0000",
      amount: "1",
      currency: "USD",
    },
    {
      bill_no: "1617827556691",
      expiryAt: "2021-04-10T20:32:46.694+0000",
      amount: "1",
      currency: "USD",
    },
    {
      bill_no: "1617827565791",
      expiryAt: "2021-04-10T20:32:46.694+0000",
      amount: "1",
      currency: "USD",
    },
  ];

  return (
    <Root>
      {!netInfo && (
        <SafeAreaView
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#b0b0b0",
          }}
        >
          <TospayText style={{ color: "white" }}>No Internet Access!</TospayText>
        </SafeAreaView>
      )}
      <HomeScreen
        onChangeAccount={() => {
          setOpenAccount(true);
        }}
        username={billerClient ? billerClient.alias : null}
        billerAccount={billerClient ? billerClient.customernumber : null}
      >
        <FlatList
          data={openBill}
          ListHeaderComponent={
            <TospayText style={{ margin: 16, color: "#404040", fontSize: 18 }}>
              Pending PRNs
            </TospayText>
          }
          keyExtractor={(item) => item.referenceNo.toString()}
          renderItem={(item) => (
            <BillItem
              shared={item.item.shared}
              type={"PRN"}
              currency={item.item.currency}
              data={item.item}
            />
          )}
          ListFooterComponent={
            <View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableText
                  name={"See all "}
                  onPress={() => {
                    navigation.navigate("PaymentReference");
                  }}
                  style={{
                    fontStyle: "italic",
                    fontSize: 16,
                    color: "#1A4587",
                    fontWeight: "bold",
                  }}
                />
              </View>

              <FlatList
                data={invoice}
                ListHeaderComponent={
                  <TospayText
                    style={{ margin: 16, color: "#404040", fontSize: 18 }}
                  >
                    Open Bills
                  </TospayText>
                }
                keyExtractor={(item) => item.bill_no.toString()}
                renderItem={(item) => (
                  <BillItem
                    shared={item.item.shared}
                    type={"Invoice"}
                    currency={item.item.currency}
                    data={item.item}
                  />
                )}
                ListFooterComponent={
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 16,
                    }}
                  >
                    <TouchableText
                      onPress={() => {
                        navigation.navigate("ViewInvoice");
                      }}
                      name={"See all "}
                      style={{
                        fontStyle: "italic",
                        fontSize: 16,
                        color: "#1A4587",
                        fontWeight: "bold",
                      }}
                    />
                  </View>
                }
              />
            </View>
          }
        />
      </HomeScreen>

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
              // navigation.navigate("KpaAccounts");
            }}
            icon={"bell-outline"}
            name={"Notifications"}
          />

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
        </ModalContent>
      </BottomModal>
    </Root>
  );
}

const styles = StyleSheet.create({
  texxt: {
    margin: 16,
  },
});
export default KpaHomeScreen;
