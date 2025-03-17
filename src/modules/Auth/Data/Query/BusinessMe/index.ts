import { useQuery } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { BUSINESS_ME } from "@app/modules";
import { BusinessOnBoardingResponseDTO } from "@gooday_corp/gooday-api-client";

export const useBusinessMe = () => {
  return useQuery<AxiosResponse<BusinessOnBoardingResponseDTO>, AxiosError>(BUSINESS_ME, () =>
    ApiClient.Business.businessControllerGetMe(),
  );
};
  