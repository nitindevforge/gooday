import { ImageProps } from "react-native";

export interface AssistantProps extends Omit<ImageProps, "source"> {
  id?: string;
  group?: boolean
  profile?: boolean
}
