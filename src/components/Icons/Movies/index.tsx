import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const Movies: React.FC<IconOtherProps> = ({ ...props }) => (
  <Svg
    width={26}
    height={32}
    viewBox="0 0 26 32"
    fill="none"
    {...props}
  >
    <Path
      d="M7.58333 5.33337V26.6667M18.4167 5.33337V26.6667M3.25 10.6667H7.58333M18.4167 10.6667H22.75M3.25 16H22.75M3.25 21.3334H7.58333M18.4167 21.3334H22.75M4.33333 26.6667H21.6667C21.954 26.6667 22.2295 26.5262 22.4327 26.2762C22.6359 26.0261 22.75 25.687 22.75 25.3334V6.66671C22.75 6.31309 22.6359 5.97395 22.4327 5.7239C22.2295 5.47385 21.954 5.33337 21.6667 5.33337H4.33333C4.04602 5.33337 3.77047 5.47385 3.5673 5.7239C3.36414 5.97395 3.25 6.31309 3.25 6.66671V25.3334C3.25 25.687 3.36414 26.0261 3.5673 26.2762C3.77047 26.5262 4.04602 26.6667 4.33333 26.6667Z"
      stroke={props?.fill}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Movies;
