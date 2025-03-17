import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const AddImage: React.FC<IconOtherProps> = ({ round = false, ...props }) =>
(
  <Svg
    viewBox="0 0 45 44"
    fill="none"
    {...props}
  >
    <Path
      d="M4.6 4.6H34.5V20.7H39.1V4.6C39.1 2.0631 37.0369 0 34.5 0H4.6C2.0631 0 0 2.0631 0 4.6V32.2C0 34.7369 2.0631 36.8 4.6 36.8H23V32.2H4.6V4.6Z"
      fill={props?.fill}
    />
    <Path
      d="M12.7999 18.3998L5.8999 27.5998H31.1999L21.9999 13.7998L15.0999 22.9998L12.7999 18.3998Z"
      fill={props?.fill}
    />
    <Path
      d="M38.1001 25.2998H33.5001V32.1998H26.6001V36.7998H33.5001V43.6998H38.1001V36.7998H45.0001V32.1998H38.1001V25.2998Z"
      fill={props?.fill}
    />
  </Svg>
);
export default AddImage;
