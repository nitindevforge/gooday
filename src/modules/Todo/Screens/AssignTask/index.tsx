import { Header, TodoNavigationStackParamList } from "@app/modules";
import React from "react";
import { SafeAreaView, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { RouteProp, useRoute } from "@react-navigation/native";
import { TaskHeader } from "../../Components";
import { AssignTaskCard } from "../../Containers/AssignTaskCard";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export const AssignTaskScreen = () => {
  const tailwind = useTailwind();
  const { params } =
    useRoute<RouteProp<TodoNavigationStackParamList, "ASSIGN_TASK">>();

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <Header showLogo showDate />
      <View style={[tailwind("px-6 flex-1"), { rowGap: 24 }]}>
        <TaskHeader />
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          <View style={[{ gap: 20 }, tailwind("pb-5")]}>
            {params.tasks.map((task) => (
              <AssignTaskCard task={task} key={task.id} />
            ))}
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};
