import { useQuery } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { EMPLOYEE_SIZE } from "@app/modules";
import { EmployeesSizeListResponse } from "@gooday_corp/gooday-api-client";

export const useEmployeesSize = () => {
  return useQuery<AxiosResponse<EmployeesSizeListResponse>, AxiosError>(
    EMPLOYEE_SIZE,
    () => ApiClient.Business.businessTypeControllerListEmployeesSize()
  );
};
