import { useMutation } from "react-query";
import Axios, { AxiosError, AxiosResponse } from "axios";
import { USER_PROFILE } from "@app/modules";

export const useProfileMutation = () => {

    return useMutation<AxiosResponse<any>, AxiosError, any>(
        USER_PROFILE,
        payload => Axios.put(payload?.url, payload?.data),
    );
};