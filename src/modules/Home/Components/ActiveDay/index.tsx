import { Typography } from "@app/ui";
import { getFormattedDate } from "@app/utils";
import React, { FC } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";

export const ActiveDay: FC<{ today: Date }> = ({ today }) => {
  const tailwind = useTailwind();
  return (
    <View style={[tailwind("flex-row items-end -mb-1"), { columnGap: 10 }]}>
      <View style={{ height: 40 }}>
        <Typography
          weight="medium"
          color="black"
          styles={{ fontSize: 47, lineHeight: 45 }}
        >
          {getFormattedDate("DD", today)}
        </Typography>
      </View>
      <View>
        <Typography variant="lg" weight="medium" className="-mb-2">
          {getFormattedDate("ddd", today)}
        </Typography>
        <Typography variant="lg" weight="medium">{`${getFormattedDate(
          "MMMM",
          today
        )} ${getFormattedDate("YYYY", today)}`}</Typography>
      </View>
    </View>
  );
};
