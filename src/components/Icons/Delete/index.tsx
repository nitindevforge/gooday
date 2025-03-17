import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
export const Delete: React.FC<IconOtherProps> = ({ outline = false, ...props }) => (
  outline ?
    <Svg
      viewBox="0 0 17 19"
      {...props}
      fill="none"
    >
      <Path
        d="M2.3125 3.625L3.13281 16.75C3.17178 17.5084 3.72344 18.0625 4.44531 18.0625H11.9922C12.7169 18.0625 13.2583 17.5084 13.3047 16.75L14.125 3.625"
        stroke={props?.stroke}
        strokeWidth={1.3125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M1 3.625H15.4375H1Z" fill={props?.fill} />
      <Path
        d="M1 3.625H15.4375"
        stroke={props?.stroke}
        strokeWidth={1.3125}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <Path
        d="M5.59375 3.625V1.98438C5.59337 1.855 5.61857 1.72683 5.66791 1.60723C5.71724 1.48763 5.78974 1.37896 5.88122 1.28748C5.9727 1.19599 6.08137 1.1235 6.20097 1.07416C6.32057 1.02483 6.44875 0.999625 6.57812 1H9.85938C9.98875 0.999625 10.1169 1.02483 10.2365 1.07416C10.3561 1.1235 10.4648 1.19599 10.5563 1.28748C10.6478 1.37896 10.7203 1.48763 10.7696 1.60723C10.8189 1.72683 10.8441 1.855 10.8438 1.98438V3.625M8.21875 6.25V15.4375M5.26562 6.25L5.59375 15.4375M11.1719 6.25L10.8438 15.4375"
        stroke={props?.stroke}
        strokeWidth={1.3125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
    :
    <Svg viewBox="0 0 24 24" {...props}>
      <Path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </Svg>
)
