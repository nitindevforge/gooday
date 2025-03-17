import { getMessaging } from "@react-native-firebase/messaging";
import { Platform } from "react-native";
import { getDeviceName, getUniqueId } from "react-native-device-info";
export const getDeviceInfo = async () => {
  const token = await getMessaging().getToken();
  const uniqueId = await getUniqueId();
  const deviceName = await getDeviceName();
  return {
    name: deviceName,
    os: Platform.OS === "android" ? "android" : "ios",
    version: Platform.Version,
    identifier: uniqueId,
    token: token,
  };
};
