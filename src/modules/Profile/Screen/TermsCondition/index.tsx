import React from "react";
import { SafeAreaView } from "react-native";
import { useTailwind } from "tailwind-rn";
import Config from "@app/config";
import { Webview } from "@app/components";

export const TermsConditionScreen = () => {
  const tailwind = useTailwind();
  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <Webview allowsBackForwardNavigationGestures source={{ uri: Config.TERMS_CONDITION_PAGE_URL }} />
    </SafeAreaView>
  );
};
