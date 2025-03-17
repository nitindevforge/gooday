import { useMutation } from "react-query";
import { SignupDto, SignupResponseDto } from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { USER_SIGNUP } from "@app/modules";

export const useUserSignupMutation = () => {
    return useMutation <AxiosResponse<SignupResponseDto>, AxiosError, SignupDto>(
        USER_SIGNUP,
        payload => ApiClient.Auth.authControllerSignUp(payload),
    );
};