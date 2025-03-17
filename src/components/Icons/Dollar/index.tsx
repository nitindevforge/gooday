import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";

const Dollar: React.FC<IconOtherProps> = ({ ...props }) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <Path
      d="M5.78125 9.55258C5.78125 10.4126 6.44125 11.1059 7.26125 11.1059H8.93458C9.64792 11.1059 10.2279 10.4992 10.2279 9.75258C10.2279 8.93925 9.87458 8.65258 9.34792 8.46591L6.66125 7.53258C6.13458 7.34591 5.78125 7.05924 5.78125 6.24591C5.78125 5.49924 6.36125 4.89258 7.07458 4.89258H8.74792C9.56792 4.89258 10.2279 5.58591 10.2279 6.44591"
      stroke={props?.stroke}
      fill={props?.fill}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 4V12"
      stroke={props?.stroke}
      fill={props?.fill}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.99992 14.6673C11.6818 14.6673 14.6666 11.6825 14.6666 8.00065C14.6666 4.31875 11.6818 1.33398 7.99992 1.33398C4.31802 1.33398 1.33325 4.31875 1.33325 8.00065C1.33325 11.6825 4.31802 14.6673 7.99992 14.6673Z"
      stroke={props?.stroke}
      fill={props?.fill}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Dollar;
