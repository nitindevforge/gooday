import { SelectOptions } from "@app/modules";

export type MultiSelectDropdownProps = {
  options: SelectOptions[];
  optionComponent?: React.FC<SelectOptions>;
  selectedOptions?: SelectOptions[];
  onChange?: (selected: SelectOptions[]) => void;
  disabled?: boolean
  fetchNextPage?: any
};
