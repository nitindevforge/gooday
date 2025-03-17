import {
  TouchableOpacityProps,
} from "react-native";
import { RoleData } from "../RoleForm/type";

export interface RoleCardProps extends TouchableOpacityProps {
  role: RoleData;
  className?: string;
  checked?: boolean;
}
