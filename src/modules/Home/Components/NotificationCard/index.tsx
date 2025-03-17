import React from "react";
import { Image, Platform, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { NotificationCardProps } from "./type";
import { Button, Typography } from "@app/ui";
import { useNotificationActionMutation } from "@app/modules";
import { getAssetUrl } from "@app/utils";
export const NotificationCard: React.FC<NotificationCardProps> = ({
  item,
  onRead,
  loading = false,
}) => {
  const tailwind = useTailwind();
  const { mutate, isLoading } = useNotificationActionMutation(() => {
    onRead!(item?._id);
  });
  const onReadNotification = () => {
    if (!item?.actions?.length) {
      onRead!(item?._id);
    }
  };
  const onAction = (action: string) => {
    mutate({ trigger: action, data: { ...item?.["metaData"] } });
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={item?.isRead}
      onPress={onReadNotification}
      style={tailwind("")}
    >
      <View
        style={[
          tailwind("flex-row items-start justify-start mt-4"),
          {
            gap: 24,
          },
        ]}
      >
        <Image
          style={[
            { width: 45, height: 45, borderWidth: 1.5, borderColor: "white" },
            tailwind("rounded-full"),
          ]}
          source={item?.metaData?.senderProfile ? {
            uri: `${getAssetUrl(
              item?.metaData?.senderProfile
            )}?date=${Platform.select({
              ios: new Date().getTime()
            })}`,
          } : require("../../../../assets/Images/profile.png")}
          defaultSource={require("../../../../assets/Images/profile.png")}
        />
        <View style={tailwind("flex-1")}>
          <Typography weight="regular" color="black" variant="sm">
            {item?.content}
          </Typography>
          <View style={[tailwind("flex-row mt-4"), { gap: 6 }]}>
            {!item?.isRead &&
              item?.actions?.map((element) => {
                return (
                  <Button
                    loading={isLoading || loading}
                    color={element?.color}
                    onPress={() => onAction(element?.target)}
                    title={element?.label}
                  />
                );
              })}
          </View>
        </View>
        {!item?.isRead && (
          <View style={[tailwind("bg-error w-2 h-2 rounded-full")]} />
        )}
      </View>
    </TouchableOpacity>
  );
};
