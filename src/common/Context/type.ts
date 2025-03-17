import { ReactNode } from "react";
import { StatusBarProps } from "react-native";

export type RouteProps = {
  children: ReactNode;
};

export type ContextValues = {
  currentRoute: string;
  goToRoute: (canBackGo?: boolean) => void;
  canBackGo: boolean;
  setCanBackGo: (canBackGo: boolean) => void;
  setCurrentRoute: (currentRoute: string) => void;
  setPendingAction: (pendingActionsState: string[]) => void;
  pendingActionsState: string[];
  hideModel: boolean;
  resetRouteState: () => void;
  back: boolean;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};
