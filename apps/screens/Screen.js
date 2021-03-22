import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";

export default function Screen({
  backgroundImage,
  children,
  tilte,
  leftIcon,
  rightIcon,
  centerImage,
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
            <AppBar>
              <TouchableOpacity onPress={onBackPress}>
                <AntDesign name={leftIcon} size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.text}>{tilte}</Text>
              {rightIcon && (
                <AntDesign name={rightIcon} size={24} color="#FFFFFF" />
              )}
            </AppBar>
          </SafeAreaView>
          <AppMainContainer>{children}</AppMainContainer>
        </AppBackground>
      )}

      {backgroundImage && (
        <AppBackground source={backgroundImage}>
          <SafeAreaView style={styles.safeView}>
            <AppBar>
              <TouchableOpacity onPress={onBackPress}>
                <AntDesign name={leftIcon} size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.text}>{tilte}</Text>
              {rightIcon && (
                <AntDesign name={rightIcon} size={24} color="#FFFFFF" />
              )}
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
    fontSize: 20,
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
  justify-content: space-between;
  padding: 16px;
`;

const Back = styled.View`
  flex-direction: row;
  align-items: center;
`;
