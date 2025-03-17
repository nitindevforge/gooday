import React, { useRef } from "react";
import { InputFieldValue } from "@app/modules";
import { Image, TextInput, View } from "react-native";
import { Button, Input, Typography } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { isFormValid } from "@app/utils";
import { WaitListFormProps } from "./type";

export const WaitListForm: React.FC<WaitListFormProps> = ({
  form: { values, handleSubmit, handleChange, handleBlur, errors, touched },
  isLoading,
  name,
}) => {
  const tailwind = useTailwind();
  const inputRef = useRef<TextInput[]>([]);

  const disabled = isFormValid(errors, values);

  const inputField: InputFieldValue[] = [
    {
      type: "text",
      name: "firstName",
      label: "First name",
      placeholder: "First name",
    },
    {
      type: "text",
      name: "lastName",
      label: "Last name",
      placeholder: "Last name",
    },
    {
      type: "text",
      name: "email",
      label: "Email",
      placeholder: "example@gmail.com",
    },
  ];

  return (
    <View style={tailwind("flex-1")}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        disableScrollOnKeyboardHide
      >
        <View style={tailwind("flex-1")}>
          <View style={{ ...tailwind("pt-4") }}>
            <View style={{ ...tailwind("items-center") }}>
              <Image
                source={require("@app/assets/Images/software-find.png")}
                resizeMode="contain"
              />
            </View>
            <Typography variant="base" weight="regular" className="mt-8">
              ‘{name}’ has yet to join Gooday. Enter your details to be notified
              when they join.
            </Typography>
          </View>
          <View style={[tailwind("mt-8 flex-1"), { rowGap: 10 }]}>
            {inputField?.map((field, index) => {
              const { name, label, placeholder } = field;
              return (
                <Input
                  key={index + name}
                  onChangeText={handleChange(name)}
                  onBlur={handleBlur(name)}
                  value={values[name]}
                  label={label}
                  placeholder={placeholder}
                  error={errors[name] && touched[name] ? errors[name] : ""}
                  ref={(ref) => (inputRef.current[index] = ref)}
                  returnKeyType="next"
                  keyboardType={name === "email" ? "email-address" : "default"}
                  onSubmitEditing={() => {
                    if (inputField?.length > index + 1) {
                      inputRef.current[index + 1]?.focus();
                    }
                  }}
                />
              );
            })}
          </View>
        </View>
        <View style={tailwind("my-5")}>
          <Button
            disabled={disabled}
            loading={isLoading}
            onPress={handleSubmit}
            title="Submit"
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
