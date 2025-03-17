import React, { FC, Fragment, useMemo } from "react";
import { ActivityIndicator, Dimensions, FlatList, StatusBar, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { EventDetailsCard, HeaderWithLogo, useGetWhatsOn, VenueEmpty } from "@app/modules";
import { AxiosResponse } from "axios";
import { WhatsOnResponseDTO } from "@gooday_corp/gooday-api-client";
import { Loading, ProgressBar, Typography } from "@app/ui";
import { useUserBooking } from "@app/common";
import { SafeAreaView } from "react-native-safe-area-context";

export const WhatsOnListContainer: FC = () => {
  const tailwind = useTailwind();
  const { booking } = useUserBooking();
  const { data: whatsOn, isLoading: isWhatsOnLoading, fetchNextPage, isFetching } = useGetWhatsOn({
    venue: booking?.venueObj?._id,
    search: ''
  });
  const whatsOnList = useMemo(() => {
    const whatsOnRecord = whatsOn?.pages?.reduce(
      (
        acc: WhatsOnResponseDTO["data"],
        page: AxiosResponse<WhatsOnResponseDTO>
      ) => {
        return [...(acc ?? []), ...(page?.data?.data ?? [])];
      },
      []
    );
    return whatsOnRecord ?? [];
  }, [whatsOn]);

  const onFetch = () => {
    fetchNextPage();
  };

  return (
    <Fragment>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Loading loading={isWhatsOnLoading} />
      <SafeAreaView style={tailwind("flex-1")}>
        <View style={tailwind("px-6 mb-1")}>
          <ProgressBar progress={38} className="mt-4" />

          <HeaderWithLogo
            title={booking?.venueObj?.business?.name!}
            hideLogo
            className="mt-6"
          />
          <Typography variant="lg">What’s On</Typography>
        </View>
        <FlatList
          data={whatsOnList}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          onEndReached={onFetch}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingHorizontal: 18 }}
          ItemSeparatorComponent={() => <View style={tailwind("my-2")} />}
          renderItem={({ item }) => {
            return (
              <EventDetailsCard
                item={item}
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
            <VenueEmpty massage="Currently, there are no 'What's On' events available to book. Check back later for exciting updates!" />
          }
        />
      </SafeAreaView>
    </Fragment>

  );
};
