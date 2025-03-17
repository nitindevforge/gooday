import { bookingInitialValues, useUserBooking } from "@app/common";
import { useCreateBookingMutation, usePrepaidServiceAvailabilityMutation, useRegularBookingAvailabilityMutation, useStripeBookingPaymentMutation, useStripePaymentMutation, useWhatsOnDiscountAvailabilityMutation } from "../Data";
import { useStripe } from "@stripe/stripe-react-native";
import { BookingEntity, BookingPaymentCreateResponseDTO, UserEntity } from "@gooday_corp/gooday-api-client";
import { Alert } from "react-native";
import { getBookingTitle } from "@app/utils";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeNavigationParamList } from "../Navigation";
import { useEditBookingMutation } from "@app/modules";
import { useState } from "react";

export const useBookingAvailabilityCheck = (user: UserEntity, discountId?: string) => {
  const [bookingDetails, setBooking] = useState<BookingEntity | null>(null);
  const [bookingPayment, setBookingPayment] = useState<object | null>(null);
  const { mutate: onDiscountAvailability, isLoading: isWhatsOnLoading } = useWhatsOnDiscountAvailabilityMutation();
  const { mutate: onBooking, isLoading: isBookingLoading } = useStripePaymentMutation();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { mutate: onCreateBooking, isLoading } = useCreateBookingMutation();
  const { booking, resetBooking, updateBooking } = useUserBooking();
  const { mutate: onPrePaidServiceAvailability, isLoading: isPrePaidServiceLoading } = usePrepaidServiceAvailabilityMutation();
  const { mutateAsync: onRegularBookingAvailability, isLoading: isRegularServiceLoading } = useRegularBookingAvailabilityMutation();
  const { mutate: onUpdateBooking, isLoading: isBookingUpdateLoading } = useEditBookingMutation(bookingDetails?._id ?? '');

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();
  const onPayment = async (
    item: BookingPaymentCreateResponseDTO["data"],
    bookingDetails: BookingEntity
  ) => {
    const customAppearance = {
      font: {
        scale: 1.15,
      },
      shapes: {
        borderRadius: 12,
        borderWidth: 0.5,
      },
      primaryButton: {
        shapes: {
          borderRadius: 20,
        },
      },
      colors: {
        background: "#ffffff",
        componentDivider: "#000000",
        primaryText: "#000000",
        secondaryText: "#000000",
        componentText: "#000000",
        placeholderText: "#73757b",
      },
    };
    const { error: errors } = await initPaymentSheet({
      appearance: customAppearance,
      customerId: item?.customer,
      merchantDisplayName: "Gooday",
      primaryButtonLabel: `${item?.subscriptionId ? 'Subscribe for' : 'Pay'} ${item?.currencySymbol} ${item?.price} ${item?.frequency ? `/${item?.frequency}` : ''}`,
      customerEphemeralKeySecret: item?.ephemeralKey,
      paymentIntentClientSecret: item?.paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: (user?.nickName || user?.firstName)!,
        email: user?.email!,
      },
    });

    if (!errors) {
      const { error } = await presentPaymentSheet();
      if (error) {
        Alert.alert(
          "Error",
          "Something went wrong! Please contact to our support team at info@gooday.com.au"
        );
      } else {
        let payload = {};
        if (booking.isRecurring) {
          payload = {
            paymentMethod: {
              paymentId: item?.paymentId,
              customer: item?.customer,
              ephemeralKey: item?.ephemeralKey,
              paymentIntent: item?.paymentIntent,
              subscriptionId: item?.subscriptionId ?? ''
            },
            paymentMethodId: item?.paymentId
          }
        } else {
          payload = {
            paymentMethodId: item?.paymentId
          }
        }

        onUpdateBooking({
          ...payload,
          title: bookingDetails?.title,
          venue: booking?.venue,
          business: booking?.business,
          collaborators: bookingDetails?.collaborators,
          customers: bookingDetails?.customers as unknown as string[],
          method: bookingDetails?.method,
          quantity: bookingDetails?.quantity,
          date: bookingDetails?.startDate
        }, {
          onSuccess: () => {
            setBooking(null);
            setBookingPayment({})
            navigation?.replace("CONFIRMATION", {
              bookingID: bookingDetails?._id,
            });
            resetBooking();
          },
          onError: (error) => {
            console.log('error', error.response?.data?.message)
          }
        })
      }
    } else {
      Alert.alert(
        "Error",
        "Something went wrong! Please contact to our support team at info@gooday.com.au"
      );
    }
  };
  const onRegularBooking = async () => {
    await onRegularBookingAvailability(
      {
        endDate: booking?.endDate?.toString()!,
        startDate: booking?.startDate?.toString()!,
        noOfPeople: booking?.collaborators?.length,
        id: booking?.venue
      },
      {
        onSuccess: (response) => {
          if (response?.data?.isBookingAllowed) {
            const payload = {
              ...booking,
              collaborators: booking?.collaborators ?? [],
              services: [],
            };
            onCreateBooking(payload, {
              onSuccess(data) {
                navigation?.replace("CONFIRMATION", {
                  bookingID: data?.data?.data?._id,
                });
                updateBooking(bookingInitialValues);
              },
              onError: async (error) => {
                Alert.alert(
                  "Error",
                  error.response?.data?.message || "Something went wrong!!"
                );
              },
            });
          } else {
            Alert.alert(response?.data?.message)
          }
        }
      }
    );
  }
  const onGoodayBooking = async () => {
    const payload = {
      ...booking,
      collaborators: booking?.collaborators ?? [],
      title: getBookingTitle({
        business: booking?.venueObj?.business,
        user: user,
      }),
    };
    onCreateBooking(payload, {
      onSuccess(data) {
        setBooking(data?.data?.data as unknown as BookingEntity);
        onBooking(
          {
            id: data?.data?.data?._id
          },
          {
            onSuccess: (response) => {
              setBookingPayment(response?.data?.data);
              onPayment(response?.data?.data, data?.data?.data as unknown as BookingEntity);
            },
          }
        );
      },
      onError: async () => {
        Alert.alert(
          "Error",
          "Something went wrong! Please contact to our support team at info@gooday.com.au"
        );
      },
    });
  }

  const onPrepaidBooking = async () => {
    onPrePaidServiceAvailability(
      {
        endDate: booking?.endDate?.toString()!,
        startDate: booking?.startDate?.toString()!,
        noOfPeople: booking?.collaborators?.length,
        id: booking?.serviceId ?? '',
        staff: booking?.selectedStaff ?? ''
      },
      {
        onSuccess: async (response) => {
          if (response?.data?.isBookingAllowed) {
            await onGoodayBooking()
          } else {
            Alert.alert(response?.data?.message)
          }
        }
      }
    )
  }
  const mutate = async () => {
    if (bookingDetails?._id) {
      onPayment(bookingPayment, bookingDetails as unknown as BookingEntity);
    } else {
      if (booking.whatsOn) {
        onDiscountAvailability(
          {
            endDate: booking?.endDate?.toString()!,
            startDate: booking?.startDate?.toString()!,
            noOfPeople: booking?.collaborators?.length,
            id: booking?.whatsOn
          },
          {
            onSuccess: async (response) => {
              if (response?.data?.isBookingAllowed) {
                await onGoodayBooking()
              } else {
                Alert.alert(response?.data?.message)
              }
            },
          })
      } else if (booking.serviceId) {
        await onPrepaidBooking();
      } else if (booking?.venueObj?.business?.cancellationFee! > 0) {
        navigation?.navigate("PAYMENT");
      } else {
        await onRegularBooking()
      }
    }
  }

  return {
    mutate,
    isLoading: (isLoading || isBookingUpdateLoading || isWhatsOnLoading
      || isBookingLoading || isPrePaidServiceLoading || isRegularServiceLoading
    )
  }
}