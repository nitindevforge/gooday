import { HomeActivityTrackerState } from "./type";
import { View } from "react-native";
import { Typography } from "@app/ui";
import { useTailwind } from "tailwind-rn";

export const CustomActivityCard: React.FC<{
  rowData: HomeActivityTrackerState;
}> = ({ rowData }) => {
  const { title, time, location, friends } = rowData;
  const tailwind = useTailwind();

  return (
    <View>
      <Typography weight="medium" variant="xs" color="gray-300">
        {time}
      </Typography>
      <Typography weight="medium" numberOfLines={1}>
        {title}
      </Typography>
      {!!location && (
        <Typography
          weight="medium"
          numberOfLines={1}
          variant="sm"
          color="gray-400"
        >
          @ {location}
        </Typography>
      )}
      {!!friends && (
        <Typography
          weight="medium"
          numberOfLines={1}
          variant="base"
          color="gray-400"
        >
          With {friends}
        </Typography>
      )}
    </View>
  );
};
