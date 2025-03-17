import React, { useState } from "react";
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Icon, Typography } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  DropdownIconModal,
  TabBar,
  TodoNavigationStackParamList,
} from "@app/modules";
import { MyTaskList } from "../MyTask";
import { MyFriendsTaskList } from "../MyFriendsTask";
import { TaskCheckView } from "../../Components/TaskCheckbox/type";

export const DelegatedListContainer = () => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NativeStackNavigationProp<TodoNavigationStackParamList>>();
  const [active, setActive] = useState<string>("to-me");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState<TaskCheckView>(
    TaskCheckView.COMPLETION_TOGGLE
  );

  const todoOptions = [
    {
      label: "Delete Tasks",
      icon: {
        name: "delete",
        height: 20,
        width: 20,
        stroke: "#E24653",
      },
      onPress: () => setView(TaskCheckView.DELETABLE),
      textColor: "secondary-500",
    },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={tailwind("flex-1")}>
        <View style={tailwind("flex-row items-center")}>
          <View style={tailwind("flex-row items-center pl-0.5")}>
            <TouchableOpacity
              style={tailwind("flex items-start w-7 h-11 justify-center")}
              onPress={navigation.goBack}
            >
              <Icon
                fill="#2E2E2E"
                name="back"
                stroke="none"
                width={10}
                height={20}
              />
            </TouchableOpacity>
            <View style={tailwind("pl-2")}>
              <Typography variant="xl">Delegated</Typography>
            </View>
          </View>
          <View
            style={[
              tailwind("flex-row items-center flex-1 justify-end"),
              { gap: 12 },
            ]}
          >
            <DropdownIconModal
              variant="between"
              data={todoOptions?.filter((el) => el)}
              icon={{
                name: "circle-dots",
                width: 30,
                height: 30,
              }}
              onModal={(value) => setMenuOpen(value)}
              visible={isMenuOpen}
            />
          </View>
        </View>

        <View
          style={[
            tailwind("flex-1 relative"),
            {
              gap: 20,
            },
          ]}
        >
          <TabBar
            tabs={[
              {
                label: "To me",
                value: "to-me",
              },
              {
                label: "To friends",
                value: "to-friends",
              },
            ]}
            onPress={(item) => {
              setActive(item);
              setView(TaskCheckView.COMPLETION_TOGGLE);
            }}
            active={active}
            tabStyle={tailwind("items-center flex-1")}
          />

          {active === "to-me" ? (
            <MyTaskList setView={setView} view={view} />
          ) : (
            <MyFriendsTaskList setView={setView} view={view} />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
