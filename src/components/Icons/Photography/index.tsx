import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const Photography: React.FC<IconOtherProps> = ({ ...props }) => (
  <Svg
    width={25}
    height={21}
    viewBox="0 0 25 21"
    fill="none"
    {...props}
  >
    <Path
      d="M19.9658 20H5.03423C2.82032 20 1 18.0587 1 15.6807V8.0613C1 5.68327 2.82032 3.74202 5.03423 3.74202H7.76471L8.25669 2.11622C8.45348 1.46105 9.04385 1 9.68342 1H14.923C15.538 1 16.1037 1.41252 16.3251 2.04342L16.9155 3.74202H19.9658C22.1797 3.74202 24 5.68327 24 8.0613V15.6807C24 18.0587 22.1797 20 19.9658 20Z"
      stroke={props?.fill}
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <Path
      d="M12.5 16C14.9853 16 17 13.9853 17 11.5C17 9.01472 14.9853 7 12.5 7C10.0147 7 8 9.01472 8 11.5C8 13.9853 10.0147 16 12.5 16Z"
      stroke={props?.fill}
      strokeWidth={2}
      strokeMiterlimit={10}
    />
  </Svg>
);
export default Photography;
