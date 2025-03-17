import { TaskEntity } from "@gooday_corp/gooday-api-client";
import { TaskCheckboxProps, TaskCheckView } from "../TaskCheckbox/type";
import { TaskInputProps } from "../TaskInput";

export type TodoListItemProps = {
  data: TaskEntity[];
  index: number;
  task: TaskEntity;
  view: TaskCheckView;
  taskCheckBox?: TaskCheckboxProps
  taskInput?:TaskInputProps
  listContainer?: any;
  containerRef?: (ref: any, index: number) => void;
};
