import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const Music: React.FC<IconOtherProps> = ({ ...props }) => (
  <Svg
    width={29}
    height={30}
    viewBox="0 0 29 30"
    fill="none"
    {...props}
  >
    <Path
      d="M10.875 23.75V7.5L25.375 3.75V20M10.875 23.75C10.875 25.1313 9.25221 26.25 7.25 26.25C5.24779 26.25 3.625 25.1313 3.625 23.75C3.625 22.3687 5.24779 21.25 7.25 21.25C9.25221 21.25 10.875 22.3687 10.875 23.75ZM25.375 20C25.375 21.3813 23.7522 22.5 21.75 22.5C19.7478 22.5 18.125 21.3813 18.125 20C18.125 18.6187 19.7478 17.5 21.75 17.5C23.7522 17.5 25.375 18.6187 25.375 20ZM10.875 12.5L25.375 8.75"
      stroke={props?.fill}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Music;
