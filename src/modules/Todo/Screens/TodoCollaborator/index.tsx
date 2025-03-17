import {
  CollaboratorListContainer,
  TodoNavigationStackParamList,
} from "@app/modules";
import { UserEntity } from "@gooday_corp/gooday-api-client";
import React, { act, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useActiveTodo } from "../../Hooks";
import { useTodoAssign } from "../../Data";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TaskHeader } from "../../Components";

export const TodoCollaboratorScreen = () => {
  const tailwind = useTailwind();
  const { activeTodo, setActiveTodo } = useActiveTodo();
  const { mutate, isLoading } = useTodoAssign();
  const navigation =
    useNavigation<NativeStackNavigationProp<TodoNavigationStackParamList>>();

  const [selectedCollaborators, setSelectedCollobarators] = useState<
    UserEntity[]
  >([]);

  useEffect(() => {
    setSelectedCollobarators(
      (
        (activeTodo?.collaborators ?? []).map(
          (el) => (el as any).user as UserEntity
        ) ?? []
      ).filter(Boolean)
    );
  }, [activeTodo]);

  const toggleCollaboratorSelection = (friend: UserEntity) => {
    if (selectedCollaborators.find((el) => el._id === friend._id)) {
      setSelectedCollobarators((prev) =>
        prev.filter((el) => el._id !== friend._id)
      );
    } else {
      setSelectedCollobarators((prev) => [...prev, friend]);
    }
  };

  const handleAssignCollaborator = () => {
    mutate(
      {
        id: activeTodo?.id ?? "",
        data: {
          collaborators: selectedCollaborators.map((el) => el._id),
        },
      },
      {
        onSuccess: (res) => {
          setActiveTodo(res.data.data);
          navigation.goBack();
        },
      }
    );
  };

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <View style={[tailwind("px-6 flex-1 pb-4"), { rowGap: 24 }]}>
        <TaskHeader />
        <CollaboratorListContainer
          collaborators={selectedCollaborators}
          onCollaboratorAdd={toggleCollaboratorSelection}
          isLoading={isLoading}
          onSubmit={handleAssignCollaborator}
        />
      </View>
    </SafeAreaView>
  );
};
