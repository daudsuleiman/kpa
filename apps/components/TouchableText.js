import React from "react";
import { TouchableOpacity } from "react-native";
import TospayText from "../../tospay-library/components/TospayText";

export default function TouchableText({ onPress, name, style }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <TospayText
        style={[
          {
            color: "#74788D",
            fontSize: 14,
            marginLeft: 16,
            marginTop: 16,
          },
          style,
        ]}
      >
        {name}
      </TospayText>
    </TouchableOpacity>
  );
}
