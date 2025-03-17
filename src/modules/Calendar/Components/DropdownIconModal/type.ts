import { PropsWithChildren } from "react";
import { DropdownItemModal } from "../DropdownItem";
import { IconsProps } from "@app/components";

export type DropdownModalVariant = 'start' | 'between'

export type DropdownModalProps = PropsWithChildren<
  {
    data: DropdownItemModal[];
    onModal: (value: boolean) => void;
    visible: boolean;
    disabled?: boolean;
    icon: IconsProps;
    variant?: DropdownModalVariant
  }>;
