import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import TospayText from "../../tospay-library/components/TospayText";

export default function SelectableBillItem({
  type,
  data,
  selectedData,
  removeItem,
}) {
  const [selected, setSelected] = useState(false);


  const handlePress = () => {
    if (selected) {
      removeItem(data);
      setSelected(false);
      return;
    }
    selectedData(data);
    setSelected(true);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={
        selected
          ? {
              flexDirection: "row",
              padding: 6,
              marginTop: 6,
              marginBottom: 6,
              backgroundColor: "#DBEDFF",
            }
          : {
              flexDirection: "row",
              padding: 6,
              marginTop: 6,
              marginBottom: 6,
            }
      }
    >
      <View
        style={
          selected
            ? {
                flex: 1,
                backgroundColor: "#203C73",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                padding: 3,
              }
            : {
                flex: 1,
                backgroundColor: "#DBEDFF",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                padding: 3,
              }
        }
      >
        {selected && (
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../../assets/selected.png")}
          />
        )}

        {!selected && (
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../../assets/open_bills.png")}
          />
        )}
      </View>

      <View style={{ flex: 3, justifyContent: "center", marginLeft: 16 }}>
        <TospayText numberOfLines={1} style={{}}>
          {`${type}  ${data.bill_no}`}
        </TospayText>
        <TospayText numberOfLines={1} style={{ color: "#b0b0b0" }}>
          Due 23/11/2021
        </TospayText>
      </View>

      <View
        style={{
          flex: 2,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <TospayText
          numberOfLines={1}
          style={{ fontSize: 12, color: "#b0b0b0", textAlign: "justify" }}
        >
          {data.currency}
        </TospayText>
        <TospayText numberOfLines={1} style={{}}>
          {data.amount}
        </TospayText>
      </View>
    </TouchableOpacity>
  );
}
