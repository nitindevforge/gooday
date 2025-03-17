import { Header, TodoOptionsSheet, TodoItemList, TodoNavigationStackParamList } from "@app/modules";
import React, { Fragment } from "react";
import { SafeAreaView, StatusBar, TouchableOpacity, View, ViewStyle } from "react-native";
import { useTailwind } from "tailwind-rn";
import { SelectTodoList } from "../../Containers";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Icon, Typography } from "@app/ui";
import NiceModal from "@ebay/nice-modal-react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const TodosScreen = () => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NativeStackNavigationProp<TodoNavigationStackParamList>>();
  const isFocused = useIsFocused();
  const onAddToto = () => {
    NiceModal.show(TodoOptionsSheet);
  };
  return (
    <Fragment>
      {isFocused && (
        <StatusBar backgroundColor="white" barStyle="dark-content" />
      )}
      <SafeAreaView style={[tailwind("flex-1")]}>
        <Header showLogo showDate />
        <View style={[tailwind("mt-4 px-6 flex-1")]}>
          <View style={tailwind('mb-5 mt-2')}>
            <TodoItemList
              icon={
                <IconButton
                  icon={
                    <Icon
                      name="exclamation"
                      stroke="none"
                      fill="black"
                      height={20}
                      width={20}
                    />
                  }
                />}
              name="Urgent"
              onPress={() => navigation.navigate("URGENT")}
            />
            <TodoItemList
              icon={
                <IconButton
                  icon={
                    <Icon
                      name="check"
                      stroke="#FECB4D"
                      fill="white"
                      height={16}
                      width={16}
                    />
                  }
                  style={tailwind("border border-primary-200 bg-primary-200")}
                />}
              name="Completed"
              onPress={() => navigation.navigate("COMPLETED")}
            />

            <TodoItemList
              icon={
                <IconButton
                  icon={
                    <View
                      style={tailwind(
                        "h-6 w-6 bg-white rounded-full border-white border-4 bg-blue-primary"
                      )}
                    />
                  }
                  style={tailwind("border border-blue-primary bg-blue-primary")}
                />}
              name="Delegated"
              onPress={() => navigation.navigate("DELEGATED")}
            />

            <TodoItemList
              icon={
                <IconButton
                  icon={
                    <View
                      style={tailwind(
                        "h-6 w-6 bg-white rounded-full border-white border-4 bg-secondary-500"
                      )}
                    />
                  }
                  style={tailwind("border border-secondary-500 bg-secondary-500")}
                />}
              name="Recently Deleted"
              onPress={() => navigation.navigate("DELETED")}
            />
          </View>
          <View style={tailwind('mb-2')}>
            <Typography variant="2xl" weight="medium">
              To-do Lists
            </Typography>
          </View>
          <View style={tailwind("mt-5 flex-1")}>
            <SelectTodoList />
          </View>
        </View>
        <TouchableOpacity
          onPress={onAddToto}
          style={tailwind("absolute right-4 bottom-6")}
          activeOpacity={1}
        >
          <Icon name="plus" stroke="none" width={60} height={60} />
        </TouchableOpacity>
      </SafeAreaView>
    </Fragment>
  );
};
interface IconButtonProps {
  style?: ViewStyle,
  icon?: React.ReactNode
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, style }) => {
  const tailwind = useTailwind();

  return (
    <View
      style={[
        tailwind(
          "h-7 w-7 rounded-full bg-white flex items-center justify-center"
        ), style
      ]}
    >
      {icon}
    </View>
  )
}