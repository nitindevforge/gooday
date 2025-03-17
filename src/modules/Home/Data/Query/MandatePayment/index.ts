import { useQuery, useQueryClient } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { BOOKING_EVENTS, MANDATE_PAYMENT } from "@app/modules";
import { StripeSetupIntentResponseDTO } from "@gooday_corp/gooday-api-client";

export const useGetMandatePaymentSecret = () => {
  const queryClient = useQueryClient();
  return useQuery<AxiosResponse<StripeSetupIntentResponseDTO>, AxiosError>(MANDATE_PAYMENT, () =>
    ApiClient.Plans.paymentControllerCreateSetupIntent(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(BOOKING_EVENTS);
      }
    }
  );
};
