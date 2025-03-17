import React, { useEffect, useRef, useState } from "react";
import { EventsProps } from "./type";
import { useTailwind } from "tailwind-rn";
import { TextInput, View, Image, Platform } from "react-native";
import { getAssetUrl } from "@app/utils";

import { Icon, Loading, Typography } from "@app/ui";
import { eventTextColor } from "@app/utils";
import moment from "moment";
import { CalendarBody, CalendarContainer } from "@howljs/calendar-kit";
import { useOpenEventModalById } from "@app/common";

export const EventsComponent: React.FC<EventsProps> = ({
  events,
  focus = false,
  onChange,
  date,
}) => {
  const tailwind = useTailwind();
  const inputRef = useRef<TextInput>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { openEventModalById, isLoading } = useOpenEventModalById();

  useEffect(() => {
    if (focus) {
      inputRef.current?.focus();
    }
  }, [focus]);

  const backgroundColor = (
    event: string,
    isGoogleEvent: boolean = false,
    isMicrosoftEvent: boolean = false
  ) => {
    if (isGoogleEvent) {
      return "#DADADA";
    }
    if (isMicrosoftEvent) {
      return "#C8D1F1";
    }
    switch (event) {
      case "bookings":
        return "#FECB4D";
      case "shared":
        return "#79C2EC";
      case "invites":
        return "#C8D1F1";
      case "confirmed":
        return "#D2EBF9";
      case "rescheduled":
        return "#FECB4D";
      case "unconfirmed":
        return "#DADADA";
    }
  };

  const borderColor = (
    event: string,
    isGoogleEvent: boolean = false,
    isMicrosoftEvent: boolean = false
  ) => {
    if (isGoogleEvent) {
      return "#AEAEAE";
    }
    if (isMicrosoftEvent) {
      return "#3A5ACA";
    }
    switch (event) {
      case "bookings":
        return "#FFF1CE";
      case "shared":
        return "#D2EBF9";
      case "invites":
        return "#C8D1F1";
      case "confirmed":
        return "#79C2EC";
      case "rescheduled":
        return "#FFF1CE";
      case "unconfirmed":
        return "#AEAEAE";
    }
  };
  const splitMultiDayEvents = (events) => {
    return events.flatMap((event) => {
      const start = moment(event.startDate);
      const end = moment(event.endDate);
      const days = Math.ceil(moment.duration(end.diff(start)).asDays());

      if (days <= 1) return event;

      const splitEvents = [];
      for (let i = 0; i < days; i++) {
        const dayStart = start.clone().add(i, "days");
        const dayEnd = i === days - 1 ? end : dayStart.clone().endOf("day");

        splitEvents.push({
          ...event,
          startDate: dayStart.toISOString(),
          endDate: dayEnd.toISOString(),
        });
      }
      return splitEvents;
    });
  };
  const processedEvents = splitMultiDayEvents(events);

  return (
    <View style={tailwind("flex-1 w-full mt-4")}>
      <Loading loading={loading || isLoading} />

      <CalendarContainer
        // overlapType="overlap"

        onChange={(e) => {
          setLoading(true);
          onChange(new Date(e));
        }}
        onPressEvent={(event) => {
          openEventModalById(
            event.id,
            event.type,
            ["google", "microsoft"].includes(event.type) ? event : null
          );
        }}
        onLoad={() => {
          setLoading(false);
        }}
        hourWidth={84}
        scrollToNow={false}
        allowDragToEdit={false}
        timeInterval={30}
        initialDate={date}
        numberOfDays={1}
        theme={{
          nowIndicatorColor: "black",
          colors: {
            // border: 'white'
          },

          eventContainerStyle: {
            borderRadius: 8,
          },

          hourTextStyle: {
            fontSize: 14,
            fontWeight: "500",
            color: "#AEAEAE",
            textAlign: "left",
          },
        }}
        events={processedEvents?.map((ele) => {
          return {
            ...ele,
            id: ele?._id,
            title: ele?.title,
            start: { dateTime: new Date(ele?.startDate).toISOString() },
            end: { dateTime: new Date(ele?.endDate).toISOString() },
            color: backgroundColor(ele?.eventType),
          };
        })}
      >
        <CalendarBody
          hourFormat="hh:mm A"
          renderEvent={(event) => {
            const date = events?.find(
              (ele: { _id: string }) => ele?._id === event?._id
            );
            const createUser = event?.collaborators?.find(
              (ele: { _id: string }) => ele?._id === event?.createdBy
            );
            const isGoogleEvent = event.type === "google";
            const isMicrosoftEvent = event.type === "microsoft";

            return (
              <View
                style={{
                  backgroundColor: backgroundColor(
                    event?.eventType,
                    isGoogleEvent,
                    isMicrosoftEvent
                  ),
                  padding: 4,
                  gap: 4,
                  borderLeftWidth: 3,
                  borderLeftColor: borderColor(
                    event?.eventType,
                    isGoogleEvent,
                    isMicrosoftEvent
                  ),
                  height: "100%",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <View style={tailwind("flex flex-row items-center")}>
                    <Typography
                      numberOfLines={1}
                      variant="13"
                      weight="regular"
                      color={eventTextColor?.[event?.eventType]}
                    >
                      {moment(date?.startDate).format("hh:mm A")}{" "}
                    </Typography>
                    {isMicrosoftEvent && (
                      <Icon
                        name="outlook-calendar"
                        fill="black"
                        width={18}
                        height={18}
                      />
                    )}
                    {isGoogleEvent && (
                      <Icon name="google" fill="black" width={16} height={16} />
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-end",
                      gap: 4,
                    }}
                  >
                    <Icon
                      name="profile-policy"
                      fill="black"
                      width={18}
                      height={18}
                      style={{ paddingRight: 14 }}
                    />
                    <Typography
                      numberOfLines={1}
                      variant="13"
                      weight="regular"
                      color={eventTextColor?.[event?.eventType]}
                    >
                      {date?.collaborators?.length ?? 0}{" "}
                    </Typography>
                    <Image
                      style={[
                        tailwind("rounded-full border border-white"),
                        { width: 18, height: 18 },
                      ]}
                      source={
                        createUser?.profile
                          ? {
                              uri: `${getAssetUrl(
                                createUser?.profile ?? ""
                              )}?date=${Platform.select({
                                ios: new Date().getTime(),
                              })}`,
                            }
                          : require("@app/assets/Images/profile.png")
                      }
                      defaultSource={require("@app/assets/Images/profile.png")}
                      resizeMode="cover"
                    />
                  </View>
                </View>
                <Typography
                  numberOfLines={1}
                  variant="base"
                  weight="regular"
                  color={eventTextColor?.[event?.eventType]}
                >
                  {event?.title}
                </Typography>
              </View>
            );
          }}
        />
      </CalendarContainer>
    </View>
  );
};
