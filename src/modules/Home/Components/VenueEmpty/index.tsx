import { Assistant } from "@app/components";
import { Typography } from "@app/ui";
import React, { FC } from "react";
import { Dimensions, View } from "react-native";
import { useTailwind } from "tailwind-rn";

export const VenueEmpty: FC<{ massage?: string }> = ({ massage }) => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind("px-6 flex-1 items-center")}>
      {massage ? (
        <Typography className="text-center">{massage}</Typography>
      ) : (
        <>
          <Typography className="text-center">
            It looks like businesses in this category haven’t joined Gooday yet,
            but they’re on our radar!
          </Typography>
          <Typography className="text-center mt-2">
            Search your favourite local business below and join the waitlist to
            be notified once they join.
          </Typography>
        </>
      )}
      <View style={tailwind("mt-3")}>
        <Assistant
          group
          style={{
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").height * 0.5,
            resizeMode: "contain",
          }}
        />
      </View>
    </View>
  );
};
