import { useMutation } from "react-query";
import {
  WaitlistPayloadDTO,
  WaitlistResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { WAITLIST_ADD } from "@app/modules";

export const useCreateWaitlistMutation = () => {
  return useMutation<
    AxiosResponse<WaitlistResponseDTO>,
    AxiosError,
    WaitlistPayloadDTO
  >(
    WAITLIST_ADD,
    (payload) => {
      return ApiClient.Waitlist.waitlistControllerAddWaitlist(payload)
    }
  );
};
