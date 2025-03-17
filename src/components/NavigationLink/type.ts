import { Icons } from "@app/ui";

export interface NavigationLinkItem {
  icon?: Icons;
  label: string;
  color?: string;
  value?: string;
  helperText?: string;
  onNavigate?: () => void;
}
