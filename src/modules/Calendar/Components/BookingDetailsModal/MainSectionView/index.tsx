import { Button, Icon, Loading, Typography } from "@app/ui";
import { getAssetUrl } from "@app/utils";
import React, { FC, useEffect, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { MainSectionProps } from "./type";
import config from "@app/config";
import {
  useGetUser,
  useDeleteEventMutation,
  useAcceptBookingMutation,
  useAcceptEventMutation,
  useManageBooking,
} from "@app/modules";
import { BookingDetailsCard } from "../../BookingDetailsCard";
import { BookingEntity, EventResponse } from "@gooday_corp/gooday-api-client";

export const MainSectionView: FC<MainSectionProps> = ({
  data,
  changeView = () => { },
  closeModal,
}) => {
  const [booking, setBooking] = useState<BookingEntity | EventResponse>(data);
  const tailwind = useTailwind();
  const {
    mutate: deleteEvent,
    isLoading: isDeleteLoading,
    isSuccess: isDeleteSuccess,
  } = useDeleteEventMutation();
  const {
    mutate: acceptBooking,
    isLoading: isAcceptBookingLoading,
    isSuccess,
  } = useAcceptBookingMutation();
  const {
    mutate: acceptEvent,
    isLoading: isAcceptLoading,
    isSuccess: isEventSuccess,
  } = useAcceptEventMutation();
  const { data: user } = useGetUser();
  const {
    mutate: acceptBusinessBooking,
    isLoading: isAcceptBusinessLoading,
    isSuccess: isEventBusinessSuccess,
  } = useManageBooking();

  const isBooking = data?.type === "booking";

  const onDelete = () => {
    if (isBooking) {
      changeView("cancel-booking");
    } else {
      deleteEvent({ _id: data?._id });
    }
  };
  const myConformation =
    booking?.collaborators?.find((el) => el?._id === user?.data?.data?._id)
      ?.status === "CONFIRMED";
  const onConfirm = () => {
    Alert.alert("Are you sure?", "Would you like to confirm your booking?", [
      {
        text: "Nevermind",
      },
      {
        text: "Confirm",
        onPress: () => {
          if (user?.data?.data?.role === "business") {
            acceptBusinessBooking(
              { bookingId: data?._id, status: "CONFIRMED" },
              {
                onSuccess: () => {
                  closeModal!();
                },
              }
            );
          } else {
            if (isBooking && data?.createdBy !== user?.data?.data?._id) {
              acceptBooking({
                bookingId: data?._id,
              });
            } else {
              acceptEvent({
                event: data?._id,
              });
            }
          }
        },
      },
    ]);
  };

  useEffect(() => {
    if (isSuccess || isEventSuccess) {
      Alert.alert(
        "Confirmed!",
        "Your booking has been confirmed.",

        [
          {
            text: "Continue",
            onPress: () => {
              setBooking({
                ...booking,
                collaborators: booking?.collaborators?.map((el) => {
                  return {
                    ...el,
                    status:
                      el?._id === user?.data?.data?._id
                        ? "CONFIRMED"
                        : el?.status,
                  };
                }),
              });
            },
          },
          {
            text: "Homepage",
            onPress: () => {
              closeModal!();
            },
          },
        ]
      );
    }
    if (isDeleteSuccess) {
      closeModal!();
    }
  }, [isSuccess, isDeleteSuccess, isEventSuccess]);

  return (
    <ScrollView>
      <Loading
        loading={
          isAcceptBookingLoading ||
          isAcceptLoading ||
          isDeleteLoading ||
          isAcceptBusinessLoading
        }
      />
      <View style={tailwind("px-6 flex-1 pt-8 pb-4")}>
        <View style={tailwind("flex-1")}>
          <View style={tailwind("flex-row items-center pb-2")}>
            <TouchableOpacity
              style={tailwind("flex items-start w-7 h-11 justify-center")}
              onPress={closeModal}
            >
              <Icon
                fill="#2E2E2E"
                name="back"
                stroke="none"
                width={10}
                height={20}
              />
            </TouchableOpacity>
            <Typography weight="medium" variant="2xl">
              {isBooking ? data?.business?.name : data?.title}
            </Typography>
          </View>

          <View style={[{ rowGap: 25 }]}>
            {
              <Image
                source={{
                  uri: getAssetUrl(
                    isBooking ? data?.venue?.coverPhoto?.[0] : data?.images?.[0]
                  ),
                }}
                resizeMode={(data?.venue?.coverPhoto?.[0] || data?.images?.[0]) ? "cover" : "contain"}
                style={[tailwind("rounded-xl"), { height: 158, width: "100%" }]}
                defaultSource={require("../../../../../assets/Images/logo-primary.png")}
              />
            }

            <BookingDetailsCard
              data={data}
              isBooking={isBooking ? true : false}
            />

            {data?.cancellationFee > 0 ? (
              <View style={[{ gap: 12 }]}>
                <Typography color="gray-400" variant="sm">
                  Cancellations made within 24 hours of the bookings at{" "}
                  {data?.business?.name}
                  will result in a fee of ${data?.cancellationFee} per person.
                </Typography>

                <Typography color="gray-400" variant="sm">
                  View Gooday's{" "}
                  <Button
                    title="Terms and Conditions"
                    variant="text"
                    className="h-5 px-0"
                    onPress={() =>
                      Linking.openURL(config.TERMS_CONDITION_PAGE_URL)
                    }
                  />{" "}
                  and{" "}
                  <Button
                    title="Privacy Policy. "
                    variant="text"
                    className="h-5 px-0"
                    onPress={() => Linking.openURL(config.PRIVACY_POLICY_URL)}
                  />
                  View the event venue's business policies.
                </Typography>
              </View>
            ) : null}
          </View>
        </View>
        {data?.type === "google" || data?.type === "microsoft" ? (
          <Button
            title={`${isBooking ? "Booking" : "Event"} Details`}
            color="secondary"
            onPress={() =>
              isBooking ? changeView("details") : changeView("details")
            }
            className="mt-10"
          />
        ) : (
          <View style={[{ rowGap: 24 }, tailwind("pt-10")]}>
            {data?.eventType === "unconfirmed" && !myConformation && (
              <Button title="Confirm" color="secondary" onPress={onConfirm} />
            )}

            <Button
              title={`${isBooking ? "Booking" : "Event"} Details`}
              color="secondary"
              onPress={() =>
                isBooking ? changeView("details") : changeView("details")
              }
            />
            {isBooking && (
              <Button
                title="Reschedule"
                color="secondary"
                onPress={() => changeView("edit")}
              />
            )}

            <Button
              title={`Cancel ${isBooking ? "Booking" : "Event"}`}
              color="secondary"
              loading={isDeleteLoading}
              disabled={isDeleteLoading}
              onPress={onDelete}
            />

            {isBooking && (
              <Button
                title="Contact Venue"
                color="secondary"
                onPress={() => changeView("contact-venue")}
              />
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};
