import { BusinessTiming } from "@gooday_corp/gooday-api-client";

export type TimeCardProps = {
  onChangeTiming: () => void;
  onChangeTime: (text: string, type: 'openAt' | 'closeAt', index: number) => void;
  onAddTime: () => void;
  onRemoveTime: (index: number) => void;
  item: BusinessTiming;
  parentIndex?: number
};