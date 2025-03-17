import React, { FC, Fragment } from "react";
import { ActivityIndicator, FlatList, StatusBar, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { EventDetailsViewCard, HeaderWithLogo, useGetListEvents, VenueEmpty } from "@app/modules";
import { Loading } from "@app/ui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import moment from "moment";

export const CalendarEventsContainer: FC = () => {
  const tailwind = useTailwind();
  const { calendarEvents, isLoading, fetchNextPage, isFetching } = useGetListEvents(
    moment(),
    'month'
  );

  const onFetch = () => {
    fetchNextPage();
  };

  return (
    <Fragment>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Loading loading={isLoading} />
      <View style={[tailwind("flex-1"), { marginTop: useSafeAreaInsets().top }]}>
        <View style={[tailwind("px-6 mb-1")]}>
          <HeaderWithLogo title='Home' />
        </View>
        <FlatList
          data={calendarEvents}
          numColumns={2}
          onEndReached={onFetch}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingHorizontal: 18 }}
          ItemSeparatorComponent={() => <View style={tailwind("my-2")} />}
          renderItem={({ item }) => {
            return (
              <EventDetailsViewCard
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
          ListEmptyComponent={<VenueEmpty massage="It looks like there are no bookings or events currently scheduled in your social calendar." />}
        />
      </View>
    </Fragment>
  );
};
