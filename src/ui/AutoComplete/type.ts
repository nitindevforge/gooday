export interface AutoCompleteItem {
  label: string;
  value: string;
}

export interface AutoCompleteProps {
  label: string;
  error: string;
  placeholder: string;
  data: Array<AutoCompleteItem>;
  selected: AutoCompleteItem["value"] | null;
  onChange: (item: AutoCompleteItem["value"]) => void;
  className?: string;
  onBlur: (e:any) => void;
  fromApi?: boolean
}
