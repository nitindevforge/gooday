import React, { FC, Fragment, useMemo } from "react";
import { ActivityIndicator, Dimensions, FlatList, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useGetBusinessVenue, useVenueFilter, VenueDetailsCard, VenueEmpty } from "@app/modules";
import { AxiosResponse } from "axios";
import { BusinessVenueResponseDTO } from "@gooday_corp/gooday-api-client";
import { VenuesProps } from "./type";
import { Loading } from "@app/ui";

export const Venues: FC<VenuesProps> = ({ type, active }) => {
  const tailwind = useTailwind();
  const { filter } = useVenueFilter();
  const {
    data: venuesData,
    isLoading,
    fetchNextPage,
    isFetching,
  } = useGetBusinessVenue(
    {
      category: type,
      available_today: filter?.available_today,
      distance: String(filter?.distance),
      price: filter?.price,
    },
    active
  );
  const venues = useMemo(() => {
    const venues = venuesData?.pages?.reduce(
      (
        acc: BusinessVenueResponseDTO["data"],
        page: AxiosResponse<BusinessVenueResponseDTO>
      ) => {
        return [...(acc ?? []), ...(page?.data?.data ?? [])];
      },
      []
    );
    return venues ?? [];
  }, [venuesData]);

  const onFetch = () => {
    fetchNextPage();
  };
  return (
    <View style={tailwind("overflow-hidden w-full mt-6 flex-1")}>
      <Loading loading={isLoading} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={venues}
        numColumns={2}
        onEndReached={onFetch}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingHorizontal: 18 }}
        ItemSeparatorComponent={() => <View style={tailwind("my-2")} />}
        renderItem={({ item }) => {
          return (
            <VenueDetailsCard
              item={item}
              width={Dimensions.get("screen").width * 0.44}
            />
          );
        }}
        ListFooterComponent={
          <Fragment>
            {!isLoading && isFetching && <ActivityIndicator size="large" />}
          </Fragment>
        }
        keyExtractor={(item) => item?._id?.toString()!}
        ListEmptyComponent={
          <Fragment>
            {!isLoading && <VenueEmpty />}
          </Fragment>
        }
      />
    </View>
  );
};
