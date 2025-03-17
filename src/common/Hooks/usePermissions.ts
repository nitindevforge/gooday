import { Platform } from "react-native";
import {
  checkMultiple,
  Permission,
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from "react-native-permissions";

export const usePermissions = () => {
  const permission = Platform.select({
    android: [PERMISSIONS.ANDROID.CAMERA],
    ios: [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY],
  }) as Permission[];

  const getResponse = (response: any) => {
    return Platform.select({
      android: response[PERMISSIONS.ANDROID.CAMERA],
      ios: response[(PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY)],
    });
  };

  const requestPermissions = async () => {
    const response = await requestMultiple(permission);
    return getResponse(response);
  };

  const checkPermissions = async () => {
    const response = await checkMultiple(permission);
    return getResponse(response);
  };

  return { requestPermissions, checkPermissions,RESULTS };
};
