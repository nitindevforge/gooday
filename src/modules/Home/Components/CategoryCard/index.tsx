import React, { FC } from "react";
import { CategoryCardProps } from "./type";
import { Typography } from "@app/ui";
import { ImageBackground, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import clsx from "clsx";
import { getAssetUrl } from "@app/utils";

export const CategoryCard: FC<CategoryCardProps> = ({
  title,
  bgImage,
  onPress,
  style,
}) => {
  const tailwind = useTailwind();

  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <ImageBackground
        source={{ uri: getAssetUrl(bgImage) }}
        resizeMode="cover"
        style={[
          tailwind(
            clsx(
              "rounded-2xl overflow-hidden h-25 items-center justify-center my-2"
            )
          ),
          style,
        ]}
      >
        <Typography color="white" variant="2xl" weight="medium">
          {title || "Favourites"}
        </Typography>
      </ImageBackground>
    </TouchableOpacity>
  );
};
