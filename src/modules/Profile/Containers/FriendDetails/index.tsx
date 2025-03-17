import React, { Fragment, useEffect, useMemo } from "react";
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import {
  FRIEND_REQUEST_STATUS,
  Header,
  ProfileCard,
  ProfileDetails,
  ProfileNavigationStackParamList,
  useAssistant,
  useGetFriendshipStatusMutation,
  useGetUser,
  useGetUserBuyIdMutation,
  useRemoveFriendMutation,
} from "@app/modules";
import { useSendFriendRequestMutation } from "@app/modules";
import { RouteProp, useIsFocused, useRoute } from "@react-navigation/native";
import { Loading } from "@app/ui";

export const FriendDetailsContainer = () => {
  const { params } =
    useRoute<RouteProp<ProfileNavigationStackParamList, "FRIEND">>();
  const tailwind = useTailwind();
  const isFocused = useIsFocused();
  const { data, isLoading: isUserMeLoading } = useGetUser();
  const { mutate, isLoading } = useSendFriendRequestMutation();
  const {
    data: friend,
    refetch,
    isLoading: isFriendLoading,
  } = useGetFriendshipStatusMutation({ to: params?.userId });
  const { mutate: removeFriend } = useRemoveFriendMutation();
  const {
    mutate: userGetById,
    data: user,
    isLoading: isUserLoading,
  } = useGetUserBuyIdMutation();

  const { data: assistants } = useAssistant();
  const assistant =
    assistants?.data.data?.find(
      (el) => el?.id === user?.data?.data?.assistant
    ) || assistants?.data?.data?.[0];

  useEffect(() => {
    userGetById({ id: params?.userId });
  }, [params?.userId]);

  const onFriend = () => {
    if (friend?.data?.success === FRIEND_REQUEST_STATUS.CONFIRMED) {
      Alert.alert(
        "Are you sure?",
        `If you unfriend ${user?.data?.data?.firstName} ${user?.data?.data?.lastName}, they won’t be notified.`,
        [
          {
            text: "Nevermind",
          },
          {
            text: "Unfriend",
            onPress() {
              removeFriend(
                { from: data?.data?.data?._id! },
                {
                  onSuccess: async () => {
                    await refetch();
                  },
                }
              );
            },
          },
        ]
      );
    } else if (
      !friend?.data?.success ||
      friend?.data?.success === FRIEND_REQUEST_STATUS.UNKNOWN ||
      friend?.data?.success === FRIEND_REQUEST_STATUS.REJECTED
    ) {
      mutate(
        { to: params?.userId! },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    }
  };

  const massage = useMemo(() => {
    const myAssistant = assistants?.data?.data?.find((el) => el.id === data?.data?.data?.assistant);
    return `With ${myAssistant?.name}, ${user?.data?.data?.firstName} has...`;
  }, [user, data, assistant, assistants]);

  return (
    <Fragment>
      {isFocused && <StatusBar backgroundColor="#FEB74D" />}
      <Loading loading={isUserMeLoading || isUserLoading || isFriendLoading} />
      <View style={[tailwind("flex-1")]}>
        <ImageBackground
          source={require("../../../../assets/Images/profile-bg.png")}
          style={{ width: "100%", height: 151 }}
          resizeMode="cover"
        >
          <SafeAreaView>
            <Header showBackButton showWether={false} navigateProfile />
          </SafeAreaView>
        </ImageBackground>
        <View
          style={[
            tailwind("bg-white flex-1 justify-start -mt-4 rounded-t-2xl"),
          ]}
        >
          {!isUserLoading && !isUserMeLoading && (
            <Fragment>
              <ProfileCard
                loading={isLoading}
                status={friend?.data?.success as FRIEND_REQUEST_STATUS}
                goodyId={user?.data?.data?.goodayId}
                image={user?.data?.data?.profile}
                name={
                  user?.data?.data?.firstName + " " + user?.data?.data?.lastName
                }
                onFriend={onFriend}
              />
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={tailwind("px-4 flex-1 mb-4")}>
                  <ProfileDetails
                    user={user?.data?.data}
                    assistant={assistant}
                    massage={massage}
                  />
                </View>
              </ScrollView>
            </Fragment>
          )}
        </View>
      </View>
    </Fragment>
  );
};
