import { useQuery } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { ASSISTANT_LIST, ASSISTANT_ME } from "@app/modules";
import { AssistantListResponse, MyAssistantResponse } from "@gooday_corp/gooday-api-client";

export const useAssistant = () => {
  return useQuery<AxiosResponse<AssistantListResponse>, AxiosError>(ASSISTANT_LIST, () =>
    ApiClient.AssistantAI.assistantControllerListAssistants(),
  );
};
  
export const useAssistantMe = () => {
  return useQuery<AxiosResponse<MyAssistantResponse>, AxiosError>(ASSISTANT_ME, () =>
    ApiClient.AssistantAI.assistantControllerMyAssistant(),
  );
};