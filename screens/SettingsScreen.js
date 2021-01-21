import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import authStorage from "../apps/auth/authStorage";
import AuthContext from "../apps/auth/context";
import KoodiText from "../apps/components/KoodiText";
import ListItem from "../apps/components/ListItem";
import Screen from "../apps/components/TabScreen";
import colors from "../apps/configs/colors";

function SettingsScreen() {
  const { setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setUser(null);
    authStorage.logOutUser();
  };

  return (
    <Screen>
      <View
        style={{ backgroundColor: colors.white, height: "100%", width: "100%" }}
      >
        <View style={styles.profileholder}>
          <KoodiText style={styles.setting}>Settings</KoodiText>
        </View>

        <View style={styles.bcon}>
          <ListItem
            onPress={handleLogout}
            icon={"logout"}
            placeholder={"Logout"}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  bcon:{
    margin:6,
    borderRadius:2,
    overflow:'hidden'
  },
  profileholder: {
    padding: 6,
  },
  setting: {
    fontSize: 24,
    color: colors.darkGray,
    margin: 6,
  },
});
export default SettingsScreen;
