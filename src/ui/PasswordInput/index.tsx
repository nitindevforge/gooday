import React, { useState } from "react";
import { Icon, Input } from "@app/ui";
import { TextInput, TouchableOpacity } from "react-native";
import { InputProps } from "../Input/type";

const PasswordInput = React.forwardRef<TextInput, InputProps>(
  ({ ...props }, ref) => {
    const [showPass, setShowPass] = useState(true);
    return (
      <Input
        {...props}
        ref={ref}
        secureTextEntry={showPass}
        right={
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <Icon
              name={showPass ? "eye-hide" : "eye-show"}
              height={16}
              width={16}
              stroke={showPass ? "#DADADA" : "#4D4D4D"}
              fill="none"
            />
          </TouchableOpacity>
        }
      />
    );
  }
);

export default PasswordInput;
