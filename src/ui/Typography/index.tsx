import React, { PropsWithChildren } from "react";
import { Text } from "react-native";
import {
  TypographyColor,
  TypographyProps,
  TypographyVariant,
  TypographyWeight,
} from "./type";
import { useTailwind } from "tailwind-rn";
import clsx from "clsx";

const getFontSize = (variant: TypographyVariant) => {
  switch (variant) {
    // case "p":
    //   return "text-p";

    case "9":
      return "text-9";

    case "10":
      return "text-10";

    case "11":
      return "text-11";

    case "13":
      return "text-13";

    case "15":
      return "text-15";

    case "17":
      return "text-17";

    // case "xs":
    //   return "text-xs";

    case "sm":
      return "text-sm";

    case "base":
      return "text-base";

    case "lg":
      return "text-lg";

    case "xl":
      return "text-xl";

    case "2xl":
      return "text-2xl";

    case "3xl":
      return "text-3xl";

    case "4xl":
      return "text-4xl";

    case "5xl":
      return "text-5xl";

    case "32":
      return "text-[32px]";

    default:
      return "text-sm"
  }
};

const getFontWeight = (weight: TypographyWeight) => {
  switch (weight) {
    case "thin":
      return "font-thin";

    case "extralight":
      return "font-extralight";

    case "light":
      return "font-light";

    case "regular":
      return "font-normal";

    case "medium":
      return "font-medium";

    case "semibold":
      return "font-semibold";

    case "bold":
      return "font-bold";

    case "heavy":
      return "font-extrabold";

    case "black":
      return "font-black";
  }
};

const getColor = (color: TypographyColor) => {
  switch (color) {
    case "primary-100":
      return "text-primary-100";

    case "primary-200":
      return "text-primary-200";

    case "primary-300":
      return "text-primary-300";

    case "secondary-100":
      return "text-secondary-100";

    case "secondary-200":
      return "text-secondary-200";

    case "secondary-300":
      return "text-secondary-300";

    case "secondary-400":
      return "text-secondary-400";

    case "secondary-500":
      return "text-secondary-500";

    case "secondary-600":
      return "text-secondary-600";

    case "gray-100":
      return "text-gray-100";

    case "gray-200":
      return "text-gray-200";

    case "gray-300":
      return "text-gray-300";

    case "gray-400":
      return "text-gray-400";

    case "gray-500":
      return "text-gray-500";

    case "gray-600":
      return "text-gray-600";

    case "gray-700":
      return "text-gray-700";

    case "info":
      return "text-info";

    case "success":
      return "text-success";

    case "warning":
      return "text-warning";

    case "error":
      return "text-error";

    case "black":
      return "text-black";

    case "white":
      return "text-white";

    case "dark-red":
      return "text-dark-red";

    case "dark-m":
      return "text-dark-m";
  }
};

const Typography: React.FC<PropsWithChildren<TypographyProps>> = ({
  variant = "base",
  weight = "regular",
  color = "black",
  className,
  children,
  styles = {},
  ...rest
}) => {

  const tailwind = useTailwind();
  return (
    <Text
      {...rest}
      style={[
        tailwind(
          clsx(
            getFontSize(variant),
            getFontWeight(weight),
            getColor(color),
            className
          )
        ),
        styles,
      ]}
    >
      {children}
    </Text>
  );
};

export default Typography;
