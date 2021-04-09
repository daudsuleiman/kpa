import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

export default function BillScreens({
  backgroundImage,
  children,
  title,
  leftIcon,
  rightIcon,
  onBackPress,
}) {
  return (
    <Container>
      <StatusBar
        translucent={true}
        backgroundColor={"transparent"}
        barStyle="light-content"
      />

      {!backgroundImage && (
        <AppBackground source={require("../../assets/library/background.png")}>
          <SafeAreaView style={styles.safeView}>
            <View style={{ backgroundColor: "#203C73", overflow:'hidden',justifyContent:'center',alignItems:'center', flexDirection:'row',padding:6 }}>
              <TouchableOpacity style={{ marginRight:6,marginLeft:6 }}>
                <AntDesign name="search1" size={24} color="white" />
              </TouchableOpacity>
              <TextInput placeholderTextColor={"#FFFFFF"} placeholder={"Search"}  style={{ backgroundColor:"#203C73",color:"#FFF",fontSize:16, flex:1, borderRadius:36, padding:3  }}/>
              <View style={{ }}/>
            </View>
            <AppBar>
             {leftIcon && <TouchableOpacity onPress={onBackPress}>
                <AntDesign name={"arrowleft"} size={24} color="#FFFFFF" />
              </TouchableOpacity>}
              <Text style={styles.text}>{title}</Text>
            </AppBar>
          </SafeAreaView>
          <AppMainContainer>{children}</AppMainContainer>
        </AppBackground>
      )}

      {backgroundImage && (
        <AppBackground source={backgroundImage}>
          <SafeAreaView style={styles.safeView}>
            <View style={{ backgroundColor: "#203C73", overflow:'hidden',justifyContent:'center',alignItems:'center', flexDirection:'row',padding:6 }}>
              <TouchableOpacity style={{ marginRight:6,marginLeft:6 }}>
                <AntDesign name="search1" size={24} color="white" />
              </TouchableOpacity>
              <TextInput placeholderTextColor={"#FFFFFF"} placeholder={"Search"}  style={{ backgroundColor:"#203C73",color:"#FFF",fontSize:16, flex:1, borderRadius:36, padding:3  }}/>
              <View style={{ }}/>
            </View>
            <AppBar>
              <TouchableOpacity onPress={onBackPress}>
                <AntDesign name={"arrowleft"} size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.text}>{title}</Text>
            </AppBar>
          </SafeAreaView>
          <AppMainContainer>{children}</AppMainContainer>
        </AppBackground>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  safeView: {
    paddingTop: 30,
  },
  text: {
    fontSize: 24,
    marginLeft:16,
    color: "#FFFFFF",
    
  },
});

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const AppBackground = styled.ImageBackground`
  width: 100%;
  flex: 1;
`;

const AppMainContainer = styled.View`
  flex: 1;
  background-color: #fff;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  overflow: hidden;
`;

const AppBar = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
`;

const Back = styled.View`
  flex-direction: row;
  align-items: center;
`;
