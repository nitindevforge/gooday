import { Button, Loading, PaymentCard, ProgressBar, Typography } from "@app/ui";
import React, { Fragment, useState } from "react";
import { Alert, SafeAreaView, View, useColorScheme } from "react-native";
import {
  HeaderWithLogo,
  HomeNavigationParamList,
  useCreateBookingMutation,
  useGetMandatePaymentSecret,
  useGetUser,
  useRegularBookingAvailabilityMutation,
} from "@app/modules";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUserBooking } from "@app/common";
import { useStripe } from "@stripe/stripe-react-native";


export const PaymentDetailsContainer = () => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();
  const { booking, resetBooking } = useUserBooking();
  const { data } = useGetUser();
  const { mutate, isLoading: isBookingLoading } = useCreateBookingMutation();
  const { confirmSetupIntent } = useStripe(); // Stripe hook
  const [cardDetails, setCardDetails] = useState<any>(null);
  const [isPaymentProcessing, setPaymentProcessing] = useState<boolean>(false);
  const { data: mandateSecrets, isLoading: isMandateLoading } =
    useGetMandatePaymentSecret();
  const { mutate: onRegularBookingAvailability } = useRegularBookingAvailabilityMutation(() => {
    setPaymentProcessing(false)
  });
  const color = useColorScheme();

  const onNextPress = async () => {
    setPaymentProcessing(true);
    if (!cardDetails?.complete) {
      Alert.alert(
        "Card details are incomplete",
        "Please enter complete card details."
      );
      setPaymentProcessing(false);
      return;
    }
    onRegularBookingAvailability(
      {
        endDate: booking?.endDate?.toString()!,
        startDate: booking?.startDate?.toString()!,
        noOfPeople: booking?.collaborators?.length,
        id: booking?.venue
      },
      {
        onSuccess: async () => {
          try {
            const clientSecret = mandateSecrets?.data?.data?.clientSecret ?? "";
            const { error, setupIntent } = await confirmSetupIntent(clientSecret, {
              paymentMethodType: "Card",
            });

            if (error) {
              setPaymentProcessing(false);
              Alert.alert(
                "Error",
                error.message || "There was an error processing the payment."
              );
              return;
            }

            setPaymentProcessing(false);
            const payload = {
              ...booking,
              collaborators: (booking?.collaborators ?? []),
              paymentMethodId: setupIntent.paymentMethod?.id,
            };
            mutate(payload, {
              onSuccess(data) {
                resetBooking();
                navigation?.replace("CONFIRMATION", {
                  bookingID: data?.data?.data?._id,
                });
              },
              onError: async (error) => {
                Alert.alert(
                  "Error",
                  "Something went wrong! Please contact to our support team at info@gooday.com.au"
                );
              },
            });
          } catch (err) {
            setPaymentProcessing(false);
            Alert.alert("Error", "An error occurred while processing your payment.");
          }
        }
      }
    )
  };

  const isLoading = isBookingLoading || isMandateLoading || isPaymentProcessing;

  return (
    <Fragment>
      <Loading loading={isLoading} />

      <SafeAreaView style={tailwind("flex-1")}>
        <View style={tailwind("px-6 flex-1")}>
          <View>
            <ProgressBar progress={90} className="mt-4" />
            <HeaderWithLogo
              title="Add Payment Details"
              subtitle={booking?.venueObj?.business?.name || "test"}
              className="mt-6"
            />
            <View style={tailwind("mt-8")}>
              <Typography weight="medium" variant="sm">
                Payment details are required to make a booking
              </Typography>
              <PaymentCard
                onSubmit={(cardDetails) => {
                  setCardDetails(cardDetails);
                }}
              />
            </View>
          </View>
          <View>
            <Typography weight="medium" variant="sm" color="gray-400">
              Cancellations made within 24 hours of the booking will result in a
              fee of ${booking?.venueObj?.business?.cancellationFee} per person.
              More information can be read in our{" "}
              <Typography
                onPress={() => navigation?.navigate("TERMS_AND_CONDITION")}
                weight="medium"
                variant="sm"
                color="gray-400"
              >
                terms and conditions.
              </Typography>
            </Typography>
            <Button
              loading={false}
              disabled={false}
              onPress={onNextPress}
              className="mb-2 mt-4"
              title="Next"
            />
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};
