import { useMutation } from "react-query";
import { SignupDto, SignupResponseDto } from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { BUSINESS_SIGNUP } from "@app/modules";

export const useBusinessSignupMutation = () => {
    return useMutation <AxiosResponse<SignupResponseDto>, AxiosError, SignupDto>(
        BUSINESS_SIGNUP,
        payload => ApiClient.Auth.authControllerBusinessRegister(payload),
    );
};