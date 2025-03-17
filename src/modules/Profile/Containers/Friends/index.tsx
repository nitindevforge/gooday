import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { FriendCard, ProfileNavigationStackParamList } from "@app/modules";
import { EmptyComponent, Input } from "@app/ui";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FriendsProps } from "./type";

export const FriendsContainer: React.FC<FriendsProps> = ({
  isRefetching,
  friends,
  fetchNextPage,
  setSearch,
  search,
}) => {
  const tailwind = useTailwind();
  const [searchText, setSearchText] = useState<string>(search);

  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileNavigationStackParamList>>();

  const onFetch = () => {
    fetchNextPage();
  };

  const onPress = (id: string) => {
    navigation.navigate("FRIEND", { userId: id });
  };

  return (
    <View style={[tailwind("flex-1")]}>
      <Input
        onChangeText={setSearchText}
        value={searchText}
        placeholder="Search"
        className="bg-dark-gray border-0 px-7 mx-4 my-5"
        height={36}
        onSubmitEditing={() => setSearch(searchText)}
        returnKeyType="done"
      />
      <FlatList
        data={friends}
        showsVerticalScrollIndicator={false}
        onEndReached={onFetch}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => onPress(item?._id)}
              activeOpacity={0.7}
              style={[tailwind("px-4")]}
            >
              <FriendCard
                image={item?.profile ?? ""}
                name={item?.firstName + " " + item?.lastName}
              />
              {friends?.length &&
                friends[friends?.length - 1]?._id !== item?._id && (
                  <View
                    style={[
                      tailwind("my-3 border-gray-600"),
                      { borderBottomWidth: 0.5 },
                    ]}
                  />
                )}
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={
          <View>{isRefetching && <ActivityIndicator size="large" />}</View>
        }
        ListEmptyComponent={() => !isRefetching && <EmptyComponent />}
        keyExtractor={(item) => item?._id?.toString()}
      />
    </View>
  );
};
