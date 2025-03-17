import { EmployeesSizeEntity } from "@gooday_corp/gooday-api-client";

export interface DropdownItem {
  label: string;
  value: string;
}

export interface DropdownProps {
  selected: EmployeesSizeEntity["value"] | null;
  onChangeText: (item: EmployeesSizeEntity["value"]) => void;
  onFetch?: () => void;
  label?: string;
  value?: string;
  error?: string;
}
