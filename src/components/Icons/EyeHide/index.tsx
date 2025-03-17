import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const EyeHide: React.FC<IconOtherProps> = ({ ...props }) => (
  <Svg viewBox="0 0 16 16" {...props}>
    <Path
      d="M6.31328 9.68661C5.87995 9.25328 5.61328 8.65995 5.61328 7.99995C5.61328 6.67995 6.67995 5.61328 7.99995 5.61328C8.65995 5.61328 9.25328 5.87995 9.68661 6.31328L6.31328 9.68661Z"
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.8799 3.84682C10.7132 2.96682 9.3799 2.48682 7.9999 2.48682C5.64656 2.48682 3.45323 3.87348 1.92656 6.27348C1.32656 7.21348 1.32656 8.79348 1.92656 9.73348C2.45323 10.5602 3.06656 11.2735 3.73323 11.8468"
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.61328 13.02C6.37328 13.34 7.17995 13.5133 7.99995 13.5133C10.3533 13.5133 12.5466 12.1266 14.0733 9.72662C14.6733 8.78662 14.6733 7.20662 14.0733 6.26662C13.8533 5.91995 13.6133 5.59329 13.3666 5.28662"
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.34 8.4668C10.1666 9.4068 9.39996 10.1735 8.45996 10.3468"
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.31301 9.68652L1.33301 14.6665"
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.6665 1.3335L9.68652 6.3135"
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default EyeHide;
