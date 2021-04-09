import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { Root, Popup } from "popup-ui";

import { ModalTitle, ModalContent, BottomModal } from "react-native-modals";

import Screen from "./Screen";
import backgroundImage from "../../assets/library/background.png";
import { FlatList, TouchableOpacity, View } from "react-native";
import TospayText from "../../tospay-library/components/TospayText";
import TospayForm from "../../tospay-library/components/TospayForm";
import TospayInputForm from "../../tospay-library/components/TospayInputForm";
import TospaySubmitButton from "../../tospay-library/components/TospaySubmitButton";
import KpaStore from "../Cache/KpaStore";
import BillerAddAccountItem from "../components/BillerAddAccountItem";
import BillerAccountItem from "../components/BillerAccountItem";
import TospayIndecator from "../../tospay-library/components/TospayIndecator";
import KpaButton from "../components/KpaButton";
import TouchableText from "../components/TouchableText";
import KpaClientContext from "../provider/KpaClientContext";

const validationSchema = Yup.object().shape({
  customernumber: Yup.string().required().label("Customer Number"),
  password: Yup.string().required().label("Pass code"),
});

const validateAlias = Yup.object().shape({});

export default function BillerAccount({ navigation }) {
  const [openAccount, setOpenAccount] = useState(false);
  const [accountSelected, setaccountSelected] = useState(false);
  const [openEditAccount, setOpenEditAccount] = useState(false);
  const [openDeleteAccount, setopenDeleteAccount] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const { billerClient, setBillerclient } = useContext(KpaClientContext);
  const [selectedAccount, setselectedAccount] = useState({});
  const [changeCurrent, setchangeCurrent] = useState({});
  const [accountNumPass, setaccountNumPass] = useState({});
  const [addAliaas, setaddAliaas] = useState(false);

  const addBillerAccount = async (values) => {
    setaccountNumPass(values);
    setaddAliaas(true);
    setOpenAccount(false);
  };

  const addAliasforAccount = async (value) => {
    if (isEmpty(accounts)) {
      const data = [
        {
          alias: value.alias,
          customernumber: accountNumPass.customernumber,
          password: accountNumPass.password,
          active: true,
        },
      ];

      KpaStore.storeBillerAccount(data);
      getAccounts();
      setaccountSelected(false);
      setOpenAccount(false);
      setOpenEditAccount(false);
      setopenDeleteAccount(false);
      setaddAliaas(false);
    } else {
      const data = [];

      accounts.forEach((element) => {
        data.push(element);
      });

      data.push({
        alias: value.alias,
        customernumber: accountNumPass.customernumber,
        password: accountNumPass.password,
        active: false,
      });

      KpaStore.storeBillerAccount(data);
      getAccounts();
      setaccountSelected(false);
      setOpenAccount(false);
      setOpenEditAccount(false);
      setopenDeleteAccount(false);
      setaddAliaas(false);
    }
  };

  const deleteAccount = async () => {
    //Verify if the accunts added are valid

    if (!isEmpty(changeCurrent)) {
      const data = [];

      if (changeCurrent.active) {
        Popup.show({
          type: "Danger",
          title: "Cannot delete Active",
          // button: false,
          textBody:
            "Sorry you can not delete the active account switch to a different account then delete",
          buttontext: "Close",
          callback: () => Popup.hide(),
        });

        setaccountSelected(false);
        setOpenAccount(false);
        setOpenEditAccount(false);
        setopenDeleteAccount(false);
        return;
      }

    } else {
      const data = [];

      if (selectedAccount.active) {
        Popup.show({
          type: "Danger",
          title: "Cannot delete Active",
          // button: false,
          textBody:
            "Sorry you can not delete the active account switch to a different account then delete",
          buttontext: "Close",
          callback: () => Popup.hide(),
        });
        setaccountSelected(false);
        setOpenAccount(false);
        setOpenEditAccount(false);
        setopenDeleteAccount(false);
        return;
      }

      accounts.filter((element) => {
        if (element.customernumber === selectedAccount.customernumber) {
          return;
        }

        data.push(element);
      });

      KpaStore.storeBillerAccount(data);
      getAccounts();
      setaccountSelected(false);
      setOpenAccount(false);
      setOpenEditAccount(false);
      setopenDeleteAccount(false);
      
    }
  };

  const handleEdit = () => {
    setaccountSelected(false);
    setOpenAccount(false);
    setOpenEditAccount(true);
    setopenDeleteAccount(false);
  };

  const handleSwitch = () => {
    const data = [];

    accounts.forEach((element) => {
      if (selectedAccount.customernumber === element.customernumber) {
        data.push({
          alias: element.alias,
          customernumber: element.customernumber,
          password: element.password,
          active: true,
        });
        setBillerclient(selectedAccount);
        return;
      }

      data.push({
        alias: element.alias,
        customernumber: element.customernumber,
        password: element.password,
        active: false,
      });
    });

    KpaStore.storeBillerAccount(data);
    getAccounts();
    setaccountSelected(false);
    setOpenAccount(false);
    setOpenEditAccount(false);
    setopenDeleteAccount(false);
  };

  const handleDelete = () => {
    setopenDeleteAccount(true);
    setaccountSelected(false);
    setOpenAccount(false);
    setOpenEditAccount(false);
  };

  const getAccounts = async () => {
    const response = await KpaStore.getBillerAccount();
    setAccounts(response);
  };

  const initiateChangeName = async (value) => {
    if (!isEmpty(changeCurrent)) {
      const data = [];

      accounts.forEach((element) => {
        if (changeCurrent.customernumber === element.customernumber) {
          data.push({
            customernumber: changeCurrent.customernumber,
            password: changeCurrent.password,
            alias: value.alias,
            active: changeCurrent.active,
          });
          return;
        }

        data.push(element);
      });

      KpaStore.storeBillerAccount(data);

      getAccounts();
      setOpenEditAccount(false);
    } else {
      const data = [];

      accounts.forEach((element) => {
        if (selectedAccount.customernumber === element.customernumber) {
          data.push({
            customernumber: selectedAccount.customernumber,
            password: selectedAccount.password,
            alias: value.alias,
            active: selectedAccount.active,
          });
          return;
        }

        data.push(element);
      });

      KpaStore.storeBillerAccount(data);

      getAccounts();
      setOpenEditAccount(false);
    }
  };

  useEffect(() => {
    getAccounts();
  }, []);

  const isEmpty = (obj) => {
    for (var x in obj) {
      return false;
    }
    return true;
  };

  return (
    <Root>
      <Screen
        backgroundImage={backgroundImage}
        tilte={"Access Biller Account"}
        leftIcon={"arrowleft"}
        onBackPress={() => navigation.goBack()}
      >
        <FlatList
          data={accounts}
          keyExtractor={(item) => item.index}
          renderItem={(item) => (
            <BillerAccountItem
              data={item.item}
              name={item.item.alias ? item.item.alias : "No Alias"}
              subtext={item.item.customernumber}
              isActive={
                item.item.customernumber === billerClient.customernumber
                  ? true
                  : false
              }
              icon={"ship-wheel"}
              iconColor={"white"}
              menuIsVisible={true}
              onPress={(selected) => {
                if (selected.customernumber === billerClient.customernumber) {
                  setaccountSelected(true);
                  setchangeCurrent(selected);
                  setselectedAccount({});
                } else {
                  setselectedAccount(selected);
                  setchangeCurrent({});
                  setaccountSelected(true);
                }
              }}
            />
          )}
          ListFooterComponent={
            <BillerAddAccountItem
              icon={"plus"}
              name={"Add KPA Biller Account"}
              iconColor={"white"}
              onPress={() => setOpenAccount(true)}
            />
          }
        />

        {/* Add account bottom view */}

        <BottomModal
          visible={openAccount}
          onTouchOutside={() => {
            setOpenAccount(false);
          }}
          height={0.45}
          width={1}
          onSwipeOut={() => setOpenAccount(false)}
        >
          <TospayIndecator isLoading={isLoading} />
          <ModalContent
            style={{
              flex: 1,
              backgroundColor: "fff",
            }}
          >
            <View style={{}}>
              <View
                style={{
                  justifyContent: "flex-start",
                }}
              >
                <TospayText
                  style={{
                    marginTop: 6,
                    fontSize: 12,
                    color: "#3F4047",
                    marginBottom: 16,
                    marginLeft: 20,
                  }}
                >
                  Enter your KPA Customer number and passcode to add your Kpa
                  agent account
                </TospayText>
              </View>

              <TospayForm
                initialValues={{
                  customernumber: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => addBillerAccount(values)}
              >
                <TospayInputForm
                  name="customernumber"
                  keyboardType="default"
                  isVisible
                  textContentType="username"
                  underlineColor={"red"}
                  placeholder="Customer Number"
                />

                <TospayInputForm
                  icon="lock-open"
                  placeholder="Pass code"
                  isVisible
                  textContentType="password"
                  name="password"
                  isPassword
                />

                <TospaySubmitButton
                  icon={"plus"}
                  title={"Add Account"}
                  height={50}
                  isLoading={false}
                  style={{ marginTop: 26 }}
                />
              </TospayForm>
            </View>
          </ModalContent>
        </BottomModal>

        {/* Selected account bottom view */}

        <BottomModal
          visible={accountSelected}
          onTouchOutside={() => {
            setaccountSelected(false);
          }}
          height={0.3}
          width={1}
          onSwipeOut={() => setaccountSelected(false)}
        >
          <TospayIndecator isLoading={isLoading} />
          <ModalContent
            style={{
              flex: 1,
              backgroundColor: "fff",
            }}
          >
            <View style={{}}>
              <View
                style={{
                  justifyContent: "flex-start",
                }}
              >
                {isEmpty(selectedAccount) ? (
                  <BillerAccountItem
                    name={changeCurrent.alias}
                    subtext={changeCurrent.customernumber}
                    icon={"ship-wheel"}
                    iconColor={"white"}
                    disabled={true}
                  />
                ) : (
                  <BillerAccountItem
                    name={selectedAccount.alias}
                    subtext={selectedAccount.customernumber}
                    icon={"ship-wheel"}
                    iconColor={"white"}
                    disabled={true}
                  />
                )}

                {isEmpty(selectedAccount) ? null : (
                  <View style={{ marginLeft: 16 }}>
                    <KpaButton
                      height={40}
                      title={"Switch to this Account"}
                      onPress={handleSwitch}
                    />
                  </View>
                )}

                <TouchableText
                  name={"Edit/Change alias"}
                  onPress={handleEdit}
                />

                <TouchableText name={"Remove account"} onPress={handleDelete} />
              </View>
            </View>
          </ModalContent>
        </BottomModal>

        {/* Edit Alias bottom view */}

        <BottomModal
          visible={openEditAccount}
          onTouchOutside={() => {
            setOpenEditAccount(false);
          }}
          height={0.35}
          width={1}
          onSwipeOut={() => setOpenEditAccount(false)}
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
              <TospayText>Alias Name</TospayText>
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
                    fontSize: 12,
                    color: "#3F4047",
                    marginBottom: 16,
                    marginLeft: 20,
                  }}
                >
                  Enter New Alias Name
                </TospayText>
              </View>

              <TospayForm
                initialValues={{
                  alias: "",
                }}
                validationSchema={validateAlias}
                onSubmit={(values) => initiateChangeName(values)}
              >
                <TospayInputForm
                  name="alias"
                  keyboardType="default"
                  isVisible
                  textContentType="username"
                  underlineColor={"red"}
                  icon={"account"}
                  placeholder="Alias name"
                />

                <TospaySubmitButton
                  icon={"cloud-upload-outline"}
                  title={"Update"}
                  height={50}
                  isLoading={false}
                  style={{ marginTop: 26 }}
                />
              </TospayForm>
            </View>
          </ModalContent>
        </BottomModal>

        {/* Delete account  bottom view */}

        <BottomModal
          visible={openDeleteAccount}
          onTouchOutside={() => {
            setopenDeleteAccount(false);
          }}
          height={0.35}
          width={1}
          onSwipeOut={() => setopenDeleteAccount(false)}
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
              <TospayText>Delete Account</TospayText>
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
                    fontSize: 12,
                    color: "#3F4047",
                    marginBottom: 16,
                    marginLeft: 20,
                  }}
                >
                  Are you sure you want to delete this biller account
                </TospayText>
              </View>

              <TospayForm
                initialValues={{
                  alias: "",
                }}
                validationSchema={validateAlias}
                onSubmit={(values) => deleteAccount(values)}
              >
                {isEmpty(selectedAccount) ? (
                  <BillerAccountItem
                    name={changeCurrent.alias}
                    subtext={changeCurrent.customernumber}
                    icon={"ship-wheel"}
                    iconColor={"white"}
                    disabled={true}
                  />
                ) : (
                  <BillerAccountItem
                    name={selectedAccount.alias}
                    subtext={selectedAccount.customernumber}
                    icon={"ship-wheel"}
                    iconColor={"white"}
                    disabled={true}
                  />
                )}
                <TospaySubmitButton
                  icon={"delete-forever-outline"}
                  title={"Delete"}
                  height={50}
                  isLoading={false}
                  style={{ marginTop: 26 }}
                />
              </TospayForm>
            </View>
          </ModalContent>
        </BottomModal>

        {/* Add user name on new account creation */}

        <BottomModal
          visible={addAliaas}
          onTouchOutside={() => {
            setaddAliaas(false);
          }}
          height={0.35}
          width={1}
          onSwipeOut={() => setaddAliaas(false)}
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
              <TospayText>Alias Name</TospayText>
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
                    fontSize: 12,
                    color: "#3F4047",
                    marginBottom: 16,
                    marginLeft: 20,
                  }}
                >
                  Add an alias name for this account
                </TospayText>
              </View>

              <TospayForm
                initialValues={{
                  alias: "",
                }}
                validationSchema={validateAlias}
                onSubmit={(values) => addAliasforAccount(values)}
              >
                <TospayInputForm
                  name="alias"
                  keyboardType="default"
                  isVisible
                  textContentType="username"
                  underlineColor={"red"}
                  icon={"account"}
                  placeholder="Alias name"
                />

                <TospaySubmitButton
                  icon={"check"}
                  title={"finish"}
                  height={50}
                  isLoading={false}
                  style={{ marginTop: 26 }}
                />
              </TospayForm>
            </View>
          </ModalContent>
        </BottomModal>
      </Screen>
    </Root>
  );
}
