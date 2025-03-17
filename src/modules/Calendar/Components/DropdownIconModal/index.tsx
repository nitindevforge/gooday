import React, { Fragment, ReactElement, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { DropdownItem, DropdownItemProps } from "../DropdownItem";
import { DropdownModalProps } from "./type";
import { Icon } from "@app/ui";
import Modal from "react-native-modal";

export const DropdownIconModal: React.FC<DropdownModalProps> = ({
  disabled = false,
  variant = "start",
  data,
  onModal,
  visible,
  children,
  icon,
}) => {
  const tailwind = useTailwind();

  const openDropdown = () => {
    onModal(true);
  }

  const closeDropdown = () => {
    onModal(false);
  }

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal
        isVisible={visible}
        onSwipeComplete={closeDropdown}
        style={tailwind('m-0')}
      >
        <TouchableOpacity
          style={[tailwind("flex-1 justify-end")]}
          activeOpacity={1}
          onPress={closeDropdown}
        >
          <DropdownItem
            variant={variant}
            onClose={closeDropdown}
            data={data as unknown as DropdownItemProps["data"]}
          >
            {children ? children : null}
          </DropdownItem>
        </TouchableOpacity>
      </Modal>
    );
  };
  return (
    <Fragment>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={1}
        hitSlop={6}
        onPress={openDropdown}
      >
        <Icon {...icon} />
        {renderDropdown()}
      </TouchableOpacity>
    </Fragment>
  );
};
