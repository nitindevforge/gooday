import React from "react";
import { useTodoDelete, useTodoList } from "../../Data";
import { Alert, FlatList, TouchableOpacity, View } from "react-native";
import { AvatarGroup, EmptyComponent, Loading, Typography } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { getAssetUrl } from "@app/utils";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { TodoEntity } from "@gooday_corp/gooday-api-client";
import { TodoBottomSheet, TodoOptionsSheet, TotoItem } from "../../Components";
import NiceModal from "@ebay/nice-modal-react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TodoNavigationStackParamList } from "../../Navigation";
import { useActiveTodo } from "../../Hooks";

export const SelectTodoList = () => {
  const tailwind = useTailwind();
  const { setActiveTodo } = useActiveTodo();
  const { data, isLoading } = useTodoList();
  const { mutate: deleteTodo, isLoading: isDeletingTodo } = useTodoDelete();
  const navigation =
    useNavigation<NativeStackNavigationProp<TodoNavigationStackParamList>>();

  const handleDeleteTodo = (todo: TodoEntity) => {
    Alert.alert("Are you sure?", `Do you want to delete list ${todo?.name}?`, [
      {
        text: "Nevermind",
        isPreferred: true,
      },
      {
        text: "Confirm",
        onPress: () => deleteTodo(todo?.id ?? ""),
      },
    ]);
    NiceModal.hide(TodoBottomSheet);
  };

  const onEditToto = (todo: TodoEntity) => {
    NiceModal.hide(TodoBottomSheet);
    setTimeout(() => {
      NiceModal.show(TodoOptionsSheet, {
        todo,
      });
    }, 500);
  };

  const onLongPress = (todo: TodoEntity) => {
    NiceModal.show(TodoBottomSheet, {
      todo: todo,
      handleDeleteTodo: () => handleDeleteTodo(todo),
      onEditToto: () => onEditToto(todo),
    });
  };

  return (
    <View style={[tailwind("flex-1")]}>
      <Loading loading={isDeletingTodo || isLoading} />
      <FlatList
        data={data?.data?.data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <GestureHandlerRootView>
            <TouchableOpacity
              activeOpacity={1}
              onLongPress={() => onLongPress(item)}
              onPress={() => {
                setActiveTodo(item);
                navigation.navigate("TODO_LIST");
              }}
              style={[
                tailwind(
                  "rounded-2xl border border-gray-600 mb-3 overflow-hidden"
                ),
              ]}
            >
              <ReanimatedSwipeable
                friction={2}
                enableTrackpadTwoFingerGesture
                rightThreshold={40}
                renderRightActions={(
                  progress,
                  translation,
                  swipeableMethods
                ) => (
                  <TotoItem
                    todo={item}
                    translation={translation}
                    onDeletePress={() => handleDeleteTodo(item)}
                    onEditToto={() => {
                      onEditToto(item);
                      swipeableMethods.reset();
                    }}
                  />
                )}
              >
                <View
                  style={tailwind(
                    "flex-row items-center justify-between px-6 py-3"
                  )}
                >
                  <View
                    style={tailwind("flex-row items-center justify-between")}
                  >
                    <Typography
                      variant="15"
                      color={item.id === "add" ? "gray-300" : "black"}
                    >
                      {item.name}
                    </Typography>
                    {item?.type === "PRIMARY" && (
                      <View
                        style={[
                          tailwind(
                            "rounded-md px-3 py-1 ml-2 border-primary-300"
                          ),
                          {
                            borderWidth: 1.5,
                          },
                        ]}
                      >
                        <Typography
                          className="text-xs"
                          weight="medium"
                          color="primary-300"
                        >
                          Primary
                        </Typography>
                      </View>
                    )}
                  </View>
                  <AvatarGroup
                    avatars={item?.collaborators?.map((el) =>
                      getAssetUrl(el?.user?.profile)
                    )}
                  />
                </View>
              </ReanimatedSwipeable>
            </TouchableOpacity>
          </GestureHandlerRootView>
        )}
        ListEmptyComponent={<EmptyComponent />}
      />
    </View>
  );
};
