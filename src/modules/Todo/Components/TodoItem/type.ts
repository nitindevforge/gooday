import { TodoEntity } from "@gooday_corp/gooday-api-client";
import { SharedValue } from "react-native-reanimated";

export type TodoItemProps = {
  translation: SharedValue<number>;
  onDeletePress?: () => void;
  onEditToto?: () => void
  todo?: TodoEntity
};
