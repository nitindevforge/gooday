import { ReactNode } from "react";
import { ModalProps } from "react-native-modal";

export interface CommonBottomSheetProps extends ModalProps  {
  title?: string;
  onClose?: () => void;
};
