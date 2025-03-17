import {
  Button,
  Dropdown,
  EmptyComponent,
  Icon,
  Input,
  ProgressBar,
  Typography,
} from "@app/ui";
import React, { useMemo, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import {
  FriendUserCard,
  HeaderWithLogo,
  HomeNavigationParamList,
  useGetMyFriends,
  useGetUser,
} from "@app/modules";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUserBooking } from "@app/common";
import { useDebounce } from "@app/utils";
import {
  CreateBookingCollaboratorPayload,
  FriendsDTO,
  UserEntity,
} from "@gooday_corp/gooday-api-client";
import { AxiosResponse } from "axios";

export const InviteContainer = () => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();
  const { booking, updateBooking } = useUserBooking();
  const { data: userMe } = useGetUser();
  const [people, setPeople] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const debounceValue = useDebounce(search, 500);
  const { data, isLoading } = useGetMyFriends(debounceValue);

  const friends = useMemo(() => {
    return data?.pages?.reduce(
      (acc: FriendsDTO["data"], page: AxiosResponse<FriendsDTO>) => {
        return [...(acc ?? []), ...(page?.data?.data ?? [])];
      },
      []
    );
  }, [data]);

  const onFriendCardPress = (user: UserEntity) => {
    let collaborators: Array<CreateBookingCollaboratorPayload> = [
      ...booking?.collaborators,
      {
        _id: user?._id,
        email: user?.email,
        goodayId: user?.goodayId,
        mobile: user?.mobileNumber,
        name: user?.firstName,
      },
    ];
    const friend = booking?.collaborators?.find((el) => el?._id === user?._id);
    if (friend) {
      collaborators = collaborators?.filter((el) => el?._id !== user?._id);
    }
    if (
      collaborators?.length === people
      // ||  (userMe?.data?.data?.plan?.name === "Free" && booking?.collaborators?.length)
    ) {
      collaborators.shift();
    }
    updateBooking({
      collaborators: collaborators,
    });
  };

  const isActive = (id: string) => {
    const friend = booking?.collaborators?.find((el) => el?._id === id);
    return friend ? true : false;
  };
  const collaborators = [
    {
      _id: userMe?.data?.data?._id,
      email: userMe?.data?.data?.email,
      goodayId: userMe?.data?.data?.goodayId,
      mobile: userMe?.data?.data?.mobileNumber,
      name: userMe?.data?.data?.firstName,
    },
    ...(booking?.collaborators ?? [])
  ]

  return (
    <>
      <SafeAreaView style={tailwind("flex-1")}>
        <View style={tailwind("px-6 flex-1")}>
          <View style={tailwind("flex-1")}>
            <ProgressBar progress={(booking?.progress ?? 0)! > 0 ? booking?.progress : 20} className="mt-4" />
            <HeaderWithLogo
              title="Invite Friends"
              className="mt-6"
            />
            <View style={tailwind("mt-5")}>
              <Dropdown
                data={[...Array(4)].map((_, i) => ({
                  label: `${1 + i}`,
                  value: `${1 + i}`,
                }))}
                onChangeText={(value) => {
                  setPeople(Number(value));
                  updateBooking({
                    collaborators: [],
                  });
                }}
                label={"How many people attending in total?"}
                placeholder={"Select from options "}
                selected={people?.toString()}
                labelField="label"
                valueField="value"
                onChange={() => { }}
              />
            </View>
            {people > 1 && (
              <>
                <View style={tailwind("mt-5")}>
                  <Typography weight="medium" variant="sm" className="">
                    If attending with a fellow Gooday user, invite them here:
                  </Typography>
                  <Input
                    onPressIn={() => { }}
                    onChangeText={(text) => setSearch(text)}
                    height={36}
                    value={search}
                    placeholder="Search"
                    className="bg-dark-gray border-0 pr-5 mt-3"
                    left={
                      <Icon
                        name="search"
                        fill="#3C3C4399"
                        width={18}
                        height={16}
                        stroke="none"
                      />
                    }
                  />
                </View>
                <View style={tailwind("mt-5 flex-1")}>
                  {isLoading ? (
                    <View style={tailwind("items-center justify-center")}>
                      <Typography>searching...</Typography>
                    </View>
                  ) : (
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      numColumns={2}
                      data={friends}
                      // contentContainerStyle={{
                      //   gap: 20,
                      // }}
                      ListEmptyComponent={
                        <EmptyComponent massage="No friend found!" />
                      }
                      columnWrapperStyle={{ gap: 20 }}
                      renderItem={({ item }) => (
                        <FriendUserCard
                          active={isActive(item?._id)}
                          onPress={() => onFriendCardPress(item)}
                          friend={item}
                        />
                      )}
                      keyExtractor={(item) => item?._id}
                    />
                  )}
                </View>
              </>
            )}
          </View>
          <Button
            loading={false}
            disabled={false}
            onPress={() => {
              updateBooking({
                progress: 60,
                collaborators: [
                  ...collaborators,
                  ...(Array.from({ length: (people - collaborators?.length) }, (_) => ({
                    name: null,
                    email: null,
                    mobile: null,
                    goodayId: null,
                    _id: null,
                  })) ?? [])
                ]
              })
              navigation?.navigate("BOOKING");
            }}
            className="my-2"
            title="Next"
          />
        </View>
      </SafeAreaView>
    </>
  );
};
