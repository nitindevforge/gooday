import { ApiClient } from "@app/api";
import {
  FindBookingResponseDTO,
  FindCustomerBookingPayload,
} from "@gooday_corp/gooday-api-client";
import { AxiosError, AxiosResponse } from "axios";
import { useInfiniteQuery } from "react-query";
import { CUSTOMER_BOOKING } from "@app/modules";

export const useCustomerBooking = (payload: {
  venue?: FindCustomerBookingPayload['venue'],
  whatsOn?: FindCustomerBookingPayload['whatsOn'],
}) => {
  return useInfiniteQuery<AxiosResponse<FindBookingResponseDTO>, AxiosError>(
    [...CUSTOMER_BOOKING, ...Object.values(payload)],
    ({ pageParam = 0 }) => ApiClient.Booking.bookingControllerListCustomerBooking({
      ...payload,
      page: pageParam + 1,
      pageSize: 10
    }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.data?.data?.length) {
          return pages?.length;
        }
        return undefined;
      },
    }
  );
};