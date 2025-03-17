import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { RootNavigation } from "@app/navigation";
import utilities from "../../../tailwind.json";
import { TailwindProvider } from "tailwind-rn";
import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import NiceModal from "@ebay/nice-modal-react";
import { NavigationRouteProvider } from "@app/common";
import { useInAppSubscription } from "@app/modules";
import { LoadingUi } from "@app/ui";

export const AppNavigation: React.FC = () => {
  useInAppSubscription();

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#FFFFFF",
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <NavigationRouteProvider>
        <TailwindProvider colorScheme={"dark"} utilities={utilities}>
          <NiceModal.Provider>
            <RootNavigation />
            <LoadingUi />
          </NiceModal.Provider>
        </TailwindProvider>
      </NavigationRouteProvider>
    </NavigationContainer>
  );
};
