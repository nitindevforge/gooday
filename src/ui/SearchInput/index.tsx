import React from "react";
import { Icon, Input } from "@app/ui";
import { TouchableOpacity } from "react-native";
import { InputProps } from "../Input/type";

export const SearchInput: React.FC<InputProps> = (props) => {
  return (
    <Input
      {...props}
      left={
        <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
          <Icon fill="#3C3C43" stroke="none" name="search" height={22} width={17} />
        </TouchableOpacity>
      }
      className="bg-[#7676802E] border-0"
    />
  );
};
