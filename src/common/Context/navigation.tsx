import React, { createContext, useCallback, useEffect, useState } from "react";
import { ContextValues, RouteProps } from "./type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthNavigationParamList, BottomSheet } from "@app/modules";
import { useNavigation } from "@react-navigation/native";
import NiceModal from "@ebay/nice-modal-react";
import { RootNavigationParamList } from "@app/navigation";

export const NavigationRouteContext = createContext<ContextValues>({});

export const NavigationRouteProvider = ({ children }: RouteProps) => {
  const [pendingActionsState, setPendingAction] = useState<string[]>([]);
  const [canBackGo, setCanBackGo] = useState<boolean>(false);
  const [currentRoute, setCurrentRoute] = useState<string>("");
  const [hideModel, setHideModel] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)
  const [back, setBack] = useState<boolean>(false);
  const authNavigation =
    useNavigation<NativeStackNavigationProp<AuthNavigationParamList & RootNavigationParamList>>();

  const goToRoute = useCallback(
    (prev: boolean = false) => {
      setBack(prev);
      const activeIndex: number = pendingActionsState?.indexOf(currentRoute!);

      let getCurrentRoute =
        activeIndex < pendingActionsState?.length - 1
          ? pendingActionsState?.[activeIndex + 1]
          : currentRoute;
      if (prev) {
        getCurrentRoute =
          activeIndex > 0
            ? pendingActionsState?.[activeIndex - 1]
            : currentRoute;
      } else {
        if (
          pendingActionsState?.[pendingActionsState?.length - 1] ===
          currentRoute
        ) {
          resetRouteState()
          authNavigation.navigate("ON_BOARD");
          return
        }
      }
      setCurrentRoute(getCurrentRoute);
      setCanBackGo(pendingActionsState?.[0] !== getCurrentRoute);
    },
    [pendingActionsState, currentRoute]
  );

  const resetRouteState = () => {
    setCurrentRoute("");
    setPendingAction([]);
    setCanBackGo(false);
    setHideModel(false);
    setLoading(false);
    NiceModal.hide(BottomSheet)
  };

  const contextValue: ContextValues = {
    currentRoute,
    goToRoute,
    canBackGo,
    setCanBackGo,
    setCurrentRoute,
    setPendingAction,
    pendingActionsState,
    hideModel,
    resetRouteState,
    back,
    loading,
    setLoading
  };
  return (
    <NavigationRouteContext.Provider value={contextValue}>
      {children}
    </NavigationRouteContext.Provider>
  );
};
