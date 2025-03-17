import { useContext } from "react";
import { NavigationRouteContext } from "@app/common";
import { ContextValues } from "../Context/type";

export const useNavigationRoute = () => useContext<ContextValues>(NavigationRouteContext)