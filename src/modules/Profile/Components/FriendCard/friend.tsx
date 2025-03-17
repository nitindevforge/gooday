import React from "react";
import { FriendProps } from "@app/modules";
import { Image, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Typography } from "@app/ui";
import { getAssetUrl } from "@app/utils";

export const FriendCard: React.FC<FriendProps> = ({ image, name }) => {
  const tailwind = useTailwind();
  return (
    <View
      style={[
        tailwind("flex-row justify-start items-center"),
        { columnGap: 32 },
      ]}
    >
      <Image
        resizeMode="cover"
        source={
          !image
            ? require("@app/assets/Images/profile.png")
            : {
                uri: getAssetUrl(image),
              }
        }
   
        style={[tailwind("rounded-full"), {
          width: 55,
          height: 55
        }]}
      />
      <View style={tailwind("flex-1")}>
        <Typography variant="base" weight="regular" className="capitalize">
          {name}
        </Typography>
      </View>
    </View>
  );
};
