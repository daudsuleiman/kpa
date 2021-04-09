import React, { useState, useContext } from "react";
import { Root, Popup } from "popup-ui";
import { ModalTitle, ModalContent, BottomModal } from "react-native-modals";

import backgroundImage from "../../assets/library/background.png";
import TospayText from "../../tospay-library/components/TospayText";
import { Image, StyleSheet, View } from "react-native";
import ProfileScreen from "../components/ProfileScreen";
import TospayContext from "../../tospay-library/provider/TospayContext";
import TospayIndecator from "../../tospay-library/components/TospayIndecator";
import TospayButton from "../../tospay-library/components/TospayButton";
import TouchableText from "../components/TouchableText";
import KpaStore from "../Cache/KpaStore";
import Storage from "../../tospay-library/auth/secure/Storage";
import KpaClientContext from "../provider/KpaClientContext";

export default function KpaProfile({ navigation }) {
  const { user, setUser, setToken, setCountry, setWallet } = useContext(
    TospayContext
  );
  const { setBillerclient } = useContext(KpaClientContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const logoutUser = () => {
    setIsMenuOpen(false);

    KpaStore.deleteBillerAccount();
    Storage.logoutUser();

    setUser(null);
    setToken(null);
    setCountry(null);
    setWallet(null);
    setBillerclient(null);
  };

  return (
    <Root>
      <ProfileScreen
        backgroundImage={backgroundImage}
        leftIcon={"arrowleft"}
        tilte={"Profile"}
        rightIcon={"dots-vertical"}
        onBackPress={() => navigation.goBack()}
        onRightClick={() => {
          setIsMenuOpen(true);
        }}
      >
        <View style={{ flex: 1, padding: 6 }}>
          <View style={{ marginTop: 32, marginLeft: 16, marginRight: 16 }}>
            <View style={styles.mainImageContainer}>
              <View style={styles.imageConta}>
                <Image
                  style={{ width: 60, height: 60 }}
                  source={require("../../assets/avater.png")}
                />
              </View>

              <TospayText
                style={{ marginLeft: 16, fontSize: 21, color: "#3F4047" }}
              >
                {user.name}
              </TospayText>
            </View>

            {/* name and other informatio section */}

            <View style={{ flexDirection: "row", marginTop: 16 }}>
              <View style={{ flex: 1 }}>
                <TospayText
                  numberOfLines={1}
                  style={{ fontSize: 14, color: "#3F4047" }}
                >
                  Email
                </TospayText>
              </View>

              <View
                style={{
                  flex: 2,
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <TospayText
                  numberOfLines={1}
                  style={{ fontSize: 14, color: "#3F4047" }}
                >
                  {user.email}
                </TospayText>
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: 16 }}>
              <View style={{ flex: 1 }}>
                <TospayText
                  numberOfLines={1}
                  style={{ fontSize: 14, color: "#3F4047" }}
                >
                  Phone
                </TospayText>
              </View>

              <View
                style={{
                  flex: 2,
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <TospayText
                  numberOfLines={1}
                  style={{ fontSize: 14, color: "#3F4047" }}
                >
                  {user.phone}
                </TospayText>
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: 16 }}>
              <View style={{ flex: 1 }}>
                <TospayText
                  numberOfLines={1}
                  style={{ fontSize: 14, color: "#3F4047" }}
                >
                  ID Number
                </TospayText>
              </View>

              <View
                style={{
                  flex: 2,
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <TospayText
                  numberOfLines={1}
                  style={{ fontSize: 14, color: "#3F4047" }}
                >
                  {user.user_id}
                </TospayText>
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: 16 }}>
              <View style={{ flex: 1 }}>
                <TospayText
                  numberOfLines={1}
                  style={{ fontSize: 14, color: "#3F4047" }}
                >
                  State
                </TospayText>
              </View>

              <View
                style={{
                  flex: 2,
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <TospayText
                  numberOfLines={1}
                  style={{ fontSize: 14, color: "#3F4047" }}
                >
                  {user.country.name}
                </TospayText>
              </View>
            </View>

            {/* end of the section */}
          </View>
        </View>
      </ProfileScreen>

      {/* Delete account  bottom view */}

      <BottomModal
        visible={isMenuOpen}
        onTouchOutside={() => {
          setIsMenuOpen(false);
        }}
        height={0.4}
        width={1}
        onSwipeOut={() => setIsMenuOpen(false)}
      >
        <TospayIndecator isLoading={isLoading} />
        <ModalContent
          style={{
            flex: 1,
            backgroundColor: "fff",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: 6,
            }}
          >
            <TospayText>Sign-out</TospayText>
          </View>

          <View style={{}}>
            <View
              style={{
                justifyContent: "flex-start",
              }}
            >
              <TospayText
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  color: "#3F4047",
                  marginBottom: 16,
                  marginLeft: 20,
                }}
              >
                Are you sure you want to sign out? You will be not be able see
                your PRNs or bills and make payments
              </TospayText>
            </View>
            <View style={{ justifyContent: "center" }}>
              <TospayButton
                title={"Sign-out"}
                height={50}
                onPress={logoutUser}
              />
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 16,
                }}
              >
                <TospayText>OR</TospayText>

                <TouchableText
                  name={"Cancel"}
                  style={{ fontSize: 14, marginLeft: -0 }}
                  onPress={() => setIsMenuOpen(false)}
                />
              </View>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </Root>
  );
}
const styles = StyleSheet.create({
  imageConta: {
    borderWidth: 1,
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  mainImageContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
