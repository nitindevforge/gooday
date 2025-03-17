export interface CheckBoxProps {
  checked: boolean;
  variant?: 'filled' | 'outline';
  size?: 'small' | 'medium';
  left?: boolean;
  label: string;
  onPress: () => void;
}
