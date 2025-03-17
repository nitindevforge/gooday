import React from "react";
import { InputFieldsProps } from "./type";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import clsx from "clsx";

const InputFields: React.FC<InputFieldsProps> = ({
  keyArr = [],
  birthDayInputs = [],
  setFieldValue,
  inputRef,
  values,
  handleSubmit,
  disabled,
}) => {
  const tailwind = useTailwind();

  const onKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    el: string,
    index: number
  ) => {
    const key = e.nativeEvent.key;
    if (key === "Backspace") {
      setFieldValue(el, "");
      index && inputRef.current[index - 1].focus();
    } else {
      if (index < birthDayInputs?.length - 1) {
        inputRef.current[index + 1].focus();
      }
    }
  };

  const handleChange = (text: string, el: string, index: number) => {
    if (!text) return;
    setFieldValue(
      el,
      index < birthDayInputs?.length - 1 ? text.slice(0, 1) : text.slice(-1)
    );
    if (index < birthDayInputs?.length - 1) {
      inputRef.current[index + 1].focus();
      setFieldValue(birthDayInputs[index + 1], text.slice(1, 2));
    }
  };

  return birthDayInputs
    .map((el: string, index) => {
      if (!keyArr?.includes(el)) {
        return false;
      }
      return (
        <TextInput
          style={{
            borderWidth: 1.4,
            ...tailwind(
              clsx(
                "flex-1 h-20 rounded-lg text-center border-gray-600 text-gray-500 text-2xl font-thin",
                {
                  "border-gray-200 text-black font-extralight": values[el],
                }
              )
            ),
          }}
          key={el}
          ref={(ref) => (inputRef.current[index] = ref)}
          value={values[el]}
          onKeyPress={(e) => onKeyPress(e, el, index)}
          onChangeText={(text) => handleChange(text, el, index)}
          keyboardType="numeric"
          maxLength={2}
          returnKeyType={
            index < birthDayInputs?.length - 1 ? "default" : "done"
          }
          placeholder={el.charAt(0).toUpperCase()}
          placeholderTextColor="#AEAEAE"
          onSubmitEditing={() => {
            if (index < birthDayInputs?.length && !disabled) {
              handleSubmit();
            }
          }}
        />
      );
    })
    ?.filter((el) => el);
};

export default InputFields;
