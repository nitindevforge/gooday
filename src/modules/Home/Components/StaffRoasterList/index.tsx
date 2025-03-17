import { Icon, Typography } from "@app/ui";
import React, { useMemo } from "react";
import { FlatList, Image, ScrollView, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { HomeNavigationParamList, useGetBusinessStaffs } from "@app/modules";
import { getAssetUrl } from "@app/utils";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabsNavigatorList } from "src/navigation/BottomTabsNavigator/type";
import { shadowStyles } from '../../../Auth/Utils/Styles/shadow';
import { BusinessStaffsResponseDTO } from "@gooday_corp/gooday-api-client";
import { AxiosResponse } from "axios";

export const StaffRoasterList = () => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NativeStackNavigationProp<BottomTabsNavigatorList & HomeNavigationParamList>>();
  const { data } = useGetBusinessStaffs();

  const staffs = useMemo(() => {
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
  const STAFFS = Array.from({ length: 4 }, (_, i) => ({
    image: i + 1,
  }))
  const staffImages = {
    "1": require("../../../../assets/Images/staff0.png"),
    "2": require("../../../../assets/Images/staff1.png"),
    "3": require("../../../../assets/Images/staff2.png"),
    "4": require("../../../../assets/Images/staff3.png"),
  };
  return (
    <View style={{ rowGap: 15 }}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[tailwind('flex-row px-6'), { gap: 6 }]}
        onPress={() => navigation.navigate('STAFF_ROSTER')}
      >
        <Typography variant="17" weight="semibold">
          Staff Roster
        </Typography>
        <Icon
          name="back"
          width={14}
          height={14}
          stroke="none"
          style={{
            transform: [{
              rotate: '180deg'
            }]
          }}
        />
      </TouchableOpacity>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          tailwind('px-6'),
          { flexDirection: 'row', alignItems: 'flex-start', gap: 12 }
        ]}>
        <FlatList
          scrollEnabled={false}
          data={staffs?.length ? staffs.slice(0, 10) : STAFFS}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={tailwind("mx-2")} />}
          renderItem={({ item }) => {

            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                }}
                disabled
                style={[tailwind('flex items-center justify-center'), { width: 72, opacity: !staffs?.length ? 0.5 : 1 }]}
              >
                <View style={shadowStyles.touchableContainer}>
                  <Image
                    source={item?.image ? staffImages[item.image] : { uri: getAssetUrl(item?.profilePicture) }}
                    style={shadowStyles.roundedBox}
                    resizeMode="cover"
                    defaultSource={require("../../../../assets/Images/profile.png")}
                  />
                  <Typography numberOfLines={1} weight="medium" className="text-center">
                    {item.firstName}
                  </Typography>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(_, index) => index?.toString()!}
        />
      </ScrollView>
    </View>
  );
};
