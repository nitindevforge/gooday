import React from "react";
import { useTailwind } from "tailwind-rn";
import { TouchableWithoutFeedback, View } from "react-native";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import Modal from "react-native-modal";
import { DropdownItem, DropdownItemProps } from "@app/modules";
import { TodoBottomSheetProps } from "./type";
export const TodoBottomSheet = NiceModal.create<TodoBottomSheetProps>(
  ({ onEditToto, handleDeleteTodo, todo }) => {
    const tailwind = useTailwind();
    const { visible, hide } = useModal();

    const todoOptions = [
      {
        label: "Rename To-Do List",
        icon: {
          name: "edit",
          outline: false,
          width: 16,
          height: 16,
          fill: "black",
          stroke: "none",
        },
        onPress: onEditToto,
        textColor: "black",
      },
      todo?.type !== "PRIMARY" && {
        label: "Delete To-Do List",
        icon: {
          name: "delete",
          height: 20,
          width: 20,
          stroke: "#E24653",
        },
        onPress: handleDeleteTodo,
        textColor: "secondary-500",
      },
    ]?.filter(Boolean);

    return (
      <TouchableWithoutFeedback onPress={hide}>
        <Modal
          isVisible={visible}
          onSwipeComplete={hide}
          style={tailwind("m-0")}
        >
          <View style={tailwind("flex-1 justify-end")}>
            <DropdownItem
              variant="between"
              onClose={hide}
              data={todoOptions as unknown as DropdownItemProps["data"]}
            />
          </View>
        </Modal>
      </TouchableWithoutFeedback>
    );
  }
);
