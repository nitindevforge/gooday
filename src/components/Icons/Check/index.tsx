import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const Check: React.FC<IconOtherProps> = ({ ...props }) => (
  <Svg viewBox="0 0 8 7" {...props} fill="none">
    <Path
      d="M3.00078 6.27222L0.300781 3.62522L1.70078 2.19522L3.00078 3.46622L6.30078 0.199219L7.70078 1.62122L3.00078 6.27122V6.27222Z"
      fill={props.fill}
    />
  </Svg>
);
export default Check;
