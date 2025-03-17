import { useQuery } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { IntegrationsResponse } from "@gooday_corp/gooday-api-client";
import { INTEGRATION_LIST } from "@app/modules";

export const useIntegrations = () => {
  return useQuery<AxiosResponse<IntegrationsResponse>, AxiosError>(INTEGRATION_LIST, () =>
    ApiClient.Integration.integrationControllerFetchIntegration(),
  );
};