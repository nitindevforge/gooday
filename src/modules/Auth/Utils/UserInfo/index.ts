import { AUTH_TOKEN_STORAGE_KEY } from "@app/api";
import { storageService } from "@app/services";
import { USER_SIGNUP_DETAILS } from "@app/modules";

export const setUserItem = async (data:any) => {
  await storageService.setItem(AUTH_TOKEN_STORAGE_KEY, data?.accessToken);
  await storageService.setItem(USER_SIGNUP_DETAILS, JSON.stringify(data));
};
