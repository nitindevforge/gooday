import { TASK_LIST, useActiveTodo, useTaskUndo } from "@app/modules";
import { TaskEntity } from "@gooday_corp/gooday-api-client";
import { Alert } from "react-native";
import { useQueryClient } from "react-query";
import { create } from "zustand";

export type TaskHistoryPayload = {
  todoId: string;
  tasks: TaskEntity[];
  action: "CREATE" | "DELETE" | "UPDATE";
};

export type TodoHistoryStore = {
  todoHistory: TaskHistoryPayload[];
  addTodoHistory: (payload: TaskHistoryPayload) => void;
  removeTodoHistory: (historyTask: TaskHistoryPayload) => void;
};

const useStore = create<TodoHistoryStore>()((set) => ({
  todoHistory: [],
  addTodoHistory: (payload) => {
    return set((state) => ({
      ...state,
      todoHistory: [payload, ...state?.todoHistory],
    }));
  },
  removeTodoHistory: (historyTask: TaskHistoryPayload) => {
    const filterTodoHistory = (todoHistory: TaskHistoryPayload[]) => {
      return todoHistory?.filter((el) => el !== historyTask);
    };
    return set((state) => ({
      ...state,
      todoHistory: filterTodoHistory(state.todoHistory),
    }));
  },
}));

export const useTodoHistory = () => {
  const { addTodoHistory, todoHistory, removeTodoHistory } = useStore();
  const { activeTodo } = useActiveTodo();
  const { mutate: taskUndo } = useTaskUndo();
  const client = useQueryClient();

  const onUndo = () => {
    const lastTask = todoHistory
      ?.find((el) => el?.todoId === activeTodo?.id);
    if (lastTask) {
      taskUndo(
        {
          action: lastTask?.action,
          data: lastTask?.tasks,
          todoId: activeTodo?.id || "",
        },
        {
          onSuccess() {
            removeTodoHistory(lastTask);
            client.invalidateQueries(TASK_LIST);
          },
          onError(error) {
            Alert.alert("Gooday!", error?.response?.data?.message);
          },
        }
      );
    }
  };

  return { addTodoHistory, todoHistory, onUndo };
};
