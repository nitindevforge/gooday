import { ReactNode } from "react";

export type ListComponentsProps = {
  data: Array<Object>;
  onHeaderPress?: () => void;
  onAdd?: () => void;
  renderItem: React.FC<any>
  title: string
  hideArrow?: boolean
  width?: number
  height?: number
  empty?: string
};