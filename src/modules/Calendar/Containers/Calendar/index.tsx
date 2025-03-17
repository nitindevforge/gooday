import { useTailwind } from "tailwind-rn";
import React, { Fragment, useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import {
  BookingDetailsModal,
  CalendarNavigationParamList,
  CalenderDefaultLayout,
  CreateEventModal,
  EventsComponent,
  EventTypes,
  FilterDataProps,
  FilterHeader,
  Role,
  useGetSocialEvents,
  useGetUser,
} from "@app/modules";
import { Calendar, Loading } from "@app/ui";
import {
  RouteProp,
  useIsFocused,
  useRoute,
} from "@react-navigation/native";
import moment, { MomentInput } from "moment";
import { useGetEvents } from "@app/modules";
import { useCalendar } from "@app/common";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NiceModal from "@ebay/nice-modal-react";
import { InfiniteCalendarContainer } from "../InfiniteCalendar";

const FilterData: FilterDataProps[] = [
  {
    background: "bg-yellow-100",
    label: "Bookings",
    textColor: "black",
    variant: "primary",
    value: 'bookings'
  },
  {
    background: "bg-blue-100",
    label: "Shared",
    textColor: "black",
    variant: "primary",
    value: 'shared'
  },
  {
    background: "bg-purple-100",
    label: "Standard",
    textColor: "black",
    variant: "primary",
    value: 'invites'
  },
  {
    background: "bg-gray-600",
    label: "Unconfirmed",
    textColor: "black",
    variant: "dashed",
    value: 'unconfirmed'
  },
];

const FilterBusinessData: FilterDataProps[] = [
  {
    background: "bg-yellow-100",
    label: "Rescheduled",
    textColor: "black",
    variant: "primary",
    value: 'rescheduled'
  },
  {
    background: "bg-blue-100",
    label: "Confirmed",
    textColor: "black",
    variant: "primary",
    value: 'confirmed'
  },
  {
    background: "bg-gray-600",
    label: "Unconfirmed",
    textColor: "black",
    variant: "dashed",
    value: 'unconfirmed'
  },
];

export const CalendarContainer = () => {
  const isFocused = useIsFocused();
  const tailwind = useTailwind();
  const { params } =
    useRoute<RouteProp<CalendarNavigationParamList, "CALENDAR_PAGE">>();
  const { data } = useGetUser();

  const { setCalenderType, calenderType, focus } = useCalendar();
  const [date, setDate] = useState<MomentInput>(moment);
  const [selectedDateFromMonth, setSelectedDateFromMonth] =
    useState<MomentInput>(moment);

  const { eventTypes, setEventType, calendarEvents, isLoading } = useGetEvents(
    calenderType === 'week' ? date : null,
    calenderType
  );

  const handleOnCalendarViewChange = () => {
    if (calenderType === "month") {
      setCalenderType("week");
    } else {
      setCalenderType("month");
    }
  };

  // This useEffect is for when user clicks on notification details - it will open relevant modal for further info
  useEffect(() => {
    if (params?.event && params?.userId) {
      NiceModal?.show(CreateEventModal, { userId: params?.userId });
    } else if (params?.event) {
      NiceModal?.show(CreateEventModal);
    } else if (params?.eventDetails && calendarEvents?.length) {
      setDate(params?.eventDetails?.startDate);
      setSelectedDateFromMonth(params?.eventDetails?.startDate);
      setCalenderType("week");

      NiceModal?.show(BookingDetailsModal, {
        data: calendarEvents?.find(
          (ele) => ele?._id === params?.eventDetails?._id
        ),
      });
    }
  }, [params?.event, calendarEvents]);

  const handleInfiniteCalendarOnPress = (date: Date) => {
    setDate(date);
    setSelectedDateFromMonth(date);
    setCalenderType("week");
  }

  return (
    <Fragment>
      {isFocused && (
        <StatusBar backgroundColor="white" barStyle="dark-content" />
      )}
      {calenderType !== "month" && (
        <Loading loading={isLoading} />
      )}
      <CalenderDefaultLayout
        calenderType={calenderType}
        date={date as Date}
        role={data?.data?.data?.role as Role}
        onCalendar={handleOnCalendarViewChange}
      >
        {calenderType === "week" && (
          <View>
            <Calendar
              variant="primary"
              view="weekly"
              date={new Date(date as string)}
              onPress={(date) => setDate(date)}
              selectedDateFromMonth={new Date(selectedDateFromMonth as string)}
            />
          </View>
        )}
        <FilterHeader
          data={
            data?.data?.data?.role === Role.BUSINESS
              ? FilterBusinessData
              : FilterData
          }
          eventTypes={eventTypes}
          onPress={(text: EventTypes) => setEventType(text)}
        />
        {calenderType === "month" && (
          <InfiniteCalendarContainer
            onActiveMonthChange={(date) => setDate(date)}
            eventTypes={eventTypes}
            onPress={handleInfiniteCalendarOnPress}
            initialDate={date}
          />
        )}
        {calenderType === "week" && !isLoading && (
          <GestureHandlerRootView
            style={[tailwind("flex-1 justify-start items-start")]}
          >
            <EventsComponent
              focus={focus}
              events={calendarEvents}
              onChange={(date) => {
                setDate(date);
                setSelectedDateFromMonth(date);
                setCalenderType("week");
              }}
              date={date as Date}
            />
          </GestureHandlerRootView>
        )}
      </CalenderDefaultLayout>
    </Fragment>
  );
};
