import React, { useCallback, useState } from "react";
import { InputProps } from "./type";
import { TextInput, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import clsx from "clsx";
import InputLabel from "../InputLabel";
import ErrorMassage from "../ErrorMassage";

const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      error = "",
      success = false,
      className,
      editable = true,
      label,
      right,
      left,
      width,
      height = 42.88,
      massageStyle,
      ...rest
    },
    ref
  ) => {
    const tailwind = useTailwind();

    return (
      <View style={tailwind('')}>
        {label && <InputLabel label={label} />}
        <View
          style={[
            { borderWidth: 1.5 },
            tailwind(
              clsx(
                "border-gray-600 rounded-xl px-2.5 flex-row items-center justify-between w-full",
                {
                  "border-error": error,
                  "border-success": success,
                  'pl-4': !left,
                  'pr-4': !right,
                },
                className
              )
            ),
            { width: width, height: height },
          ]}
        >
          {!!left && (
            <View style={tailwind("flex items-start pr-1")}>{left}</View>
          )}
          <TextInput
            placeholderTextColor={"#AEAEAE"}
            editable={editable}
            autoCapitalize="none"
            style={[
              tailwind(
                clsx(
                  "py-2 text-gray-200 text-base leading-5 flex-none w-full",
                  {
                    "w-11/12": !!right || !!left,
                    "w-10/12": !!right && !!left,
                    "text-black": rest?.value,
                  }
                )
              ),
              { height },
            ]}
            {...rest}
            ref={ref}
          />
          {!!right && (
            <View style={tailwind("flex items-start pl-1")}>{right}</View>
          )}
        </View>
        {!!error && <ErrorMassage styles={massageStyle} error={error} />}
      </View>
    );
  }
);

export default Input;
