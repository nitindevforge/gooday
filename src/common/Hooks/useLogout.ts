import {
  getDeviceInfo,
  useActiveTodo,
  useUserLogoutMutation,
} from "@app/modules";
import { Alert } from "react-native";
import { useNavigationRoute } from "./useNavigationRoute";
import { queryClient } from "../../index";
import { storageService } from "@app/services";
import { DAILY_ALERT, DAILY_BRIEFING } from "@app/api";
import { getKeyWithUserID } from "@app/utils";

export const useLogout = () => {
  const { resetRouteState } = useNavigationRoute();
  const { mutate, isLoading } = useUserLogoutMutation();
  const { setActiveTodo } = useActiveTodo();

  const userLogout = async (cb?: () => void) => {
    const identifier = (await getDeviceInfo()).identifier;
    mutate(
      { identifier },
      {
        onSuccess: async () => {
          resetRouteState();
          queryClient.clear();
          setActiveTodo(null);
          const key = await getKeyWithUserID(DAILY_BRIEFING);
          await storageService.clearAll([key, DAILY_ALERT]);
          if (cb) cb();
        },
        onError: (error) => {
          Alert.alert(
            "Error",
            error.response?.data?.message || "Something went wrong!!"
          );
        },
      }
    );
  };

  return { userLogout, isLoading };
};
