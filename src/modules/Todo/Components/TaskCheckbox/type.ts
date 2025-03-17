import { TaskEntity } from "@gooday_corp/gooday-api-client";

export enum TaskCheckView {
  COMPLETION_TOGGLE = "COMPLETION_TOGGLE",
  DELETABLE = "DELETABLE",
  SELECTABLE = "SELECTABLE",
  URGENT = "URGENT",
  RESTORE = "RESTORE",
}

export  interface TaskCheckboxProps {
  task: TaskEntity;
  view: TaskCheckView;
  isChecked?: boolean;
  isLoading?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  setTodoHistory?: () => void;
  onCompleteSuccess?: () => void;
}