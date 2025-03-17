import React, { FC } from "react";
import { View } from "react-native";
import { Icon, Typography } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { DropdownItem, DropdownProps as DropdownItemsProps } from "./type";
import { Dropdown as DropdownSelect } from "react-native-element-dropdown";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";

export const Dropdown: FC<DropdownItemsProps & DropdownProps<DropdownItem>> = ({
  onChangeText = () => {},
  label,
  selected,
  error,
  ...rest
}) => {
  const tailwind = useTailwind();

  return (
    <View>
      {label && (
        <Typography weight="medium" variant="sm" className="mb-2">
          {label}
        </Typography>
      )}
      <DropdownSelect
        style={[
          {
            height: 42.88,
            borderWidth: 1.5,
          },
          tailwind("border-gray-600 rounded-xl mb-2"),
        ]}
        containerStyle={[
          {
            borderWidth: 1.5,
          },
          tailwind("border-gray-600 rounded-xl overflow-hidden"),
        ]}
        maxHeight={200}
        selectedTextStyle={tailwind("py-2 pl-4")}
        placeholderStyle={tailwind("py-2 pl-4")}
        renderRightIcon={() => (
          <View style={tailwind("mr-3")}>
            <Icon name="down-arrow" stroke="#B4B5B6" />
          </View>
        )}
        disable={!rest?.data?.length}
        value={selected}
        {...rest}
        onChange={(item) => onChangeText(item?.value)}
      />
      {error && (
        <Typography weight="medium" variant="sm" color="error" className="mb-2">
          {error}
        </Typography>
      )}
    </View>
  );
};
