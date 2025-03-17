import React, { FC } from "react";
import { DailyBriefingContainer } from "@app/modules";

export const DailyBriefingScreen: FC<{ showNextButton?: boolean }> = ({
  showNextButton = true,
}) => {
  return <DailyBriefingContainer showNextButton={showNextButton} />;
};
