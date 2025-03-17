import React, { FC, Fragment, useMemo } from "react";
import { ActivityIndicator, FlatList, StatusBar, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { HeaderWithLogo, HomeNavigationParamList, useCustomerBooking, VenueEmpty, WhatsOnCard } from "@app/modules";
import { AxiosResponse } from "axios";
import { FindBookingResponseDTO } from "@gooday_corp/gooday-api-client";
import { Loading, Typography } from "@app/ui";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUserBooking } from "@app/common";

export const WhatsOnBusinessBookingContainer: FC = () => {
  const tailwind = useTailwind();
  const { updateBooking } = useUserBooking();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();
  const { data: whatsOn, isLoading: isWhatsOn, fetchNextPage, isFetching } = useCustomerBooking({
    whatsOn: true
  }); const whatsOnList = useMemo(() => {
    const whatsOnList = whatsOn?.pages?.reduce(
      (
        acc: FindBookingResponseDTO["data"],
        page: AxiosResponse<FindBookingResponseDTO>
      ) => {
        return [...(acc ?? []), ...(page?.data?.data ?? [])];
      },
      []
    );
    return whatsOnList ?? [];
  }, [whatsOn]);
  const onFetch = () => {
    fetchNextPage();
  };

  return (
    <Fragment>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Loading loading={isWhatsOn} />
      <SafeAreaView style={tailwind("flex-1")}>
        <View style={tailwind("px-6 mb-1")}>
          <HeaderWithLogo
            title="Back"
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
                onNavigateCb={() => {
                  updateBooking({
                    venueObj: {
                      ...item?.venue,
                      business: item.business
                    },
                    venue: item?._id,
                    business: item.business?._id,
                  });
                  navigation?.navigate("VENUE_DETAILS", { id: item?.venue?._id! });
                }}
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
