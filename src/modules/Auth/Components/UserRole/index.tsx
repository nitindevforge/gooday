import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Typography } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { shadowStyles } from "@app/modules";
import { UserRoleProps } from "./type";
import clsx from "clsx";

const UserRole: React.FC<UserRoleProps> = ({ isBusiness }) => {
  const tailwind = useTailwind();

  const image = isBusiness
    ? require("../../../../assets/Images/business.png")
    : require("../../../../assets/Images/personal.png");

  const styles = StyleSheet.create({
    personal: {
      width: 125,
      height: 153,
    },
    business: {
      width: 183.53,
      height: 118.54,
      marginBottom: 55,
    },
  });

  return (
    <View style={[tailwind(clsx("flex-col items-center -top-4"))]}>
      <Image
        source={image}
        style={isBusiness ? styles.business : styles.personal}
      />
      <Typography
        styles={shadowStyles.textWithShadow}
        className={clsx("capitalize", {
          "mt-8": !isBusiness,
        })}
        variant="2xl"
        weight="medium"
        color="white"
      >
        {!isBusiness ? "Personal" : "Business"}
      </Typography>
    </View>
  );
};

export default UserRole;
