import { useMutation } from "react-query";
import { VerifyOTPPayloadDTO, VerifyOTPResponseDTO } from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { USER_VERIFY } from "@app/modules";

export const useOtpVerifyMutation = () => {
    return useMutation<AxiosResponse<VerifyOTPResponseDTO>, AxiosError, VerifyOTPPayloadDTO>(
        USER_VERIFY,
        payload => ApiClient.Auth.authControllerVerifyOTP(payload),
    );
};