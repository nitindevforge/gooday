import { useFormik } from "formik";
import { addBookingValidationSchema } from "../Utils";
import {
  AddBookingModal,
  useCreateBookingMutation,
  useBusinessMe,
  useGetMandatePaymentSecret,
} from "@app/modules";
import NiceModal from "@ebay/nice-modal-react";
import { useState } from "react";
import { Alert } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { getFormattedDate } from "@app/utils";

export const useAddBooking = (cancellationFee?: number) => {
  const { mutate, isLoading } = useCreateBookingMutation(() => {
    form?.resetForm();
    NiceModal?.hide(AddBookingModal);
  });
  const { data: business } = useBusinessMe();
  const { confirmSetupIntent } = useStripe(); // Stripe hook
  const [isPaymentProcessing, setPaymentProcessing] = useState<boolean>(false);
  const { data: mandateSecrets, isLoading: isMandateLoading } =
    useGetMandatePaymentSecret();
  const businessDetails = business?.data?.data;

  const onBooking = (values: any, setupIntent?: any) => {
    const payload = {
      ...values,
      from: getFormattedDate("HH:mm", values?.from),
      to: getFormattedDate("HH:mm", values?.to),
      business: businessDetails?._id,
      calendar: null,
      collaborators:
        Array.from({ length: values?.people }, (_, i) => ({
          name: i === 0 ? values?.customerName : null,
          email: i === 0 ? values?.email : null,
          mobile: i === 0 ? values?.phoneNumber : null,
          goodayId: values?.goodayIds[i] || null,
          _id: null,
        })) || [],
      occasion: null,
      paymentMethodId: setupIntent?.paymentMethod?.id ?? "",
    };
    mutate(payload, {
      onError: (error) => {
        console.log('error', error?.response?.data?.message)
      }
    });
  }

  const form = useFormik({
    initialValues: {
      title: "",
      calendar: "",
      customerName: "",
      email: "",
      date: "",
      from: "",
      to: "",
      note: "",
      people: 1,
      phoneNumber: "",
      venue: "",
      customers: [],
      method: "APP",
      goodayIds: [],
      cardDetails: null,
    },
    validationSchema: addBookingValidationSchema,
    onSubmit: async (values) => {
      setPaymentProcessing(true);
      if (cancellationFee! > 0) {
        if (!values?.cardDetails?.complete) {
          Alert.alert(
            "Card details are incomplete",
            "Please enter complete card details."
          );
          setPaymentProcessing(false);
          return;
        }
      }
      try {
        if (cancellationFee! > 0) {
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
          onBooking(values, setupIntent)
        } else {
          onBooking(values)
        }

      } catch (err) {
        setPaymentProcessing(false);
        Alert.alert(
          "Error",
          "An error occurred while processing your payment."
        );
      }
    },
  });

  return { form, isLoading: isPaymentProcessing || isLoading };
};
