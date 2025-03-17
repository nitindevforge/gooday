import * as React from "react";
import Svg, { Circle } from "react-native-svg";
import { IconOtherProps } from "../type";
const Eclipse: React.FC<IconOtherProps> = ({ ...props }) => (
  <Svg viewBox="0 0 2 8" fill="none" {...props}>
    <Circle cx={1} cy={1} r={1} fill={props?.fill} />
    <Circle cx={1} cy={7} r={1} fill={props?.fill} />
  </Svg>
);
export default Eclipse;
