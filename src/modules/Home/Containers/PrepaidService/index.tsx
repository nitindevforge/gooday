import React, { FC, Fragment, useMemo } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { HeaderWithLogo, PrepaidServiceCard, useGetPrepaidService, VenueEmpty } from "@app/modules";
import { AxiosResponse } from "axios";
import { PrepaidServiceResponseDTO } from "@gooday_corp/gooday-api-client";
import { Loading, Typography } from "@app/ui";

export const PrepaidServiceContainer: FC = () => {
  const tailwind = useTailwind();
  const { data: prepaid, isLoading, fetchNextPage, isFetching } = useGetPrepaidService();

  const prepaidService = useMemo(() => {
    const services = prepaid?.pages?.reduce(
      (
        acc: PrepaidServiceResponseDTO["data"],
        page: AxiosResponse<PrepaidServiceResponseDTO>
      ) => {
        return [...(acc ?? []), ...(page?.data?.data ?? [])];
      },
      []
    );
    return services ?? [];
  }, [prepaid]);

  const onFetch = () => {
    fetchNextPage();
  };

  return (
    <View style={tailwind("overflow-hidden w-full mt-6 flex-1")}>
      <Loading loading={isLoading} />
      <SafeAreaView style={tailwind("flex-1")}>
        <View style={tailwind("px-6 mb-1")}>
          <HeaderWithLogo
            title="Home"
            hideLogo
          />
          <Typography variant="lg">Your Pre-Paid Services</Typography>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={prepaidService}
          numColumns={2}
          onEndReached={onFetch}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingHorizontal: 18 }}
          ItemSeparatorComponent={() => <View style={tailwind("my-2")} />}
          renderItem={({ item }) => {
            return (
              <PrepaidServiceCard
                item={item}
                width={175}
                style={{ width: 175, height: 135, maxHeight: "auto" }}
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
            <VenueEmpty massage="No pre-paid services are currently available. Please check back soon for updates!" />
          }
        />
      </SafeAreaView>
    </View>
  );
};
