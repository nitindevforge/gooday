import React, { Fragment } from "react";
import { ProfileLayout } from "../../Components";
import { Button, Loading, Typography } from "@app/ui";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useLogout } from "@app/common";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootNavigationParamList } from "@app/navigation";
import { useAccountDeactivateMutation } from "@app/modules";

export const DeactivateAccountContainer = () => {
  const tailwind = useTailwind();
  const { userLogout, isLoading } = useLogout();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootNavigationParamList>>();
  const { mutate, isLoading: isDeletedLoading } =
    useAccountDeactivateMutation();

  const handleDeactivateAccount = () => {
    mutate(undefined, {
      onSuccess: async () => {
        await userLogout(() => navigation.replace("AUTH"));
      },
    });
  };

  return (
    <Fragment>
      <ProfileLayout header="Deactivate account">
        <Typography variant="xl" weight="medium">
          Are you sure?
        </Typography>
        <Typography variant="base" weight="regular">
          Once you deactivate your account, all of your account data will be
          lost.
        </Typography>

        <View style={tailwind("mt-16")}>
          <Button
            disabled={isLoading || isDeletedLoading}
            title="Deactivate account"
            onPress={handleDeactivateAccount}
          />
        </View>
      </ProfileLayout>
    </Fragment>
  );
};
