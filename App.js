import { StatusBar } from 'expo-status-bar';
import React, {useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import AjiraDashboard from './screens/AjiraDashboard';
import AjiraAllProducts from './screens/AjiraAllProducts';
import AjiraMyOrders from './screens/AjiraMyOrders';
import AjiraDetails from './screens/AjiraDetails';

import { AppLoading } from 'expo';
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {NavigationContainer} from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from './apps/configs/colors';
import AjiraDrawer from './apps/components/AjiraDrawer';
import AjiraLogin from './screens/AjiraLogin';
import AuthContext from './apps/auth/context';
import authStorage from './apps/auth/authStorage';


const Stack = createStackNavigator();
const Drawer =  createDrawerNavigator();


const DrawerNavigator = (props) =>(

  <Drawer.Navigator

    drawerContent={(props)=> <AjiraDrawer {...props}/>}
    drawerContentOptions={{
    activeTintColor: colors.primary,
    itemStyle: {marginVertical: 6},
    alignContent:"center"
  }}
  

  
  screenOptions={{
    headerStyle:{
       elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
      backgroundColor:colors.primary, 
      height:80},
    headerTintColor:colors.white,
    headerShown:true,
  }}>

     <Drawer.Screen name={"Dashboard"} component={AjiraDashboard}></Drawer.Screen>
     <Drawer.Screen name={"All Products"} component={AjiraAllProducts}></Drawer.Screen>
     <Drawer.Screen name={"My Orders"} component={AjiraMyOrders}></Drawer.Screen>
  </Drawer.Navigator>

)


const StackNavigator = () =>(
  <Stack.Navigator>

<Stack.Screen 
options={{
  headerShown:false
}}
name={"Home"} component={AjiraLogin}></Stack.Screen>


    <Stack.Screen  name={"Details"} component={AjiraDetails} 
        options={{
         headerTitleStyle:{
        alignContent:"center"
      },
      headerStyle:{backgroundColor: colors.primary, height:100},
      headerTintColor:colors.white,  }}
    
    ></Stack.Screen>
  </Stack.Navigator>
)

export default function App() {

const [user,setUser] = useState();

 const[isAppLoading,setIsAppLoading] = useState(false);

const restoreUser = async() =>{
   const token = await authStorage.getToken();
   if(!token)return;

  setUser(JSON.parse(token));
}

if(!isAppLoading) return <AppLoading startAsync={restoreUser} onFinish={()=>setIsAppLoading(true)}/>
  
return (
 <AuthContext.Provider value={{user,setUser}}>

<NavigationContainer>
   {!user ? <StackNavigator/> : <DrawerNavigator/>}
</NavigationContainer>
 </AuthContext.Provider>


  );
}

const styles = StyleSheet.create({
menu:{
  paddingRight:16
},
image:{
  height:40,
  width:40,
  borderRadius:20,
  marginRight:10
},
});
