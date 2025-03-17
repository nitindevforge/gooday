import React, { FC } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";
import Typography from "../Typography";
import Button from "../Button";
import { BriefingCardProps } from "./type";
import clsx from "clsx";

export const BriefingCard: FC<BriefingCardProps> = ({
  slide,
  removeItem,
  showButton = true,
}) => {
  const tailwind = useTailwind();

  return (
    <View
      key={slide?.id}
      style={[
        tailwind("bg-secondary-100 p-5 mr-2"),
        { borderRadius: 20, width: 340 },
      ]}
    >
      <Typography color="white" weight="medium" variant="sm">
        {slide?.title}
      </Typography>
      {/* <View
        style={[
          tailwind(
            clsx("flex-row justify-end mt-2", {
              "opacity-0": !showButton,
            })
          ),
          { columnGap: 10 },
        ]}
      >
        <Button
          color="secondary"
          title="Yes"
          size="small"
          className="bg-primary-100 rounded-xl"
        />
        <Button
          color="secondary"
          title="No"
          size="small"
          className="bg-primary-100 rounded-xl"
          onPress={() => {
            removeItem && removeItem(slide?.id!);
          }}
        />
      </View> */}
    </View>
  );
};
