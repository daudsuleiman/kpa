import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./apps/navigation/mainNavigation";

import KpaHomeScreen from "./apps/screens/KpaHomeScreen";
import TospayAuth from "./tospay-library/auth";
import TospayStore from "./tospay-library/auth/secure/Storage";
import KpaAuthContext from "./apps/providers/KpaAuthContext";
import TospayContext from "./tospay-library/provider/TospayContext";

export default function App() {
  const [user, setUser] = useState({});
  const [country, setCountry] = useState({});
  const [wallet, setWallet] = useState({});
  const [token, setToken] = useState("");

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

  useEffect(() => {
    restoreUser();
  }, []);

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
    </TospayContext.Provider>
  );
}
