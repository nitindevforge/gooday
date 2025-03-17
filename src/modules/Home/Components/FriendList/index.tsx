import { Typography } from "@app/ui";
import React, { } from "react";
import { FlatList, Image, ScrollView, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { CreateEventModal, HomeNavigationParamList, useGetMyTodayAvailableFriends, useGetUser } from "@app/modules";
import { getAssetUrl } from "@app/utils";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabsNavigatorList } from "src/navigation/BottomTabsNavigator/type";
import clsx from "clsx";
import NiceModal from "@ebay/nice-modal-react";
import { shadowStyles } from '../../../Auth/Utils/Styles/shadow';

export const FriendList = () => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NativeStackNavigationProp<BottomTabsNavigatorList & HomeNavigationParamList>>();
  const { data: friends } = useGetMyTodayAvailableFriends();
  const { data } = useGetUser();
  const STAFFS = Array.from({ length: 4 }, (_, i) => ({
    image: i + 1,
  }))
  const staffImages = {
    "1": require("../../../../assets/Images/staff0.png"),
    "2": require("../../../../assets/Images/staff1.png"),
    "3": require("../../../../assets/Images/staff2.png"),
    "4": require("../../../../assets/Images/staff3.png"),
  };
  const staffNames = {
    "1": 'Catherine',
    "2": 'Dom',
    "3": 'Sarah',
    "4": 'Louis',
  };
  return (
    <View style={{ rowGap: 15 }}>
      <Typography variant="17" className="px-6" weight="semibold">
        Friends Free Today
      </Typography>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          tailwind('px-6'),
          { flexDirection: 'row', alignItems: 'flex-start', gap: 12 }
        ]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("ACCOUNT_SETTING", {
            screen: 'ACCOUNT',
          } as any)}
          style={[tailwind('flex items-center justify-center'), { width: 72 }]}
        >
          <View style={shadowStyles.touchableContainer}>
            <Image
              source={{ uri: getAssetUrl(data?.data?.data.profile) }}
              style={shadowStyles.roundedBox}
              resizeMode="cover"
              defaultSource={require("../../../../assets/Images/profile.png")}
            />
          </View>
          <View style={[tailwind('flex-row items-center'), { gap: 4 }]}>
            <View style={tailwind(clsx({
              "bg-success w-2.5 h-2.5 rounded-full": data?.data?.data?.hangout === true,
              "bg-error w-2.5 h-2.5 rounded-full": !data?.data?.data?.hangout
            }))} />
            <Typography numberOfLines={1} weight="medium" className="text-center">
              {data?.data?.data?.hangout ? 'Available' : 'Unavailable'}
            </Typography>
          </View>
        </TouchableOpacity>
        <FlatList
          scrollEnabled={false}
          data={friends?.data?.data?.length ? friends?.data?.data : STAFFS}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={tailwind("mx-2")} />}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                disabled={!friends?.data?.data?.length}
                onPress={() => {
                  NiceModal?.show(CreateEventModal, { userId: item?._id });
                }}
                style={[tailwind('flex items-center justify-center'), { width: 72, opacity: !friends?.data?.data?.length ? 0.5 : 1 }]}
              >
                <View style={shadowStyles.touchableContainer}>
                  <Image
                    source={item.image ? staffImages[item.image] : { uri: getAssetUrl(item.profile) }}
                    style={shadowStyles.roundedBox}
                    resizeMode="cover"
                    defaultSource={require("../../../../assets/Images/profile.png")}
                  />
                </View>

                <Typography numberOfLines={1} weight="medium" className="text-center">
                  {staffNames[item.image] || item.nickName || item.firstName}
                </Typography>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item?._id?.toString()!}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("PROFILE", {
            screen: 'PROFILE_PAGE',
            params: {
              tab: 'Friends'
            }
          } as any)}
          activeOpacity={0.8}
          style={[tailwind('flex items-center justify-center'), { width: 72 }]}
        >
          <Image
            source={require("../../../../assets/Images/search.png")}
            style={{
              height: 72,
              width: 72,
              borderRadius: 100,
            }}
            resizeMode="cover"
            defaultSource={require("../../../../assets/Images/profile.png")}
          />
          <Typography numberOfLines={1} weight="medium" className="text-center">
            Search friends
          </Typography>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
