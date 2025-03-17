import { Typography } from "@app/ui";
import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { RoleCardProps } from "./type";
import clsx from "clsx";
import { shadowStyles } from "@app/modules";

const styles = StyleSheet.create({
  Personal: {
    width: 84,
    height: 103,
  },
  Business: {
    width: 134,
    height: 87,
  },
});

const RoleCard: React.FC<RoleCardProps> = ({
  onPress,
  className,
  checked,
  role,
}) => {
  const tailwind = useTailwind();
  return (
    <View
      style={[
        checked && shadowStyles.dropShadow,
        tailwind(clsx("flex-1", className)),
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={tailwind(clsx("w-full h-full rounded-3xl overflow-hidden"))}
      >
        <ImageBackground
          source={role.bgImage}
          resizeMode="cover"
          style={tailwind("w-full h-full")}
        >
          <View
            style={tailwind(
              "flex-col items-center justify-between py-8 flex-1 pt-12"
            )}
          >
            <Image style={styles?.[role.title]} source={role.image} />
            <View>
              <Typography variant="2xl" weight="medium" color="white">
                {role.title}
              </Typography>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default RoleCard;
