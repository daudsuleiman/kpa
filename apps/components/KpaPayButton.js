import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import TospayText from "../../tospay-library/components/TospayText";

export default function KpaPayButton({
  onPress,
  isDisabled,
  leftText,
  rightText = "0.00",
  currency = "",
  height = 50,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={
        isDisabled
          ? [styles.buttonDisabled, { height: height }]
          : [styles.buttonEnabled, { height: height }]
      }
    >
      <View style={{ flex: 2, marginLeft: 16 }}>
        <TospayText style={{ color: "#FFF" }}>{leftText}</TospayText>
      </View>

      <View style={{ flex: 1 }}></View>

      <View style={{ flex: 1.5, marginRight: 16 }}>
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
              style={{ fontSize: 12, marginBottom: 2, color: "#FFF" }}
            >
              {currency}
            </TospayText>
            <TospayText numberOfLines={1} style={{ color: "#FFF" }}>
              {rightText}
            </TospayText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonDisabled: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#529AE5",
    borderRadius: 25,
  },
  buttonEnabled: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#10549B",
    borderRadius: 25,
  },
});
