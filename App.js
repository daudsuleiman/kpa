import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./apps/navigation/mainNavigation";
import { AppLoading } from "expo";
import { ModalPortal } from "react-native-modals";

import TospayAuth from "./tospay-library/auth";
import TospayStore from "./tospay-library/auth/secure/Storage";
import KpaAuthContext from "./apps/providers/KpaAuthContext";
import TospayContext from "./tospay-library/provider/TospayContext";

export default function App() {
  const [user, setUser] = useState({});
  const [country, setCountry] = useState({});
  const [wallet, setWallet] = useState({});
  const [token, setToken] = useState("");
  const [isReady, setisReady] = useState(false);

  const restoreUser = async () => {
    const tospayUser = await TospayStore.getUser();
    const userToken = await TospayStore.getToken();
    const userCountry = await TospayStore.getCountry();
    const userWallet = await TospayStore.getWallet();

    if (tospayUser === null || userToken === null || userWallet === null)
      return;

    setToken(userToken);
    setCountry(userCountry);
    setWallet(userWallet);
    setUser(tospayUser);
  };

  if (!isReady)
    return (
      <AppLoading startAsync={restoreUser} onFinish={() => setisReady(true)} />
    );

  return (
    <TospayContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        country,
        setCountry,
        wallet,
        setWallet,
      }}
    >
      <NavigationContainer>
        {!token ? <TospayAuth /> : <MainNavigator />}
      </NavigationContainer>
      <ModalPortal />
    </TospayContext.Provider>
  );
}
