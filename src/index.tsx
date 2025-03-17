// In App.js in a new project

import React, { useEffect } from "react";
import { AppNavigation } from "@app/navigation";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-native-url-polyfill/auto";
// import messaging from "@react-native-firebase/messaging";
import { Appearance, LogBox, Platform } from "react-native";
import { PERMISSIONS, request } from "react-native-permissions";
import { ApiClient } from "./api";
import { StripeProvider } from "@stripe/stripe-react-native";
import Config from "react-native-config";
import { onDisplayNotification } from "./utils";
// import crashlytics from "@react-native-firebase/crashlytics";
import Purchases from "react-native-purchases";
import { Typography } from "./ui";

export const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // LogBox.ignoreAllLogs()
    // ApiClient.Google.configuration();
    (async () => {
      await Appearance.setColorScheme("light");

      // const res = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      // const authStatus = await messaging().requestPermission();
      // console.log('authStatus', authStatus)
      // const enabled =
      //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    })();
    // const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    //   await onDisplayNotification(remoteMessage);
    // });
    // return unsubscribe;
  }, []);

  useEffect(() => {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.ERROR);
    if (Platform.OS === "android") {
      Purchases.configure({ apiKey: "goog_YRnNrioImEeugAFsISaeBlvcDQa" });
    } else {
      Purchases.configure({ apiKey: "appl_soiwpdKjWHmgisuuuoMBTKhCMwp" });
    }

    // crashlytics();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      {/* <KeyboardProvider> */}
      <StripeProvider
        publishableKey={Config.STRIPE_KEY ?? ""}
        merchantIdentifier="merchant.com.gooday.main"
      >
        <AppNavigation />
      </StripeProvider>
      {/* </KeyboardProvider> */}
    </QueryClientProvider>
  );
};

export default App;
