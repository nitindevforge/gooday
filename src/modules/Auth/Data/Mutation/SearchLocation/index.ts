import { useMutation } from "react-query";
import { ApiClient } from "@app/api";
import { LocationEntityResponse } from "@gooday_corp/gooday-api-client";
import { AxiosError, AxiosResponse } from "axios";
import { LOCATION } from "@app/modules";

export const useSearchLocationMutation = () => {
  return useMutation<AxiosResponse<LocationEntityResponse>, AxiosError, string>(
    LOCATION,
    (payload) => ApiClient.Location.locationControllerFetchLocations(payload)
  );
};
