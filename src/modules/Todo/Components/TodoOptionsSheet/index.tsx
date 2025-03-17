import React, { useEffect, useState } from "react";
import { Icon, Input, Loading, Typography } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import {
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { OptionsSheetProps } from "./type";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useTodoCreate, useUpdateTodo } from "../../Data";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { getAssetUrl } from "@app/utils";
import Modal from "react-native-modal";

export const TodoOptionsSheet = NiceModal.create<OptionsSheetProps>(
  ({ todo }) => {
    const tailwind = useTailwind();
    const { visible, hide } = useModal();
    const { mutate, isLoading } = useUpdateTodo();
    const { mutate: onCreate } = useTodoCreate();
    const [todoName, setTodoName] = useState<string>(todo?.name || "");

    const handleSubmit = () => {
      if (todoName?.trimStart()) {
        if (todo) {
          mutate(
            {
              id: todo?.id!,
              data: {
                name: todoName,
              },
            },
            {
              onSuccess() {
                hide();
                setTodoName("");
              },
            }
          );
        } else {
          onCreate(
            {
              name: todoName,
            },
            {
              onSuccess() {
                hide();
                setTodoName("");
              },
            }
          );
        }
      }
    };

    useEffect(() => {
      setTodoName(todo?.name!);
    }, [todo?.name]);

    return (
      <TouchableWithoutFeedback onPress={hide}>
        <Modal
          isVisible={visible}
          style={tailwind("m-0")}
          onSwipeComplete={hide}
        >
          <Loading loading={isLoading} />
          <View style={tailwind("flex-1 justify-end")}>
            <KeyboardAwareScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "flex-end",
              }}
              style={tailwind("flex-1")}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              scrollEnabled={false}
            >
              <View style={tailwind("bg-white rounded-md px-6 pb-6")}>
                <View
                  style={[tailwind("flex-row items-center justify-between")]}
                >
                  <TouchableOpacity
                    onPress={hide}
                    activeOpacity={1}
                    style={tailwind(
                      "flex items-center bg-white justify-center rounded-md h-14"
                    )}
                  >
                    <Typography color="info" variant="lg" weight="semibold">
                      Cancel
                    </Typography>
                  </TouchableOpacity>

                  <Typography color="gray-300" variant="lg" weight="semibold">
                    {todo?.type === "PRIMARY" && "Primary"}{" "}
                    {!todo ? "Add To-Do List" : "To-do Info"}
                  </Typography>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    activeOpacity={1}
                    style={tailwind(
                      "flex items-center bg-white justify-center rounded-md h-14"
                    )}
                  >
                    <Typography color="info" variant="lg" weight="semibold">
                      Done
                    </Typography>
                  </TouchableOpacity>
                </View>
                <View style={tailwind("mt-6 mb-4")}>
                  <View>
                    <View style={tailwind("items-center mb-4")}>
                      <Icon name="todo" width={60} height={60} fill="#2F4B93" />
                    </View>
                    <Input
                      onChangeText={setTodoName}
                      value={todoName}
                      placeholder={"Title"}
                      returnKeyType="next"
                      style={{
                        fontSize: 30,
                        fontWeight: "500",
                        textAlign: "center",
                        verticalAlign: "middle",
                        width: "100%",
                      }}
                      height={50}
                      textAlign="center"
                      textAlignVertical="center"
                    />
                  </View>
                  {!!todo && (
                    <View style={tailwind("mt-4")}>
                      <Typography variant="lg" weight="medium" className="mb-2">
                        Collaborators
                      </Typography>
                      <View
                        style={[
                          tailwind("flex-row"),
                          { flexWrap: "wrap", gap: 6 },
                        ]}
                      >
                        {todo?.collaborators?.map((el) => {
                          return (
                            <Image
                              key={el?.user?.profile}
                              source={{ uri: getAssetUrl(el?.user?.profile) }}
                              defaultSource={require("@app/assets/Images/profile.png")}
                              style={[tailwind("h-8 w-8 rounded-full")]}
                              resizeMode="cover"
                            />
                          );
                        })}
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </KeyboardAwareScrollView>
          </View>
        </Modal>
      </TouchableWithoutFeedback>
    );
  }
);
