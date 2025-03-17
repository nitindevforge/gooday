import { Header } from "@app/modules";
import React, { Fragment } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { DelegatedListContainer } from "../../Containers";
import { useIsFocused } from "@react-navigation/native";

export const DelegatedListScreen = () => {
  const tailwind = useTailwind();
  const isFocused = useIsFocused();

  return (
    <Fragment>
      {isFocused && <StatusBar backgroundColor="white" barStyle='dark-content' />}
      <SafeAreaView style={[tailwind("flex-1")]}>
        <Header showLogo showDate />
        <View style={[tailwind("px-6 mt-4 flex-1")]}>
          <DelegatedListContainer />
        </View>
      </SafeAreaView>
    </Fragment>
  );
};
