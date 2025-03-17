import { Typography } from "@app/ui";
import React from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";

export const TimeLineHeader = () => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind("flex flex-row")}>
      <View style={{ flex: 0.3, borderWidth: 0 }}></View>
      <View
        style={[
          { flex: 0.7, borderWidth: 0 },
          tailwind("flex flex-row items-center"),
        ]}
      >
        <View style={tailwind("flex-1 flex flex-row items-center")}>
          <View style={tailwind("flex-1 flex items-center")}>
            <Typography>Opens</Typography>
          </View>
          <View style={tailwind("w-6")}></View>
        </View>
        <View style={tailwind("flex-1 flex flex-row items-center")}>
          <View style={tailwind("flex-1 flex items-center")}>
            <Typography>Closes</Typography>
          </View>
          <View style={tailwind("w-6")}></View>
        </View>
      </View>
    </View>
  );
};
