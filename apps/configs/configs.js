import { Platform } from "react-native";
import colors from "./colors";
export default {
  colors,
  text: {
    color: colors.primary,
    fontSize: Platform.OS === "ios" ? 22 : 20,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    paddingTop: Platform.OS === "ios" ? 2 : 0,
  },
};