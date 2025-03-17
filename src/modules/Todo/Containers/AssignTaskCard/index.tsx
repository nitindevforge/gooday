import { AvatarGroup, Button, Icon, Input, Typography } from "@app/ui";
import { TaskEntity, UserEntity } from "@gooday_corp/gooday-api-client";
import React, { useEffect, useMemo, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useActiveTodo } from "../../Hooks";
import { useTaskAssignee } from "../../Data";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TodoNavigationStackParamList } from "../..";
import { getAssetUrl } from "@app/utils";

interface AssignTaskCardProps {
  task: TaskEntity;
}

export const AssignTaskCard: React.FC<AssignTaskCardProps> = ({ task }) => {
  const { activeTodo, getTodoByTask } = useActiveTodo();
  const [content, setContent] = useState("");
  const tailwind = useTailwind();
  const [assignedTo, setAssignedTo] = useState<UserEntity[]>(
    task.assignedTo as unknown as UserEntity[]
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<TodoNavigationStackParamList>>();
  const { mutate } = useTaskAssignee();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    setAssignedTo((task.assignedTo ?? []) as unknown as UserEntity[]);
  }, [task]);

  const getAssignedToContent = () => {
    if (!assignedTo.length) {
      return "Select assignee";
    }
    if (assignedTo.length === activeTodo?.collaborators?.length) {
      return "Assigned to all";
    }

    if (task?.todo && assignedTo.length === task?.todo?.collaborators?.length) {
      return "Assigned to all";
    }

    return assignedTo.map((el) => el.firstName).join(", ");
  };

  

  const items = useMemo(() => {
    const todo = activeTodo
    return [
      {
        label: "Assigned to all",
        value: todo?.collaborators
          .filter((el: any) => el.user)
          .map((el) => (el as any).user),
      },
      ...(todo?.collaborators
        .filter((el: any) => el.user?.firstName)
        .map((el) => ({
          label: (el as unknown as { user: UserEntity })?.user?.firstName,
          value: [(el as unknown as { user: UserEntity })?.user],
        })) ?? []),
    ]
  }, [activeTodo,task]) 

  useEffect(() => {
    setAssignedTo(task.assignedTo as unknown as UserEntity[]);
  }, [task]);

  const handleSubmit = () => {
    mutate(
      {
        data: {
          assignee: assignedTo.map((el) => el._id),
          note: content ?? "",
        },
        id: task.id,
      },
      {
        onSuccess: () => {
          navigation.goBack();
        },
        onError: () => {
          Alert.alert("Gooday", "Something went wrong!!");
        },
      }
    );
  };

  return (
    <View style={{ gap: 16 }}>
      <Typography variant="2xl" weight="medium">
        {task.content}
      </Typography>
      <View style={tailwind("mt-4")}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setOpen((prev) => !prev)}
          style={tailwind(
            `bg-gray-700 pl-6 pr-6 ${
              isOpen ? "rounded-t-2xl pt-4 pb-2" : "rounded-2xl py-4"
            }  flex-row justify-between`
          )}
        >
          <Typography weight="medium" color="gray-500">
            {getAssignedToContent()}
          </Typography>
          <Icon name="down-arrow" stroke="#B4B5B6" />
        </TouchableOpacity>
        {isOpen && (
          <View style={tailwind("bg-gray-700 rounded-b-2xl")}>
            {items.map((item, index) => (
              <TouchableOpacity
                onPress={() => setAssignedTo(item.value ?? [])}
                key={index}
              >
                <View style={tailwind("h-px bg-gray-600")} />
                <View
                  style={[
                    tailwind("px-6 py-4 rounded-2xl flex-row justify-between"),
                  ]}
                >
                  <View
                    style={[tailwind("flex-row items-center"), { gap: 12 }]}
                  >
                    {JSON.stringify(assignedTo) ===
                    JSON.stringify(item.value) ? (
                      <View
                        style={tailwind(
                          "h-6 w-6 bg-primary-200 border-primary-200 border-2 rounded-full items-center justify-center"
                        )}
                      >
                        <Icon
                          name="check"
                          stroke="#FECB4D"
                          height={20}
                          width={20}
                          fill="white"
                        />
                      </View>
                    ) : (
                      <View
                        style={tailwind(
                          "h-6 w-6 border border-primary-200 border-2 rounded-full items-center justify-center"
                        )}
                      />
                    )}

                    <Typography variant="15" color="gray-500">
                      {item.label}
                    </Typography>
                  </View>
                  <AvatarGroup
                    avatars={
                      item?.value
                        ?.filter(Boolean)
                        .map((el) => getAssetUrl(el.profile)) ?? []
                    }
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <Input
        placeholder="Add description"
        multiline
        height={220}
        value={content}
        onChangeText={setContent}
      />

      <Button title="Done" onPress={handleSubmit} />
    </View>
  );
};
