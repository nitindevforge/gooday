import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const Hotel: React.FC<IconOtherProps> = ({ ...props }) => (
  <Svg
    width={24}
    height={22}
    viewBox="0 0 24 22"
    fill="none"
    {...props}
  >
    <Path
      d="M22.4 15.7864C22.4 9.25166 18.1623 3.8781 12.8 3.38806V0H11.2V3.38806C5.83775 3.87828 1.6 9.25166 1.6 15.7864V17.7656H22.4V15.7864ZM20.8 15.8526H3.2V15.7864C3.2 9.98471 7.14765 5.26464 12 5.26464C16.8524 5.26464 20.8 9.98465 20.8 15.7864V15.8526ZM0 20.087H24V22H0V20.087Z"
      fill={props?.fill}
    />
  </Svg>
);
export default Hotel;
