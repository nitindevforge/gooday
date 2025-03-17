import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const MinusCircle: React.FC<IconOtherProps> = (props) => (
  <Svg viewBox="0 0 20 21" {...props} fill="none">
    <Path
      d="M10 0.5C4.49 0.5 0 4.99 0 10.5C0 16.01 4.49 20.5 10 20.5C15.51 20.5 20 16.01 20 10.5C20 4.99 15.51 0.5 10 0.5ZM13.92 11.25H5.92C5.51 11.25 5.17 10.91 5.17 10.5C5.17 10.09 5.51 9.75 5.92 9.75H13.92C14.33 9.75 14.67 10.09 14.67 10.5C14.67 10.91 14.34 11.25 13.92 11.25Z"
      fill={props?.fill}
    />
  </Svg>
);
export default MinusCircle;
