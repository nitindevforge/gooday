import { Style } from "tailwind-rn";

export type TooltipProps = {
  showTip: Boolean;
  massage: string;
  styles: Style;
  onClose: () => void;
  className?: string
};
