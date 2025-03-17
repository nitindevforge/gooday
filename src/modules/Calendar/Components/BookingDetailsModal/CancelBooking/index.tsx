import { Button, Icon, Input, LoadingUi, Typography } from "@app/ui";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import {
  useCancelBookingMutation,
  useGetUser,
  useLeaveBookingMutation,
} from "@app/modules";
import { useTailwind } from "tailwind-rn";
import { BookingEditProps } from "./type";
import { BookingCancelCard } from "../../BookingCancelCard";

export const CancelBooking: React.FC<BookingEditProps> = ({ data: booking, changeView, closeModal, reset }) => {
  const tailwind = useTailwind();
  const { mutate: leaveBooking, isLoading: isLeaveLoading, isSuccess: isLeaveBookingSuccess } =
    useLeaveBookingMutation();
  const { mutate: cancelBooking, isLoading: isCancelLoading, isSuccess: isCancelBookingSuccess } =
    useCancelBookingMutation();
  const { data: user } = useGetUser();
  const [reason, setReason] = useState<string>('')

  const onDelete = () => {
    changeView!('cancel-booking')
    if (booking?.createdBy.toString() === user?.data?.data?._id.toString()) {
      cancelBooking({
        booking: booking?._id,
        reason: reason
      })
    } else {
      leaveBooking({
        booking: booking?._id,
      })
    }
  }


  useEffect(() => {
    if (isCancelBookingSuccess || isLeaveBookingSuccess) {
      reset!()
    }
  }, [isCancelBookingSuccess, isLeaveBookingSuccess])

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <LoadingUi loading={isLeaveLoading || isCancelLoading} />
      <View style={tailwind("px-6 flex-1  mt-4")}>
        <View style={tailwind("flex-1")}>
          <View style={tailwind("flex-row items-center")}>
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
              Cancel Booking
            </Typography>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={tailwind("flex-1")}>
            <View style={[{ gap: 24 }]}>
              <BookingCancelCard data={booking} />
              {booking?.cancellationFee > 0 ? (
                <View style={[{ gap: 12, marginTop: 22 }]}>
                  <Typography color="black" variant="sm">
                    Cancellations made within 24 hours of the bookings at {booking?.business?.name}
                    will result in a fee of ${booking?.cancellationFee} per
                    person.
                  </Typography>

                </View>
              ) : null}
              <Input
                label="Cancel reasons (Optional)"
                multiline
                height={166}
                onChangeText={setReason}
                value={reason}
                textAlignVertical="top"
                placeholder="Please let us know your reasons for cancelling so we can learn from your feedback and improve in the future."
              />
            </View>
          </ScrollView>
        </View>
        <Button
          loading={false}
          disabled={!booking && true}
          onPress={onDelete}
          className="mb-4"
          title="Cancel Booking"
        />
      </View>
    </SafeAreaView>
  );
};
