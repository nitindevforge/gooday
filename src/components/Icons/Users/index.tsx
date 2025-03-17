import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
export const Users: React.FC<IconOtherProps> = (props) => (
  <Svg viewBox="0 0 13 14" {...props} fill="none">
    <Path
      d="M11.375 11.3333C11.375 10.3899 10.4706 9.58735 9.20833 9.28991M8.125 11.3333C8.125 10.1367 6.66993 9.16666 4.875 9.16666C3.08007 9.16666 1.625 10.1367 1.625 11.3333M8.125 7.54166C9.32162 7.54166 10.2917 6.57161 10.2917 5.37499C10.2917 4.17838 9.32162 3.20833 8.125 3.20833M4.875 7.54166C3.67838 7.54166 2.70833 6.57161 2.70833 5.37499C2.70833 4.17838 3.67838 3.20833 4.875 3.20833C6.07162 3.20833 7.04167 4.17838 7.04167 5.37499C7.04167 6.57161 6.07162 7.54166 4.875 7.54166Z"
      stroke={props?.fill}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
