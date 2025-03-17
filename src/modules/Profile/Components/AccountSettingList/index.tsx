import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useMemo, useState } from "react";
import { ProfileNavigationStackParamList } from "../../Navigation/type";
import { Alert, View } from "react-native";
import { NavigationLink, NavigationLinkItem, PermissionToggle } from "@app/components";
import { RootNavigationParamList } from "@app/navigation";
import { useLogout } from "@app/common";
import { useAccountDeleteMutation, useGetUser, useHangoutMutation } from "@app/modules";
import { Loading } from "@app/ui";

export const AccountSettingList = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<
        ProfileNavigationStackParamList & RootNavigationParamList
      >
    >();

  const { userLogout } = useLogout();
  const { data, refetch } = useGetUser();
  const { mutate: deleteAccountMutate, isLoading } = useAccountDeleteMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate, isLoading: isHangoutLoading } = useHangoutMutation();
  const AccountSettingItems: NavigationLinkItem[] = useMemo(() => {
    const output: NavigationLinkItem[] = [
      {
        label: "Change password",
        onNavigate() {
          navigation.navigate("CHANGE_PASSWORD");
        },
      },
      {
        label: "Email",
        value: data?.data.data.email || "-",
        helperText: "This email is linked to your account",
      },
      {
        label: "Phone number",
        value: data?.data.data.mobileNumber || "-",
        helperText: data?.data.data.mobileNumber
          ? "This phone number is linked to your account"
          : undefined,
      },
      // {
      //   label: "Sign out everywhere",
      //   helperText: `This will log out you of Gooday everywhere you're logged in. If you believe your account has been compromised, we recommend you change your password.`,
      //   onNavigate() {
      //     Alert.alert("Feature coming soon!!");
      //   },
      // },
      {
        label: "Deactivate account",
        onNavigate() {
          navigation.navigate("DEACTIVATE_ACCOUNT");
        },
      },
      {
        label: "Delete account",
        onNavigate: () => {
          Alert.alert("Are you sure you want to delete your account?", "", [
            {
              isPreferred: true,
              text: "Cancel",
            },
            {
              text: "Delete",
              onPress: () => {
                deleteAccountMutate(undefined, {
                  onSuccess: async (data) => {
                    setLoading(true);
                    await userLogout(() => {
                      setLoading(false);
                      navigation.replace("AUTH");
                    });
                  },
                });
              },
            },
          ]);
        },
      },
      {
        label: "Log out",
        onNavigate: () => {
          Alert.alert(
            "Are you sure want to log out?",
            "You will be returned to the login screen.",
            [
              {
                isPreferred: true,
                text: "Cancel",
              },
              {
                text: "Log out",
                onPress: async () => {
                  setLoading(true);
                  await userLogout(() => {
                    setLoading(false);
                    navigation.replace("AUTH");
                  });
                },
              },
            ]
          );
        },
      },
    ];

    return output;
  }, []);

  return (
    <View style={{ gap: 30 }}>
      <Loading loading={loading || isLoading || isHangoutLoading} />
      <PermissionToggle
        label="Hangout"
        isEnabled={data?.data?.data?.hangout!}
        onChange={(value) => {
          mutate({ hangout: value }, {
            onSuccess: () => {
              refetch()
            }
          })
        }}
      />
      {AccountSettingItems.map((element) => (
        <NavigationLink {...element} key={element.label} />
      ))}
    </View>
  );
};
