import React, { Fragment, PropsWithChildren } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import { ProfileHeader } from "../ProfileHeader";
import { ProfileLayoutProps } from "./type";
import { useTailwind } from "tailwind-rn";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export const ProfileLayout: React.FC<PropsWithChildren<ProfileLayoutProps>> = ({
  header,
  children,
}) => {
  const tailwind = useTailwind();
  return (
    <Fragment>
      <StatusBar backgroundColor="white" barStyle='dark-content' />
      <SafeAreaView style={tailwind("flex-1")}>
        <ProfileHeader header={header} />
        <KeyboardAwareScrollView
          style={tailwind("p-6")}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={tailwind("flex-1")}>{children}</View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Fragment>
  );
};
