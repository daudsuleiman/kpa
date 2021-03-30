import * as SecureStore from "expo-secure-store";

const key = "clientKey";

const storeBillerAccount = async (account) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(account));
  } catch (error) {
    console.log("failed to save biller account", error);
  }
};

const getBillerAccount = async () => {
  try {
    const account = await SecureStore.getItemAsync(key);
    return JSON.parse(account);
  } catch (error) {
    console.log("Failed to get items");
  }
};

const deleteBillerAccount = async () => {
  try {
    SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("failed to delete item");
  }
};

export default {
  getBillerAccount,
  storeBillerAccount,
  deleteBillerAccount,
};
