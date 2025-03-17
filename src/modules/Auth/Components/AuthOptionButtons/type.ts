import { Icons } from "@app/ui";

export type AuthOptionButtonsProps = {
  google?: boolean;
  apple?: boolean;
  mail?: boolean;
  outline?: boolean;
};

export type Options = {
  id: string;
  title: string;
  icon?: Icons;
  loading?: boolean;
  onPress?: () => void;
  show?: boolean
};
