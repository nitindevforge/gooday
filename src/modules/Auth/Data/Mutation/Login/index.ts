import { useMutation } from "react-query";
import { SignInDto, SignupResponseDto } from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { USER_LOGIN } from "@app/modules";

export const useLoginMutation = () => {
    return useMutation <AxiosResponse<SignupResponseDto>, AxiosError, SignInDto>(
        USER_LOGIN,
        payload => ApiClient.Auth.authControllerSignIn(payload),
    );
};