import React, { useCallback, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ButtonProps } from "./type";
import { Icon, Typography } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import clsx from "clsx";
import { useNavigationRoute } from "@app/common";

const Button: React.FC<ButtonProps> = ({
  title,
  size = "normal",
  loading = false,
  variant = "normal",
  icon,
  color = "primary",
  radius = "rounded-18",
  className,
  disabled,
  right,
  textStyles = false,
  shadow = false,
  iconPosition = "left",
  iconProps,
  ...rest
}) => {
  const tailwind = useTailwind();
  const { setLoading } = useNavigationRoute();

  const getSize = useCallback(() => {
    switch (size) {
      case "small":
        return "h-[33px] px-5";
      case "normal":
        return "h-12.5 px-6";
      case "medium":
        return "h-16.5 px-7";
    }
  }, [size]);

  // get button font size based on button size
  const getFontSize = useCallback(() => {
    switch (size) {
      case "small":
        return "base";
      case "normal":
        return "base";
      case "medium":
        return "xl";
    }
  }, [size]);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled || loading}
      style={[
        shadow && styles.shadowBox,
        {
          display: "flex",
          borderWidth: variant === "outline" ? 1 : 0,
          ...tailwind(
            clsx(
              "flex-row flex-nowrap items-center justify-center bg-primary-200",
              getSize(),
              {
                "bg-primary-300": color === "secondary",
                "bg-white": color === "white",
                "bg-white border-secondary-100": variant === "outline",
                "bg-transparent": variant === "text" || variant === "dots",
                "bg-gray-600 border-gray-600": disabled,
              },
              className,
              radius
            )
          ),
        },
      ]}
      {...rest}
    >
      {variant === "dots" ? (
        <View>
          <Icon width={20} height={20} name="dots" fill="#2F4B93" />
        </View>
      ) : (
        <>
          {!!icon && iconPosition === "left" && (
            <View
              style={tailwind(
                clsx({
                  "pr-4": title && !textStyles,
                  "absolute left-6 right-4": textStyles,
                })
              )}
            >
              <Icon name={icon} stroke="none" {...iconProps} />
            </View>
          )}
          <Typography
            color={
              color === "white"
                ? "black"
                : variant === "outline" || variant === "text"
                ? "secondary-100"
                : "white"
            }
            variant={getFontSize()}
            weight="medium"
            styles={tailwind(
              clsx({
                "m-auto": textStyles,
              })
            )}
          >
            {title}
          </Typography>
          {/* {!!icon && iconPosition === "right" && (
            <View
              style={tailwind(
                clsx({
                  "pl-4": title && !textStyles,
                  "absolute left-6 right-4": textStyles,
                })
              )}
            >
              <Icon name={icon} stroke="none" fill={iconColor} />
            </View>
          )} */}
          {right && (
            <View style={tailwind("pl-2")}>
              <Icon {...right} fill="white" {...iconProps} />
            </View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  shadowBox: {
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 5 }, // X and Y offset
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 5, // How blurred the shadow is
    elevation: 5, // For Android (optional, controls shadow)
  },
});
