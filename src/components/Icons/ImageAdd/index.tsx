import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const ImageAdd: React.FC<IconOtherProps> = ({ ...props }) => (
  <Svg
    width={45}
    height={44}
    viewBox="0 0 45 44"
    fill="none"
    {...props}
  >
    <Path
      d="M4.6 4.6H34.5V20.7H39.1V4.6C39.1 2.0631 37.0369 0 34.5 0H4.6C2.0631 0 0 2.0631 0 4.6V32.2C0 34.7369 2.0631 36.8 4.6 36.8H23V32.2H4.6V4.6Z"
      fill="#4D4D4D"
    />
    <Path
      d="M12.8004 18.3998L5.90039 27.5998H31.2004L22.0004 13.7998L15.1004 22.9998L12.8004 18.3998Z"
      fill="#4D4D4D"
    />
    <Path
      d="M38.0996 25.2998H33.4996V32.1998H26.5996V36.7998H33.4996V43.6998H38.0996V36.7998H44.9996V32.1998H38.0996V25.2998Z"
      fill="#4D4D4D"
    />
  </Svg>
);
export default ImageAdd;
