import * as React from "react";
import Svg, { G, Polyline } from "react-native-svg";
import { IconOtherProps } from "../type";
const DownArrow: React.FC<IconOtherProps> = ({ ...props }) => (
  <Svg
    id="Layer_1"
    viewBox="0 0 64 64"
    {...props}
  >
    <G>
      <Polyline
        fill="none"
        stroke={props?.stroke}
        strokeWidth={6}
        strokeLinejoin="bevel"
        strokeMiterlimit={10}
        points="15,24 32,41  49,24  "
      />
    </G>
  </Svg>
);
export default DownArrow;
