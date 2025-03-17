import React, { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import {
  FriendsContainer,
  Header,
  ProfileCard,
  ProfileDetails,
  ProfileNavigationStackParamList,
  TabBar,
  useAssistantMe,
  useGetFriends,
  useGetUser,
} from "@app/modules";
import { Loading } from "@app/ui";
import { FriendsDTO } from "@gooday_corp/gooday-api-client";
import { AxiosResponse } from "axios";
import { RouteProp, useFocusEffect, useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const ProfileScreen = () => {
  const tailwind = useTailwind();
  const isFocused = useIsFocused();
  const { params } =
    useRoute<RouteProp<ProfileNavigationStackParamList, "PROFILE_PAGE">>();
  const navigation = useNavigation<NativeStackNavigationProp<ProfileNavigationStackParamList, "PROFILE_PAGE">>();
  const { data, isLoading: isUserLoading } = useGetUser();
  const { data: assistant, isLoading: isAssistantLoading } = useAssistantMe();
  const [active, setActive] = useState<string>("Profile");
  const [search, setSearch] = useState<string>("");
  const {
    data: friendsData,
    fetchNextPage,
    isLoading: isFriendsLoading,
    isRefetching,
  } = useGetFriends(search);

  useFocusEffect(
    useCallback(() => {
      if (params?.tab) {
        setActive(params.tab);
      }
    }, [params?.tab])
  );

  useEffect(() => {
    const unsubscribeBlur = navigation.addListener("blur", () => {
      navigation.setParams({ tab: '' })
    });

    return unsubscribeBlur;
  }, [navigation]);
  const friends = useMemo(() => {
    return friendsData?.pages?.reduce(
      (acc: FriendsDTO["data"], page: AxiosResponse<FriendsDTO>) => {
        return [...(acc ?? []), ...(page?.data?.data ?? [])];
      },
      []
    );
  }, [friendsData]);

  const isLoading = isUserLoading || isAssistantLoading || isFriendsLoading;

  return (
    <Fragment>
      {isFocused && <StatusBar backgroundColor="#FEB74D" />}
      <Loading loading={isLoading} />
      <View style={[tailwind("flex-1")]}>
        <ImageBackground
          source={require("../../../../assets/Images/profile-bg.png")}
          style={{ width: "100%", height: 151 }}
          resizeMode="cover"
        >
          <SafeAreaView>
            <Header showBackButton={false} showWether={false} navigateProfile />
          </SafeAreaView>
        </ImageBackground>
        <View
          style={[
            tailwind("bg-white flex-1 justify-start -mt-4 rounded-t-2xl"),
          ]}
        >
          <ProfileCard
            userId={data?.data?.data?._id!}
            goodyId={data?.data?.data?.goodayId}
            image={data?.data?.data?.profile}
            name={
              data?.data?.data?.firstName + " " + data?.data?.data?.lastName
            }
          />
          <View style={tailwind("px-4")}>
            <TabBar
              tabs={[
                {
                  label: "Profile",
                  value: "Profile",
                },
                {
                  label: "Friends",
                  value: "Friends",
                },
              ]}
              onPress={setActive}
              active={(active)}
              tabStyle={tailwind("items-center flex-1")}
            />
          </View>
          {!isLoading && (
            <Fragment>
              {(active) === "Profile" ? (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={tailwind("px-4 flex-1 mt-4 mb-4")}>
                    <ProfileDetails
                      user={data?.data?.data}
                      assistant={assistant?.data?.data}
                      editable
                      massage={`With ${assistant?.data?.data?.name} you have...`}
                    />
                  </View>
                </ScrollView>
              ) : (
                <FriendsContainer
                  isRefetching={isRefetching}
                  friends={friends!}
                  fetchNextPage={fetchNextPage}
                  setSearch={setSearch}
                  search={search}
                />
              )}
            </Fragment>
          )}
        </View>
      </View>
    </Fragment>
  );
};
