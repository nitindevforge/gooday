import { useMutation } from "react-query";
import { ApiClient } from "@app/api";
import { LocationCoordinatesResponse } from "@gooday_corp/gooday-api-client";
import { AxiosError, AxiosResponse } from "axios";
import { COORDINATES } from "@app/modules";
import { AutoCompleteItem } from "@app/ui";

export const useGetLocationCoordinatesMutation = () => {
  return useMutation<AxiosResponse<LocationCoordinatesResponse>, AxiosError, AutoCompleteItem>(
    COORDINATES,
    (payload) => ApiClient.Location.locationControllerFetchCoordinates(payload.value, payload?.label)
  );
};
