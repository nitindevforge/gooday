import React, { Fragment } from "react";
import {
  AuthDefaultLayout,
  InAppSubscriptions,
  useGetUser,
  useUserOnboardingMutation,
} from "@app/modules";
import { Alert, StatusBar, TouchableOpacity, View } from "react-native";
import { useNavigationRoute } from "@app/common";
import { UserPlanDTO } from "@gooday_corp/gooday-api-client";
import { Typography } from "@app/ui";

const Plans: React.FC = () => {
  const { setPendingAction, setCurrentRoute, setCanBackGo, goToRoute } =
    useNavigationRoute();
  const { refetch } = useGetUser();
  const { mutate } = useUserOnboardingMutation();

  const onAction = (response: UserPlanDTO) => {
    mutate(
      {
        plan: response,
      },
      {
        onSuccess: (response) => {
          setPendingAction(response?.data?.data?.pendingAction!);
          setCurrentRoute(response?.data?.data?.pendingAction?.[0]!);
          setCanBackGo(false);
          refetch();
          if (!response?.data?.data?.pendingAction?.length) {
            goToRoute()
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
  };
  return (
    <Fragment>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />

      <AuthDefaultLayout className="bg-white" header="Choose your plan">
        <View style={{ gap: 10, flex: 1 }}>
          <InAppSubscriptions action={onAction} />
        </View>
      </AuthDefaultLayout>
    </Fragment>
  );
};

export default Plans;
