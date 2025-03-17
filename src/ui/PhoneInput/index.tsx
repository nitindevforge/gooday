import React, { useState } from "react";
import { PhoneInputProps } from "./type";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import clsx from "clsx";
import InputLabel from "../InputLabel";
import ErrorMassage from "../ErrorMassage";
import { Icon } from "../Icon";
import { CountryItem, CountryPicker, countryCodes } from "react-native-country-codes-picker";
import Typography from "../Typography";

export const PhoneInput = React.forwardRef<TextInput, PhoneInputProps>(
  (
    {
      error = "",
      success = false,
      className,
      editable = true,
      label,
      width,
      height = 42.88,
      massageStyle,
      onChangeItem,
      ...rest
    },
    ref
  ) => {
    const [show, setShow] = useState(false);
    const [country, setCountry] = useState<CountryItem>(countryCodes.find(el => el?.code === 'AU')!)
    const tailwind = useTailwind();

    const onMobilePicker = () => {
      setShow(true);
    };

    const onMobilePickerClose = () => {
      setShow(false);
    };

    return (
      <View style={tailwind("w-full")}>
        {label && <InputLabel label={label} />}
        <View
          style={[
            { borderWidth: 1.5 },
            tailwind(
              clsx(
                "border-gray-600 rounded-xl flex-row items-center justify-between w-full overflow-hidden",
                {
                  "border-error": error,
                  "border-success": success,
                },
                className
              )
            ),
            { width: width, height: height },
          ]}
        >
          <TouchableOpacity
            onPress={onMobilePicker}
            activeOpacity={0.7}
            style={[
              tailwind(
                "flex-row items-center justify-start rounded-r-none bg-gray-50 h-full"
              ),
              { height: height, width: 100 },
            ]}
          >
            <View style={tailwind("flex items-start justify-center pr-1 ml-0.5")}>
              <View
                style={{
                  transform: [
                    {
                      rotate: "90deg",
                    },
                  ],
                }}
              >
                <Icon name="back" fill="#666666" height={9} stroke="none" />
              </View>
              <View
                style={{
                  transform: [
                    {
                      rotate: "270deg",
                    },
                  ],
                }}
              >
                <Icon name="back" height={9} fill="#666666" stroke="none" />
              </View>
            </View>
            <Typography variant="sm" className="flex-1" numberOfLines={1}>
              {country?.flag} {country?.dial_code}
            </Typography>
          </TouchableOpacity>
          <TextInput
            placeholderTextColor={"#AEAEAE"}
            editable={editable}
            autoCapitalize="none"
            style={[
              tailwind(
                clsx(
                  "py-2 text-gray-200 text-base leading-5 px-2.5 flex-none w-full",
                  {
                    "text-black": rest?.value,
                  }
                )
              ),
              { height },
            ]}
            {...rest}
            onChangeText={(value) => onChangeItem(value, country?.dial_code!)}
            ref={ref}
          />
        </View>
        {!!error && <ErrorMassage styles={massageStyle} error={error} />}

        <CountryPicker
          inputPlaceholder="Type your country name"
          show={show}
          onRequestClose={onMobilePickerClose}
          onBackdropPress={onMobilePickerClose}
          pickerButtonOnPress={(item) => {
            setCountry(item)
            setShow(false);
          }}
          lang="en"
          style={{
            modal: {
              height: 500,
            },
          }}
        />
      </View>
    );
  }
);
