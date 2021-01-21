import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import WelcomeScreen from '../../screens/WelcomeScreen';
import LoginScreen from '../../screens/LoginScreen';
import RegistrationScreen from '../../screens/RegistrationScreen';


const Stack = createStackNavigator();

const AuthNavigator = () => (
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



export default AuthNavigator;