import { TodoEntity } from "@gooday_corp/gooday-api-client";

export type TodoBottomSheetProps = {
  todo: TodoEntity,
  handleDeleteTodo?: () => void;
  onEditToto: () => void;
};
