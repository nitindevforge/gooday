import {
  Button,
  EmptyComponent,
  Icon,
  Loading,
  SearchInput,
  Typography,
} from "@app/ui";
import React, { Fragment, useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  CalendarNavigationParamList,
  FriendUserCard,
  HeaderWithLogo,
  ManageSubscriptionModal,
  useCalendarInviteMutation,
  useGetMyFriends,
  useGetUser,
} from "@app/modules";
import { useTailwind } from "tailwind-rn";
import { getWithMore, useDebounce } from "@app/utils";
import { AxiosResponse } from "axios";
import { FriendsDTO } from "@gooday_corp/gooday-api-client";
import NiceModal from "@ebay/nice-modal-react";
import { useCalendar } from "@app/common";
import { useGetCalendarCollaborators } from "../../Data/Query/CalendarCollaborators";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const CollaboratorContainer = () => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NativeStackNavigationProp<CalendarNavigationParamList>>();
  const { calendar } = useCalendar();
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const [search, setSearch] = useState<string>("");
  const debounceValue = useDebounce(search, 500);
  const [friendIds, setFriendIds] = useState<string[]>([]);
  const { mutate: addCollaborator, isLoading: isInviteLoading } =
    useCalendarInviteMutation();

  const calendarId = useMemo(() => {
    return calendar?._id ? calendar?._id : user?.data?.data?.calendar;
  }, [calendar, user]);

  const { data, isLoading, refetch: friendRefetch } = useGetMyFriends(debounceValue, calendarId);

  const {
    data: calendarCollaborators,
    isLoading: isCalendarCollaboratorsLoading,
    refetch,
  } = useGetCalendarCollaborators(calendarId!);

  const friends = useMemo(() => {
    return data?.pages?.reduce(
      (acc: FriendsDTO["data"], page: AxiosResponse<FriendsDTO>) => {
        return [...(acc ?? []), ...(page?.data?.data ?? [])];
      },
      []
    );
  }, [data]);

  const onModalOpen = () => {
    NiceModal.show(ManageSubscriptionModal);
  };

  const onOutSidePress = () => {
    Keyboard.dismiss();
  };

  const onAddCollaborators = () => {
    addCollaborator(
      {
        calendar: calendarId!,
        collaborator: friendIds,
      },
      {
        onSuccess: () => {
          const withMore = friends?.filter(el => friendIds?.includes(el?._id))
          navigation.navigate("CALENDAR_REQUEST", { withMore: getWithMore(withMore || [],[user?.data?.data?._id!]) || '' });
          setSearch('')
          setFriendIds([])
          refetch();
          friendRefetch();
        },
      },
    );
  };

  const onFriendCardPress = (id: string) => {
    setFriendIds((prevItems) =>
      prevItems.includes(id)
        ? prevItems.filter((i) => i !== id)
        // : user?.data?.data?.plan?.name === "Free"s
        //   ? [id]
        : [...prevItems, id]
    );
  };

  const isActive = (id: string) => {
    const isSelected = [
      ...friendIds,
      ...(calendarCollaborators?.data?.data?.map((el) => el?._id) || []),
    ]?.find((friendId) => friendId === id);
    return isSelected ? true : false;
  };

  const isDisabled = (id: string) => {
    const isCollaborator = calendarCollaborators?.data?.data?.find(
      (element) => element?._id === id
    );
    return isCollaborator ? true : false;
  };


  return (
    <TouchableWithoutFeedback onPress={onOutSidePress}>
      <Fragment>
        <Loading loading={isLoading || isUserLoading || isInviteLoading || isCalendarCollaboratorsLoading} />
        <SafeAreaView style={tailwind('flex-1')}>
          <View style={[tailwind('px-6 flex-1')]}>
            <View style={[tailwind('flex-1'), { gap: 16 }]}>
              <HeaderWithLogo
                title='Calendar'
                back
              />
              <Typography variant='2xl' weight='medium'>Collaborators</Typography>
              <SearchInput
                onPressIn={() => { }}
                onChangeText={(text) => setSearch(text)}
                height={36}
                value={search}
                placeholder="Search"
              />
              <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={friends}
                columnWrapperStyle={{
                  flex: 1,
                  justifyContent: "space-between",
                }}
                renderItem={({ item }) => (
                  <>
                    <FriendUserCard
                      active={isActive(item?._id)}
                      disabled={isDisabled(item?._id)}
                      onPress={() => onFriendCardPress(item?._id)}
                      friend={item}
                    />
                    {/* {user?.data?.data?.plan?.name === "Free" && (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={onModalOpen}
                        style={[
                          tailwind(
                            "rounded-20 bg-primary-100 items-center justify-center opacity-75"
                          ),
                          {
                            height: 190,
                            width: Dimensions.get("screen").width / 2 - 34,
                          },
                        ]}
                      >
                        <Icon name="add" />
                      </TouchableOpacity>
                    )} */}
                  </>
                )}
                keyExtractor={(item) => item?._id}
                ListEmptyComponent={() => !isLoading && <EmptyComponent />}
              />
            </View>
          </View>
          <View style={tailwind('w-full px-6 py-6')}>
            <Button
              onPress={onAddCollaborators}
              disabled={!friendIds?.length}
              title="Next"
            />
          </View>
        </SafeAreaView>
      </Fragment>
    </TouchableWithoutFeedback>
  );
};
