import React from "react";
import { Modal, TouchableWithoutFeedback, View } from "react-native";
import { DatePickerModelProps } from "./type";
import DatePicker from "react-native-date-picker";
import { Button } from "@app/ui";
import { useTailwind } from "tailwind-rn";

const DatePickerModel: React.FC<DatePickerModelProps> = ({
  open = false,
  onClose,
  onSubmit,
  ...rest
}) => {
  const tailwind = useTailwind();

  return (
    <>
      {open && (
        <Modal visible={open} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={onClose}>
            <View
              style={tailwind("flex-1 items-center justify-end bg-black/40")}
            >
              <View style={[tailwind("w-full bg-white border-gray-500"),{borderTopWidth: 1.5}]}>
                <View style={tailwind("items-end")}>
                  <Button onPress={onSubmit} variant="text" title="Done" size="medium" />
                </View>
                <View style={tailwind("items-center")}>
                  <DatePicker theme='light' mode="date" open {...rest} />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </>
  );
};

export default DatePickerModel;
