import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import TospayText from "../../tospay-library/components/TospayText";

export default function BillerAccountItem({
  onPress,
  name,
  icon,
  iconColor,
  menuIsVisible,
  disabled,
  data,
  subtext,
  isActive,
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(data);
      }}
      style={styles.container}
      disabled={disabled}
    >
      <View style={styles.icon}>
        <MaterialCommunityIcons name={icon} size={24} color={iconColor} />
      </View>

      <View style={styles.text}>
        <TospayText numberOfLines={1} style={styles.description}>
          {name}
        </TospayText>
        <View style={{ flexDirection: "row" }}>
          <TospayText numberOfLines={1} style={styles.subdescription}>
            {isActive ? `${subtext} - ` : subtext}
          </TospayText>
          <TospayText numberOfLines={1} style={styles.subdescriptio}>
            {isActive ? ` Active` : null}
          </TospayText>
        </View>
      </View>

      {menuIsVisible && (
        <TouchableOpacity
          onPress={() => {
            onPress(data);
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 40,
          }}
        >
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 16,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 3,
    backgroundColor: "#1A4587",
    justifyContent: "center",
    alignItems: "center",
  },

  description: {
    fontSize: 16,
  },
  subdescription: {
    fontSize: 12,
    color: "#74788D",
  },
  subdescriptio: {
    fontSize: 12,
    color: "green",
  },
  text: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 16,
  },
});
