import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { TodoNavigationStackParamList } from "./type";
import {
  AssignTaskScreen,
  CompletedListScreen,
  TaskListScreen,
  TodoCollaboratorScreen,
  TodoListScreen,
  TodosScreen,
} from "../Screens";
import { useActiveTodo } from "../Hooks";
import { NotificationScreen } from "@app/modules";
import { DelegatedListScreen } from "../Screens/Delegated";
import { RecentlyDeletedListScreen } from "../Screens/RecentlyDeleted";
import { UrgentListScreen } from "../Screens/Urgent";

const TodoNavigationStack =
  createNativeStackNavigator<TodoNavigationStackParamList>();

export const TodoNavigation = () => {
  useActiveTodo();

  return (
    <TodoNavigationStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="TODOS"
    >
      <TodoNavigationStack.Screen name="TODOS" component={TodosScreen} />
      <TodoNavigationStack.Screen name="TODO_LIST" component={TodoListScreen} />
      <TodoNavigationStack.Screen
        name="TODO_COLLABORATOR"
        component={TodoCollaboratorScreen}
      />
      <TodoNavigationStack.Screen
        name="ASSIGN_TASK"
        component={AssignTaskScreen}
      />
      <TodoNavigationStack.Screen
        name="TASK_NOTIFICATION"
        component={NotificationScreen}
      />
      <TodoNavigationStack.Screen
        name="TASK_LIST"
        component={TaskListScreen}
      />
      <TodoNavigationStack.Screen
        name="DELEGATED"
        component={DelegatedListScreen}
      />
      <TodoNavigationStack.Screen
        name="COMPLETED"
        component={CompletedListScreen}
      />
      <TodoNavigationStack.Screen
        name="DELETED"
        component={RecentlyDeletedListScreen}
      />
      <TodoNavigationStack.Screen
        name="URGENT"
        component={UrgentListScreen}
      />
    </TodoNavigationStack.Navigator>
  );
};
