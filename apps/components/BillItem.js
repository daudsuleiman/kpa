import React from "react";
import { Image, View } from "react-native";
import TospayText from "../../tospay-library/components/TospayText";

export default function BillItem({ currency, type, data }) {
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 6,
        marginTop: 6,
        marginBottom: 6,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#DBEDFF",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          padding: 3,
        }}
      >
        <Image
          style={{ width: 50, height: 50 }}
          source={require("../../assets/open_bills.png")}
        />
      </View>

      <View style={{ flex: 3, justifyContent: "center", marginLeft: 16 }}>
        {data ? (
          <TospayText numberOfLines={1} style={{}}>
            {type === "PRN" ? `${type} ${data.prn}` : `${type} ${data.bill_no}`}
          </TospayText>
        ) : (
          <TospayText
            numberOfLines={1}
            style={{}}
          >{`PRN 25323819823`}</TospayText>
        )}

        <TospayText numberOfLines={1} style={{ color: "#b0b0b0" }}>
          {data ? `Due ${data.due}` : `DUE 23/11/2021`}
        </TospayText>
      </View>

      <View
        style={{
          flex: 2,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", margin: 3 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "flex-end",
              flexDirection: "row",
            }}
          >
            <TospayText
              numberOfLines={1}
              style={{ fontSize: 12, marginBottom: 2, color: "#B0B0B0" }}
            >
              {currency}
            </TospayText>
            <TospayText numberOfLines={1}>
              {data ? data.amount : `90,000`}
            </TospayText>
          </View>
        </View>
      </View>
    </View>
  );
}
