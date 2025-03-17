import { NOTIFICATION } from "@app/modules";
import { TaskEntity } from "@gooday_corp/gooday-api-client";

export type TodoNavigationStackParamList = {
  TODOS: undefined;
  TODO_LIST: undefined;
  TODO_COLLABORATOR: undefined;
  ASSIGN_TASK: { tasks: TaskEntity[] };
  TASK_NOTIFICATION: { type: NOTIFICATION };
  TASK_LIST: undefined;
  DELEGATED: undefined;
  COMPLETED: undefined
  DELETED: undefined
  URGENT: undefined
};
