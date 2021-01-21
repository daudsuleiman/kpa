import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AppLoading } from "expo";

import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import UpdateScreen from "./screens/UpdateScreen";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AuthNavigator from "./apps/navigation/AuthNavigator";
import ButtonEdit from "./apps/navigation/ButtonEdit";
import colors from "./apps/configs/colors";
import AuthContext from "./apps/auth/context";
import authStorage from "./apps/auth/authStorage";

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        headerTitleAlign: "center",
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
      }}
    />
    <Stack.Screen
      name="SignUp"
      component={RegistrationScreen}
      options={{
        headerTitleAlign: "center",
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
      }}
    />
  </Stack.Navigator>
);

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: colors.primary,
    }}
  >
    <Tab.Screen
      name="dashboard"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons
            name="view-dashboard"
            size={size}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="updateDetails"
      component={UpdateScreen}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <ButtonEdit onPress={() => navigation.navigate("updateDetails")} />
        ),
      })}
    />
    <Tab.Screen
      name="settings"
      component={SettingsScreen}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="settings" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const userToken = await authStorage.getToken();
    if (!userToken) return;

    setUser(JSON.parse(userToken));
  };

  if (!isReady)
    return (
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? <TabNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
