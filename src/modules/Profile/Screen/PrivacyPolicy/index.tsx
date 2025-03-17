import React from "react";
import { useTailwind } from "tailwind-rn";
import { SafeAreaView } from "react-native";
import { Webview } from "@app/components";
import Config from "@app/config";

export const PrivacyPolicyScreen = () => {
  const tailwind = useTailwind();
  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <Webview source={{ uri: Config.PRIVACY_POLICY_URL }} />
    </SafeAreaView>
  );
};
