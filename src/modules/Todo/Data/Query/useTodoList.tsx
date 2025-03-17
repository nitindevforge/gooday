import { useQuery } from "react-query";
import { TODO_LIST } from "../Constant";
import { ApiClient } from "@app/api";

export const useTodoList = () => {
  return useQuery(TODO_LIST, () => ApiClient.Todo.todoControllerListTodo());
};
