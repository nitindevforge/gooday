import { create } from "zustand";
import { useTodoList } from "../Data";
import { useEffect } from "react";
import { TodoEntity } from "@gooday_corp/gooday-api-client";

interface TodoStore {
  activeTodo: TodoEntity | null;
  setActiveTodo: (todo: TodoEntity | null) => void;
}

const useTodoStore = create<TodoStore>((set) => ({
  activeTodo: null,
  setActiveTodo: (todo: TodoEntity | null) =>
    set((state) => ({ ...state, activeTodo: todo })),
}));

export const useActiveTodo = () => {
  const { activeTodo, setActiveTodo } = useTodoStore();
  const { data } = useTodoList();

  useEffect(() => {
    if (data?.data?.data?.length && !activeTodo) {
      setActiveTodo(data.data.data[0]);
    }
  }, [data]);

  const getTodoByTask = (id: string) => {
    return data?.data.data.find(el => el.id === id) || null
  };

  return {
    activeTodo,
    setActiveTodo,
    getTodoByTask
  };
};
