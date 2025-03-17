export interface PermissionToggleItem {
  label: string;
  value?: string;
}

export type PermissionToggleProps = PermissionToggleItem & {
  isEnabled: boolean;
  onChange: (value: boolean) => void;
  hideToggle?: boolean
};
