import { Button, Loading } from "@app/ui";
import React, { useEffect } from "react";
import { Image, StatusBar, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  useGetUser,
  AuthDefaultLayout,
  AuthNavigationParamList,
  BottomSheet,
  USER_BY_ID,
} from "@app/modules";
import NiceModal from "@ebay/nice-modal-react";
import { useNavigationRoute } from "@app/common";

const AuthSelectionScreen = () => {
  const tailwind = useTailwind();
  const { data } = useGetUser(USER_BY_ID);
  const { hideModel } = useNavigationRoute();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthNavigationParamList>>();

  useEffect(() => {
    if (
      data?.data?.data?.pendingAction &&
      data?.data?.data?.pendingAction?.length > 0
    ) {
      NiceModal.show(BottomSheet, {
        pendingActions: data?.data?.data?.pendingAction,
      });
    }
  }, [data]);
  return hideModel ? (
    <Loading loading={true} />
  ) : (
    <AuthDefaultLayout hideProgress>
      <StatusBar backgroundColor="#FECB4D" />
      <View style={tailwind("flex-1")}>
        <View style={tailwind("flex-1 items-center justify-center")}>
          <Image
            style={{ height: 272, width: 272 }}
            source={require("../../../../assets/Images/logo.png")}
          />
        </View>
        <View style={tailwind("flex-1 justify-center")}>
          <Button
            color="white"
            onPress={() => navigation.navigate("ROLE", { authType: "SIGNIN" })}
            title="Sign In"
          />
          <Button
            color="white"
            onPress={() => navigation.navigate("ROLE", { authType: "SIGNUP" })}
            className="mt-5"
            title="Create an account"
          />
        </View>
      </View>
    </AuthDefaultLayout>
  );
};

export default AuthSelectionScreen;
