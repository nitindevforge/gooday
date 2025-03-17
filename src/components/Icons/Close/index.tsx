import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const Close: React.FC<IconOtherProps> = ({ ...props }) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path
      d="M17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5Z"
      fill={props?.fill}
    />
  </Svg>
);
export default Close;
