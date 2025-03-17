import { useMutation } from "react-query";
import {
  BookingPaymentPayloadDTO,
  BookingPaymentCreateResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { STRIPE_PAYMENT } from "@app/modules";

export const useStripePaymentMutation = () => {
  return useMutation<
    AxiosResponse<BookingPaymentCreateResponseDTO>,
    AxiosError,
    BookingPaymentPayloadDTO
  >(
    STRIPE_PAYMENT,
    (payload) => {
      return ApiClient.Payment.paymentControllerSetupBookingPayment(payload);
    }
  );
};
