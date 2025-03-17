import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const CheckMark: React.FC<IconOtherProps> = ({ ...props }) => (
  <Svg viewBox="0 0 38 31" {...props} fill="none">
    <Path
      d="M4.49707 20.5646L7.07458 23.7361C9.8759 27.183 15.1378 27.183 17.9391 23.7361L33.8994 4.09766"
      stroke="white"
      strokeWidth={8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default CheckMark;
