import React from "react";
import { useTailwind } from "tailwind-rn";
import { TouchableWithoutFeedback, View } from "react-native";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import Modal from "react-native-modal";
import { CommonBottomSheetProps } from "./type";

export const CommonBottomSheet = NiceModal.create<CommonBottomSheetProps>(
  ({ onClose, title, children, ...rest }) => {
    const tailwind = useTailwind();
    const { visible, hide } = useModal();

    return (
      <TouchableWithoutFeedback onPress={hide}>
        <Modal {...rest} onSwipeComplete={hide} isVisible={visible}>
          <View style={tailwind("flex-1 bg-black/40 justify-end")}>
            {children}
          </View>
        </Modal>
      </TouchableWithoutFeedback>
    );
  }
);
