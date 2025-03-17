import {
  AuthNavigationParamList,
  BottomSheet,
  getDeviceInfo,
  Role,
  setUserItem,
  useAppleLoginBusinessMutation,
  useAppleLoginMutation,
  useBusinessGoogleLoginMutation,
  useDeviceMutation,
  useGoogleLoginMutation,
} from "@app/modules";
import { ApiClient } from "@app/api";
import NiceModal from "@ebay/nice-modal-react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootNavigationParamList } from "@app/navigation";
import { Alert } from "react-native";
import appleAuth from "@invertase/react-native-apple-authentication";
import { getBriefing } from "@app/utils";

export const useLoginOptions = () => {
  const { mutate: userLogin, isLoading: isUserLoading } =
    useGoogleLoginMutation();

  const { mutate: businessLogin, isLoading: isBusinessLoading } =
    useBusinessGoogleLoginMutation();
  const { mutate: appleLogin, isLoading: isAppleLoading } =
    useAppleLoginMutation();
  const { mutate: appleBusinessLogin, isLoading: isAppleBusinessLoading } =
    useAppleLoginBusinessMutation();

  const { mutate: deviceAdd } = useDeviceMutation();

  const { params } =
    useRoute<RouteProp<AuthNavigationParamList, "LOGIN" | "AUTH_OPTIONS">>();

  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootNavigationParamList>>();
  const authNavigation =
    useNavigation<NativeStackNavigationProp<AuthNavigationParamList>>();

  // loginWithApple
  const loginWithGoogle = async () => {
    try {
      const userInfo = await ApiClient.Google.googleSignIn();
      const loginMutate =
        params?.role === Role.BUSINESS ? businessLogin : userLogin;

      if (userInfo?.data?.idToken) {
        loginMutate(
          { token: userInfo?.data?.idToken! },
          {
            onSuccess: async (data) => {
              await setUserItem(data.data.data);
              const deviceInfo = await getDeviceInfo();
              deviceAdd({
                ...deviceInfo,
                version: String(deviceInfo?.version),
              });
              const briefing = await getBriefing();
              if (data?.data?.data?.user?.pendingAction?.length) {
                NiceModal.show(BottomSheet, {
                  pendingActions: data?.data?.data?.user?.pendingAction,
                });
              } else {
                // briefing ? rootNavigation.replace("DAILY_BRIEFING_CHAT") : rootNavigation.replace("APP");
                rootNavigation.replace("APP");
              }
            },
            onError: async (error) => {
              Alert.alert("Error", error.response?.data?.message ?? "");
            },
          }
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message ??
        error.message ??
        "Something went wrong!!!"
      );
    }
  };

  // loginWithEmail
  const loginWithEmail = () => {
    if (params?.authType === "SIGNUP") {
      if (params?.role === Role.BUSINESS) {
        authNavigation.navigate("BUSINESS_SIGN_UP", { role: params?.role });
      } else {
        authNavigation.navigate("SIGN_UP", { role: params?.role });
      }
    } else {
      authNavigation.navigate("LOGIN", { role: params?.role });
    }
  };

  // loginWithApple
  const loginWithApple = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      const loginMutate =
        params?.role === Role.BUSINESS ? appleBusinessLogin : appleLogin;
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        loginMutate(
          {
            token: appleAuthRequestResponse.authorizationCode!,
            firstName: appleAuthRequestResponse.fullName?.givenName!,
            lastName: appleAuthRequestResponse.fullName?.familyName!,
          },
          {
            onSuccess: async (data) => {
              await setUserItem(data.data.data);
              const deviceInfo = await getDeviceInfo();
              deviceAdd({
                ...deviceInfo,
                version: String(deviceInfo?.version),
              });
              if (data?.data?.data?.user?.pendingAction?.length) {
                NiceModal.show(BottomSheet, {
                  pendingActions: data?.data?.data?.user?.pendingAction,
                });
              } else {
                rootNavigation.replace("APP");
              }
            },
            onError: async (error) => {
              Alert.alert(
                "Error",
                error.response?.data?.message || "Something went wrong!!"
              );
            },
          }
        );
      }
    } catch (error) {
      if (error && error.response?.data?.message) {
        Alert.alert("Error", error.response?.data?.message ?? "");
      }
    }
  };
  return {
    loginWithGoogle,
    isGoogleLoading: isUserLoading || isBusinessLoading,
    loginWithEmail,
    loginWithApple,
    isAppleLoading: isAppleBusinessLoading || isAppleLoading,
  };
};
