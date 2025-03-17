import React, { FC } from "react";
import { DailyBriefingChatContainer } from "@app/modules";

export const DailyBriefingChatScreen: FC<{ showNextButton?: boolean }> = ({
  showNextButton = true,
}) => {
  return <DailyBriefingChatContainer showNextButton={showNextButton} />;
};
