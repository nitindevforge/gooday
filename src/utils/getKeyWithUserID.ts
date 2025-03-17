import { DAILY_BRIEFING } from "@app/api";
import { USER_SIGNUP_DETAILS } from "@app/modules";
import { storageService } from "@app/services";
import { getFormattedDate } from "./date";

export const getKeyWithUserID = async (key: string) => {
  const userData = await storageService.getItem(USER_SIGNUP_DETAILS);
  const user = JSON.parse(userData!);
  return `${key}${user?.user?._id}`;
};

export const getBriefing = async () => {
  const key = await getKeyWithUserID(DAILY_BRIEFING);
  const checkDailyBriefing = await storageService.getItem(key);
  const currentDate = getFormattedDate("L");
  if (checkDailyBriefing !== currentDate) {
    return true
  };
  return false
};
