import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useMemo } from "react";
import { ProfileNavigationStackParamList } from "../../Navigation/type";
import { NavigationLink, NavigationLinkItem } from "@app/components";
import { View } from "react-native";
import { useGetUser } from "@app/modules";

export const ProfilePolicyList = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileNavigationStackParamList>>();
  const { data: user } = useGetUser();

  const ProfilePolicyListItem: NavigationLinkItem[] = useMemo(() => {
    return [
      {
        label: "Manage Subscriptions",
        onNavigate() {
          navigation.navigate("MANAGE_SUBSCRIPTION");
        },
      },
      user?.data?.data?.plan?.name !== "Free" && {
        label: "Sync Calendar",
        onNavigate() {
          navigation.navigate("SYNC_CALENDAR");
        },
      },
      {
        label: "Privacy Policy",
        onNavigate() {
          navigation.navigate("PRIVACY_POLICY");
        },
      },
    ]?.filter((el) => el);
  }, [user]);

  return (
    <View style={{ gap: 30 }}>
      {ProfilePolicyListItem.map((element) => (
        <NavigationLink {...element} key={element.label} />
      ))}
    </View>
  );
};
