import React from "react";
import {
  Header,
  HomeNavigationParamList,
  useWaitList,
  WaitListForm,
} from "@app/modules";
import { SafeAreaView, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Loading } from "@app/ui";
import { RouteProp, useRoute } from "@react-navigation/native";

export const WaitListContainer: React.FC = () => {
  const { form, isLoading } = useWaitList();
  const tailwind = useTailwind();
  const { params } = useRoute<RouteProp<HomeNavigationParamList, "WAITLIST">>();

  const name = params?.name ?? "";

  return (
    <>
      <Loading loading={isLoading} />
      <SafeAreaView style={tailwind("flex-1")}>
        <Header showWether={false} />
        <View style={tailwind("px-6 flex-1")}>
          <WaitListForm form={form} isLoading={isLoading} name={name} />
        </View>
      </SafeAreaView>
    </>
  );
};
