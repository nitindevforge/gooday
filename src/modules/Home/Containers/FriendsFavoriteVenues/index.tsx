import React, { FC, Fragment, useMemo } from "react";
import { ActivityIndicator, Dimensions, FlatList, SafeAreaView, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { HeaderWithLogo, useGetBusinessVenueFriends, VenueFavouriteCard, VenueEmpty, HomeNavigationParamList } from "@app/modules";
import { AxiosResponse } from "axios";
import { BusinessFavoriteListResponseDTO } from "@gooday_corp/gooday-api-client";
import { Loading } from "@app/ui";
import { RouteProp, useRoute } from "@react-navigation/native";

export const FriendsFavoriteVenues: FC = () => {
  const tailwind = useTailwind();
  const { params } =
    useRoute<RouteProp<HomeNavigationParamList, "FRIENDS_FAVORITE_VENUES">>();
  const { data: friendVenues, isLoading, fetchNextPage, isFetching } =
    useGetBusinessVenueFriends();

  const friendVenuesList = useMemo(() => {
    const friendVenuesList = friendVenues?.pages?.reduce(
      (
        acc: BusinessFavoriteListResponseDTO["data"],
        page: AxiosResponse<BusinessFavoriteListResponseDTO>
      ) => {
        return [...(acc ?? []), ...(page?.data?.data ?? [])];
      },
      []
    );
    return friendVenuesList ?? [];
  }, [friendVenues]);


  const onFetch = () => {
    fetchNextPage();
  };
  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <View style={tailwind("flex-1")}>
        <Loading loading={isLoading} />
        <View style={{ paddingHorizontal: 18 }}>
          <HeaderWithLogo title={params?.back ?? "Back"} />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={friendVenuesList}
          numColumns={2}
          onEndReached={onFetch}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingHorizontal: 18, padding: 12 }}
          ItemSeparatorComponent={() => <View style={tailwind("my-2")} />}
          renderItem={({ item }) => {
            return (
              <VenueFavouriteCard
                item={item}
                style={{ height: 155 }}
                width={Dimensions.get("screen").width * 0.44}
              />
            );
          }}
          ListFooterComponent={
            <Fragment>
              {isFetching && <ActivityIndicator size="large" />}
            </Fragment>
          }
          keyExtractor={(item) => item?._id?.toString()!}
          ListEmptyComponent={
            <VenueEmpty massage="It seems your friends haven't marked any businesses or venues as favorites yet." />
          }
        />
      </View>
    </SafeAreaView>
  );
};
