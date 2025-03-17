import { ApiClient } from "@app/api";
import {
  useGoogleCalendarMutation,
  useIntegrations,
  useMicrosoftCalendarMutation,
} from "@app/modules";
import { Button, Loading } from "@app/ui";
import React from "react";
import { View } from "react-native";
import { AuthorizeResult } from "react-native-app-auth";
import { useTailwind } from "tailwind-rn";

export const SyncCalendarListContainer = () => {
  const tailwind = useTailwind();
  const { mutateAsync, isLoading } = useGoogleCalendarMutation();
  const { mutateAsync: microsoft, isLoading: isMicrosoft } =
    useMicrosoftCalendarMutation();
  const {
    data,
    refetch,
    isLoading: isIntegrationLoading,
    isRefetching,
  } = useIntegrations();

  const googleScopes = [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ];

  const getGoogleCalendar = async () => {
    const response = await ApiClient.Google.addScopes(googleScopes);
    await mutateAsync(
      { authorizationCode: response?.data?.serverAuthCode! },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const getMicrosoftCalendar = async () => {
    const token: AuthorizeResult | undefined =
      await ApiClient.Microsoft.getMicrosoftAccessToken();
    const expiryTime =
      Date.now() +
      Number(token?.tokenAdditionalParameters?.ext_expires_in) * 1000; // Calculate expiry time in milliseconds
    const payload = {
      accessToken: token?.accessToken!,
      refreshToken: token?.refreshToken!,
      expiryTime,
    };
    await microsoft(payload);
    refetch();
  };

  return (
    <View style={tailwind("flex-1")}>
      <Loading loading={isIntegrationLoading || isRefetching} />
      <Button
        radius="rounded-full"
        disabled={
          !!data?.data.data?.find(
            (element) => element?.integrationType === "google"
          )
        }
        onPress={getGoogleCalendar}
        variant="outline"
        icon="google-calendar"
        loading={isLoading}
        title={
          !data?.data.data?.find(
            (element) => element?.integrationType === "google"
          )
            ? "Google Calendar"
            : "Synced"
        }
      />
      <Button
        radius="rounded-full"
        disabled={
          !!data?.data.data?.find(
            (element) => element?.integrationType === "microsoft"
          )
        }
        onPress={getMicrosoftCalendar}
        variant="outline"
        className="mt-4"
        icon="outlook-calendar"
        title={
          !data?.data.data?.find(
            (element) => element?.integrationType === "microsoft"
          )
            ? "Outlook Calendar"
            : "Synced"
        }
        loading={isMicrosoft}
      />
    </View>
  );
};
