import React, { Fragment } from "react";
import { ProfileLayout } from "../../Components";
import { AvatarOptions, useAvatar, useGetUser } from "@app/modules";
import { useNavigation } from "@react-navigation/native";
import { Loading } from "@app/ui";
import { StatusBar } from "react-native";

export const ChangePersonalAssistantScreen = () => {
  const navigation = useNavigation();
  const { refetch } = useGetUser();
  const { form, isLoading } = useAvatar({
    onSuccess: () => {
      refetch();
      navigation.goBack();
    },
  });

  return (
    <Fragment>
      <Loading loading={isLoading} />
      <StatusBar barStyle="dark-content" />
      <ProfileLayout header="Choose Your Personal Assistant">
        <AvatarOptions form={form} isLoading={isLoading} />
      </ProfileLayout>
    </Fragment>
  );
};
