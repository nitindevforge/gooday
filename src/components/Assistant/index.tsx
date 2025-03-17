import React, { useMemo } from "react";
import { AssistantProps } from "./type";
import { useAssistant, useGetUser } from "@app/modules";
import { Image } from "react-native";
import { getAssetUrl } from "@app/utils";

export const Assistant: React.FC<AssistantProps> = ({ id, profile = false, ...rest }) => {
  const { data } = useGetUser();
  const { data: assistantResponse } = useAssistant();

  const thumbnail = useMemo(() => {
    const assistantId = id || data?.data?.data?.assistant;
    const assistant =
      assistantResponse?.data?.data?.find((el) => el.id === assistantId) ??
      assistantResponse?.data?.data?.[0];
    return profile ? assistant?.profile : assistant?.thumbnail;
  }, [data, assistantResponse, id]);

  return (
    <Image
      source={
        rest?.group
          ? require("../../assets/Images/AvatarGroup.png")
          : { uri: getAssetUrl(thumbnail) }
      }
      {...rest}
    />
  );
};