import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const RightArrow: React.FC<IconOtherProps> = ({ ...props }) => (
  <Svg
    viewBox="0 0 14 12"
    {...props}
    fill="none"
  >
    <Path
      d="M1 6L11 6"
      stroke="#3A5ACA"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 1L13 6L8 11"
      stroke="#3A5ACA"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default RightArrow;
