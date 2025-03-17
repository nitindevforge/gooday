import React, { useMemo, useState } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import {
  ActiveDay,
  Header,
  StaffList,
  useGetBusinessStaffs,
} from "@app/modules";
import { Calendar, Icon, Loading, Tooltip, Typography } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { BusinessStaffsResponseDTO } from "@gooday_corp/gooday-api-client";
import { AxiosResponse } from "axios";

export const StaffRosterContainer = () => {
  const tailwind = useTailwind();
  const [showTip, setShowTip] = useState<Boolean>(false);
  const [today, setToday] = useState<Date>(new Date());
  const { data, isLoading } = useGetBusinessStaffs();

  const changeDate = (date: Date) => {
    setToday(date);
  };

  const staff = useMemo(() => {
    return (
      data?.pages?.reduce(
        (
          acc: BusinessStaffsResponseDTO["data"],
          page: AxiosResponse<BusinessStaffsResponseDTO>
        ) => {
          return [...(acc ?? []), ...(page?.data?.data ?? [])];
        },
        []
      ) || []
    );
  }, [data]);

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <Loading loading={isLoading} />
      <Header showLogo />
      <View style={tailwind("px-6 flex-1")}>
        <View>
          <Typography weight="medium" variant="2xl">
            Staff Roster
          </Typography>
          <View style={tailwind("flex-row items-end justify-between mt-4")}>
            <ActiveDay today={today} />
            {/* <View style={[tailwind("flex-row items-end"), { columnGap: 8 }]}>
              <TouchableOpacity
                onPress={() => setShowTip(!showTip)}
                activeOpacity={0.8}
              >
                <Icon name="info" width={20} height={20} stroke="none" />
              </TouchableOpacity>
              <Icon name="circle-dots" width={20} height={20} stroke="none" />
            </View> */}
          </View>

          {/* <Tooltip
            showTip={showTip}
            massage="Staff rosters can be updated and viewed in detail using your desktop dashboard"
            styles={{ maxWidth: 300 }}
            onClose={() => setShowTip(false)}
            className="top-20 right-11 z-50"
          /> */}
        </View>
        <View style={tailwind("mt-4")}>
          <Calendar
            view="weekly"
            variant="primary"
            date={today}
            onPress={changeDate}
          />
        </View>
        <View style={[tailwind("mt-8 flex-1"), { gap: 20 }]}>
          <Typography weight="medium" variant="2xl">
            Working today
          </Typography>
          <StaffList staff={staff} today={today} />
        </View>
      </View>
    </SafeAreaView>
  );
};
