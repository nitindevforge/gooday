import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const EyeShow: React.FC<IconOtherProps> = ({ ...props }) => (
  <Svg viewBox="0 0 16 16" {...props}>
    <Path
      d="M7.99995 10.3866C6.67995 10.3866 5.61328 9.31995 5.61328 7.99995C5.61328 6.67995 6.67995 5.61328 7.99995 5.61328C9.31995 5.61328 10.3866 6.67995 10.3866 7.99995C10.3866 9.31995 9.31995 10.3866 7.99995 10.3866Z"
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.0732 9.72665C14.6732 8.78665 14.6732 7.20665 14.0732 6.26665C12.5466 3.86665 10.3532 2.47998 7.9999 2.47998C5.64656 2.47998 3.45323 3.86665 1.92656 6.26665C1.32656 7.20665 1.32656 8.78665 1.92656 9.72665C3.45323 12.1266 5.64656 13.5133 7.9999 13.5133C10.3532 13.5133 12.5466 12.1266 14.0732 9.72665Z"
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default EyeShow;
