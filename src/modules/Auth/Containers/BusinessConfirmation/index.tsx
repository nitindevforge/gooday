import React, { useEffect, useRef, useState } from "react";
import {
  AuthDefaultLayout,
  AuthNavigationParamList,
  useBusinessMe,
} from "@app/modules";
import { useTailwind } from "tailwind-rn";
import { ScrollView, View } from "react-native";
import {
  ActivityTracker,
  ActivityTrackerState,
  Button,
  Icon,
  Typography,
} from "@app/ui";
import { useLogout, useNavigationRoute } from "@app/common";
import clsx from "clsx";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const activitiesData: ActivityTrackerState[] = [
  {
    title: "Profile under review",
    completed: true,
    active: true,
  },
  {
    title: "Gooday team provided demo",
    completed: true,
    active: true,
  },
  {
    title: "Gooday profile completed!",
    completed: false,
  },
];

const statusIndex = {
  PENDING: 0,
  QUOTE_REQUESTED: 1,
  VERIFIED: 2,
};

export const BusinessConfirmationContainer: React.FC = () => {
  const tailwind = useTailwind();
  const { data } = useBusinessMe();
  const { isLoading: isLogoutLoading, userLogout } = useLogout();
  const status = data?.data.data.status;
  const [activityStatus, setActivityStatus] = useState<ActivityTrackerState[]>(
    []
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthNavigationParamList>>();
  const { goToRoute } = useNavigationRoute();
  const scrollRef = useRef<ScrollView>(null);

  const onConfirm = async () => {
    if (status === "VERIFIED") {
      goToRoute();
    } else {
      await userLogout(() => navigation.navigate("AUTH_SELECTION"));
    }
  };

  useEffect(() => {
    const updateStatus = activitiesData?.map((el, index) => ({
      ...el,
      active: statusIndex[status!] >= index,
      completed: statusIndex[status!] >= index,
    }));
    setActivityStatus(updateStatus);
  }, [status, activitiesData]);

  return (
    <AuthDefaultLayout back={false} className="bg-white" header=" ">
      <View style={tailwind("flex-1")}>
        <View style={tailwind("flex-1")}>
          <View>
            <Typography variant="xl" weight="medium">
              Profile Saved! We're Almost There.
            </Typography>
            <Typography variant="base" className="mt-3">
              A member of the Gooday team will reach out within{" "}
              <Typography weight="semibold">24 hours</Typography> to provide you
              demo of Gooday based on your business needs.
            </Typography>
          </View>
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={[
              tailwind("items-start justify-center"),
              { flexGrow: 1 },
            ]}
            showsVerticalScrollIndicator={false}
          >
            <ActivityTracker
              scrollElement={scrollRef}
              data={activityStatus}
              activityComponent={CustomActivityCard}
              componentStyle={tailwind("pb-10 justify-center")}
              hideCompletedLine={true}
            />
          </ScrollView>
        </View>
        <View style={[{ gap: 16 }, tailwind("mb-4")]}>
          <Typography variant="base" weight="regular" className="text-center">
            If you have any urgent questions, feel free to contact us at{" "}
            <Typography weight="bold">info@gooday.com.au</Typography>{" "}
          </Typography>
          <Button
            loading={isLogoutLoading}
            onPress={onConfirm}
            title="Confirm"
          />
        </View>
      </View>
    </AuthDefaultLayout>
  );
};

const CustomActivityCard: React.FC<{
  rowData: ActivityTrackerState;
  index: number;
}> = ({ rowData, index }) => {
  const tailwind = useTailwind();
  const { title, active } = rowData;
  return (
    <View style={[tailwind("flex-row items-start justify-center")]}>
      <View
        style={tailwind(
          clsx(
            "w-16 h-16 flex items-center justify-center border-2 rounded-full border-primary-100",
            {
              "bg-primary-200 border-primary-200": active,
            }
          )
        )}
      >
        {active && (
          <Icon name="check-mark" width={29} height={26} fill="white" />
        )}
      </View>
      <View style={tailwind("absolute left-20 -top-1 max-w-[120px]")}>
        <Typography weight="medium" color="black">
          {`Step ${index + 1}:`}
        </Typography>
        <Typography weight="medium" color="black">
          {title}
        </Typography>
      </View>
    </View>
  );
};
