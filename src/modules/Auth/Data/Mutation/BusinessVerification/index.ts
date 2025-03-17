import { useMutation } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { BUSINESS_NUMBER_VERIFICATION } from "@app/modules";
import {
  BusinessVerificationControllerABNVerificationTypeEnum,
  BusinessVerificationResponse,
} from "@gooday_corp/gooday-api-client";

export const useBusinessVerificationMutation = () => {
  return useMutation<
    AxiosResponse<BusinessVerificationResponse>,
    AxiosError,
    {
      type: BusinessVerificationControllerABNVerificationTypeEnum;
      businessNumber: string;
    }
  >(BUSINESS_NUMBER_VERIFICATION, (payload) =>
    ApiClient.Business.businessVerificationControllerABNVerification(
      payload.type,
      payload?.businessNumber
    )
  );
};
