import React from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";
import TospayText from "../../tospay-library/components/TospayText";

export default function HomeScreen({
  backgroundImage,
  children,
  onViewOpenBills,
  onViewInvoice,
  onViewBillerAccounts,
  username
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
              <TospayText
                numberOfLines={1}
                style={{
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >{`Habari ${username} !`}</TospayText>

              <Image
                style={{ width: 30, height: 30 }}
                source={require("../../assets/kpa-logo.png")}
              />
            </AppBar>

            {/* Images top start */}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginBottom:16
              }}
            >
              <TouchableOpacity
                onPress={onViewOpenBills}
                style={{
                  justifyContent: "center",
                  backgroundColor: "rgba(219, 237, 255, 0.3)",
                  width: 100,
                  height:100,
                  margin: 3,
                  borderRadius: 10,
                  padding: 3,
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require("../../assets/open_bills.png")}
                />

                <TospayText
                  numberOfLines={2}
                  style={{
                    color: "#FFFFFF",
                    textAlign: "center",
                    fontSize: 14,
                    margin: 6,
                  }}
                >
                  View Open Bills
                </TospayText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onViewInvoice}
                style={{
                  justifyContent: "center",
                  backgroundColor: "rgba(219, 237, 255, 0.3)",
                  width: 100,
                  height:100,
                  margin: 3,
                  borderRadius: 10,
                  padding: 3,
                  alignItems: "center",
                }}
              >
                <Image
                   style={{ width: 40, height: 40 }}
                  source={require("../../assets/invoice.png")}
                />

                <TospayText
                  numberOfLines={2}
                  style={{
                    color: "#FFFFFF",
                    textAlign: "center",
                    fontSize: 14,
                    margin: 6,
                  }}
                >
                  View Invoice
                </TospayText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onViewBillerAccounts}
                style={{
                  justifyContent: "center",
                  backgroundColor: "rgba(219, 237, 255, 0.3)",
                  width: 100,
                  height:100,
                  margin: 3,
                  borderRadius: 10,
                  padding: 3,
                  alignItems: "center",
                }}
              >
                <Image
                style={{ width: 40, height: 40 }}
                  source={require("../../assets/user.png")}
                />

                <TospayText
                  numberOfLines={2}
                  style={{
                    color: "#FFFFFF",
                    textAlign: "center",
                    fontSize: 14,
                    margin: 6,
                  }}
                >
                  Biller Account
                </TospayText>
              </TouchableOpacity>
            </View>

            {/* Images top end */}
          </SafeAreaView>
          <AppMainContainer>{children}</AppMainContainer>
        </AppBackground>
      )}

      {backgroundImage && (
        <AppBackground source={backgroundImage}>
          <SafeAreaView style={styles.safeView}>
            <AppBar>
              <TospayText
                numberOfLines={1}
                style={{
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >{`Habari ${username} !`}</TospayText>

              <Image
                style={{ width: 30, height: 30 }}
                source={require("../../assets/kpa-logo.png")}
              />
            </AppBar>

            {/* Images top start */}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity
                onPress={onViewOpenBills}
                style={{
                  justifyContent: "center",
                  backgroundColor: "rgba(219, 237, 255, 0.3)",
                  width: 100,
                  margin: 6,
                  borderRadius: 10,
                  padding: 6,
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require("../../assets/open_bills.png")}
                />

                <TospayText
                  numberOfLines={2}
                  style={{
                    color: "#FFFFFF",
                    textAlign: "center",
                    fontSize: 14,
                    margin: 6,
                  }}
                >
                  View Open Bills
                </TospayText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onViewInvoice}
                style={{
                  justifyContent: "center",
                  backgroundColor: "rgba(219, 237, 255, 0.3)",
                  width: 100,
                  margin: 6,
                  borderRadius: 10,
                  padding: 6,
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require("../../assets/invoice.png")}
                />

                <TospayText
                  numberOfLines={2}
                  style={{
                    color: "#FFFFFF",
                    textAlign: "center",
                    fontSize: 14,
                    margin: 6,
                  }}
                >
                  View Invoice
                </TospayText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onViewBillerAccounts}
                style={{
                  justifyContent: "center",
                  backgroundColor: "rgba(219, 237, 255, 0.3)",
                  width: 100,
                  margin: 6,
                  borderRadius: 10,
                  padding: 6,
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require("../../assets/user.png")}
                />

                <TospayText
                  numberOfLines={2}
                  style={{
                    color: "#FFFFFF",
                    textAlign: "center",
                    fontSize: 14,
                    margin: 6,
                  }}
                >
                  Biller Account
                </TospayText>
              </TouchableOpacity>
            </View>

            {/* Images top end */}
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
  align-items: center
  padding: 16px;
`;

const Back = styled.View`
  flex-direction: row;
  align-items: center;
`;
