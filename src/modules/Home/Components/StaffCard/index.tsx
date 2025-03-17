import { Typography } from "@app/ui";
import React, { FC, useMemo } from "react";
import { Image, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { BusinessStaffEntity } from "@gooday_corp/gooday-api-client";
import { getAssetUrl, getFormattedDate } from "@app/utils";

export const StaffCard: FC<{ item: BusinessStaffEntity; todayDate: Date }> = ({
  item,
  todayDate,
}) => {
  const tailwind = useTailwind();

  const time = useMemo(() => {
    const today = getFormattedDate("dddd", todayDate);
    const todaySlots = item?.availability?.find((el) => el.day === today);
    if (todaySlots && todaySlots.enabled) {
      return todaySlots.slots;
    }
    return [];
  }, [item?.availability, todayDate]);

  return (
    <View
      style={[
        tailwind("flex-row items-center py-5"),
        {
          columnGap: 30,
          borderBottomWidth: 1.5,
          borderBottomColor: "#EFEFEF",
        },
      ]}
    >
      <View>
        <Image
          style={{ width: 33, height: 33 }}
          source={{ uri: getAssetUrl(item?.profilePicture) }}
          defaultSource={require("../../../../assets/Images/profile.png")}
        />
      </View>
      <View>
        <Typography weight="medium">
          {item?.firstName} {item?.lastName}
        </Typography>
        {time.map((el) => (
          <Typography key={el.from + el.to} variant="sm">
            {el.from} - {el.to}
          </Typography>
        ))}
      </View>
    </View>
  );
};
