import React, { FC, Fragment, useMemo } from "react";
import { ActivityIndicator, FlatList, StatusBar, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { HeaderWithLogo, useGetUser, useGetWhatsOn, VenueEmpty, WhatsOnCard } from "@app/modules";
import { AxiosResponse } from "axios";
import { WhatsOnResponseDTO } from "@gooday_corp/gooday-api-client";
import { Loading, ProgressBar, Typography } from "@app/ui";
import { useUserBooking } from "@app/common";
import { SafeAreaView } from "react-native-safe-area-context";

export const WhatsOnBusinessContainer: FC = () => {
  const tailwind = useTailwind();
  const { booking } = useUserBooking();
  const { data } = useGetUser();
  const { data: whatsOn, isLoading: isWhatsOnLoading, fetchNextPage, isFetching } = useGetWhatsOn();
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
          {
            data?.data?.data.role === 'user' &&
            <ProgressBar progress={38} className="mt-4" />
          }
          <HeaderWithLogo
            title={data?.data?.data.role === 'user' ? booking?.venueObj?.business?.name! : "Back"}
            hideLogo
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
              <WhatsOnCard
                item={item}
                width={172}
                style={{ width: 172, height: 135, maxHeight: "auto" }}
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
