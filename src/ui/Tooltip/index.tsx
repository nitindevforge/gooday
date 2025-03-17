import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Typography from "../Typography";
import { useTailwind } from "tailwind-rn";
import { TooltipProps } from "./type";
import clsx from "clsx";

const Tooltip: React.FC<TooltipProps> = ({
  showTip,
  massage,
  styles,
  onClose,
  className,
}) => {
  const tailwind = useTailwind();

  return (
    <>
      {showTip && (
        <TouchableWithoutFeedback
          style={StyleSheet.absoluteFillObject}
          onPress={onClose}
        >
          <View
            style={[
              styles,
              tailwind(
                clsx(
                  "bg-gray-300 absolute top-6 right-0 px-6 py-2 w-full rounded-xl rounded-tr-none z-50",
                  className
                )
              ),
            ]}
          >
            <Typography color="white" weight="medium" variant="sm">
              {massage}
            </Typography>
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

export default Tooltip;
