import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
export const Heart: React.FC<IconOtherProps> = (props) => (
  <Svg viewBox="0 0 12 12" {...props} fill="none">
    <Path
      d="M6 3.84714C5 1.49992 1.5 1.74992 1.5 4.74994C1.5 7.74995 6 10.25 6 10.25C6 10.25 10.5 7.74995 10.5 4.74994C10.5 1.74992 7 1.49992 6 3.84714Z"
      stroke={props?.fill}
      fill={!props.outline ? props?.fill : 'none'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
