import { IconsProps } from "@app/components";
import { PropsWithChildren } from "react";
import { TypographyColor } from "../../../../ui/Typography/type";
import { DropdownModalVariant } from "../DropdownIconModal/type";
import { ViewStyle } from "react-native";

export interface DropdownItemModal {
  icon: IconsProps;
  label: string;
  disabled?: boolean;
  hide?: boolean;
  textColor: TypographyColor;
  onPress: () => void;
}

export type DropdownItemProps = PropsWithChildren<{
  data: DropdownItemModal[];
  variant?: DropdownModalVariant;
  onClose: () => void;
  styles?: ViewStyle
}>;
