import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const Yoga: React.FC<IconOtherProps> = (props) => (
  <Svg viewBox="0 0 20 22" {...props} fill="none">
    <Path
      d="M10 10L9 13L10 16M10 10L7.5 8.5L7 13M10 10L13.5 12V17.5M10 16H8.5L7 13M10 16L13.5 17.5M7 13V5L11 1M7 13L8 16M8 16H4L1 21M8 16L9 9.5L8 12.5V16ZM18.5 21L13.5 17.5M12 7.5C11.7348 7.5 11.4804 7.39464 11.2929 7.20711C11.1054 7.01957 11 6.76522 11 6.5C11 6.23478 11.1054 5.98043 11.2929 5.79289C11.4804 5.60536 11.7348 5.5 12 5.5C12.2652 5.5 12.5196 5.60536 12.7071 5.79289C12.8946 5.98043 13 6.23478 13 6.5C13 6.76522 12.8946 7.01957 12.7071 7.20711C12.5196 7.39464 12.2652 7.5 12 7.5Z"
      stroke={props?.fill}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Yoga;
