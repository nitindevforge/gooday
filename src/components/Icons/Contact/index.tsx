import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const Contact: React.FC<IconOtherProps> = ({ ...props }) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <Path
      d="M10 12C12.2091 12 14 10.2091 14 8C14 5.79086 12.2091 4 10 4C7.79086 4 6 5.79086 6 8C6 10.2091 7.79086 12 10 12ZM10 6C11.1046 6 12 6.89543 12 8C12 9.10457 11.1046 10 10 10C8.89543 10 8 9.10457 8 8C8 6.89543 8.89543 6 10 6Z"
      fill={props.fill}
    />
    <Path
      d="M2 20C0.895431 20 0 19.1046 0 18V2C0 0.895431 0.895431 0 2 0H18C19.1046 0 20 0.895431 20 2V18C20 19.1046 19.1046 20 18 20H2ZM2 2V18H5C5 15.2386 7.23858 13 10 13C12.7614 13 15 15.2386 15 18H18V2H2ZM13 18C13 16.3431 11.6569 15 10 15C8.34315 15 7 16.3431 7 18H13Z"
      fill={props.fill}
    />
  </Svg>
);
export default Contact;
