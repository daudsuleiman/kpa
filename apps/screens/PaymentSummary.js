import React, { useState } from "react";
import Screen from "./Screen";
import backgroundImage from "../../assets/library/background.png";
import { FlatList, ScrollView, View } from "react-native";
import TospayText from "../../tospay-library/components/TospayText";
import BillItem from "../components/BillItem";
import KpaButton from "../components/KpaButton";
import TospayIndecator from "../../tospay-library/components/TospayIndecator";
import KpaEndpoints from "../../api/KpaEndpoints";

export default function PaymentSummary({ navigation, route }) {
  const invoice = route.params.data;

  const [paying, setpaying] = useState(false);

  const handleCheckout = async () => {
    if (!route.params.description) {
      console.log("No payment");
      return;
    }

    const data = {
      reference: route.params.description.referenceNo,
    };

    setpaying(true);

    const response = await KpaEndpoints.getPaymentToken(data);

    if (!response.ok) {
      setpaying(false);
      console.log(response);
      return;
    }

    setpaying(false);

    navigation.navigate("KpaCheckout", {
      token: response.data.data.tospayPaymentId,
    });
  };

  return (
    <Screen
      backgroundImage={backgroundImage}
      leftIcon={"arrowleft"}
      tilte={"Payment Summary"}
      onBackPress={() => navigation.goBack()}
    >
      <TospayIndecator isLoading={paying} />
      <View style={{ paddingLeft: 6, paddingRight: 6, flex: 4 }}>
        <FlatList
          data={invoice}
          keyExtractor={(item) => item.bill_no.toString()}
          ListHeaderComponent={
            <View style={{ paddingTop: 16, paddingBottom: 16 }}>
              <View>
                <TospayText numberOfLines={1} style={{ color: "#B0B0B0" }}>
                  Total payment
                </TospayText>
              </View>

              <View style={{ flexDirection: "row", padding: 3 }}>
                <View
                  style={{
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <TospayText
                    numberOfLines={1}
                    style={{ fontSize: 12, marginBottom: 2, color: "#B0B0B0" }}
                  >
                    {route.params.description.currency}
                  </TospayText>
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                  }}
                >
                  <TospayText numberOfLines={1}>
                    {route.params.description.amount}
                  </TospayText>
                </View>
              </View>
            </View>
          }
          renderItem={(item) => {
            return (
              <BillItem
                currency={route.params.description.currency}
                type={route.params.type}
                data={item.item}
              />
            );
          }}
        />
      </View>

      <View
        style={{
          justifyContent: "flex-start",
          padding: 6,
          flex: 1,
          alignItems: "center",
        }}
      >
        <View style={{ marginTop: 6 }}>
          <TospayText numberOfLines={1} style={{ color: "#B0B0B0" }}>
            Payment Reference Number (PRN)
          </TospayText>
          <TospayText numberOfLines={1}>
            {route.params.description.referenceNo}
          </TospayText>
        </View>

        <View
          style={{
            justifyContent: "flex-end",
            flexDirection: "row",
            padding: 6,
            flex: 1,
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1, padding: 6 }}>
            <KpaButton title={"Pay"} onPress={handleCheckout} />
          </View>
          <View style={{ padding: 6 }}>
            <KpaButton
              title={"Share"}
              isDisabled={true}
              icon={"share-variant"}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}
