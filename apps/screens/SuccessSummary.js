import React from "react";
import Screen from "./Screen";
import backgroundImage from "../../assets/library/background.png";
import { FlatList, Image, View } from "react-native";
import TospayText from "../../tospay-library/components/TospayText";
import BillItem from "../components/BillItem";
import KpaButton from "../components/KpaButton";
import TospayButton from "../../tospay-library/components/TospayButton";

export default function SuccessSummary() {
  const invoice = [
    {
      prn: "0123456789",
      amount: "20000",
      due: "23/03/2021",
      id: 0,
    },
    {
      prn: "0123456789",
      amount: "40000",
      due: "02/04/2021",
      id: 1,
    },
    {
      prn: "0123456789",
      amount: "9000",
      due: "13/05/2021",
      id: 2,
    },
  ];

  return (
    <Screen
      backgroundImage={backgroundImage}
      leftIcon={"arrowleft"}
      onBackPress={() => navigation.goBack()}
    >
      <View style={{ padding: 16, flex: 4 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            style={{ width: 100, height: 100 }}
            source={require("../../assets/success.png")}
          />
          <TospayText style={{ marginTop: 16, fontSize: 24, color: "#3F4047" }}>
            Payment Successful
          </TospayText>
        </View>

        <FlatList
          data={invoice}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <View style={{ marginTop: 16, marginBottom: 16 }}>
              <View>
                <TospayText numberOfLines={1} style={{ color: "#B0B0B0" }}>
                  Total payment
                </TospayText>
              </View>

              <View style={{ flexDirection: "row", margin: 3 }}>
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
                    KES
                  </TospayText>
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                  }}
                >
                  <TospayText numberOfLines={1}>90,000</TospayText>
                </View>
              </View>

              <View style={{ marginTop: 16 }}>
                <TospayText numberOfLines={1} style={{ color: "#3F4047" }}>
                  Payment Reference Number (PRN)
                </TospayText>
                <TospayText numberOfLines={1}>0123456789</TospayText>
              </View>
            </View>
          }
          renderItem={(item) => {
            return <BillItem data={item.item} />;
          }}
          ListFooterComponent={
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
                <TospayButton title={"Finish"} height={50} />
              </View>
            </View>
          }
        />
      </View>
    </Screen>
  );
}
