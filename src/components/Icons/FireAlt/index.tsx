import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const FireAlt: React.FC<IconOtherProps> = ({ ...props }) => (
  <Svg
    viewBox="0 0 14 24"
    {...props}
    fill="none"
  >
    <Path
      d="M4.5 10.0003C4.5 9.20875 3.44722 8.99895 3.16791 9.73957C2.49228 11.5311 2 13.1337 2 14.0002C2 16.7616 4.23858 19.0002 7 19.0002C9.76142 19.0002 12 16.7616 12 14.0002C12 13.0693 11.4318 11.2887 10.6784 9.33698C9.70257 6.80879 9.21464 5.54469 8.61233 5.4766C8.4196 5.45482 8.20934 5.49399 8.03739 5.58371C7.5 5.86413 7.5 7.24285 7.5 10.0003C7.5 10.8287 6.82843 11.5003 6 11.5003C5.17157 11.5003 4.5 10.8287 4.5 10.0003Z"
      stroke={props.fill}
    />
  </Svg>
);
export default FireAlt;
