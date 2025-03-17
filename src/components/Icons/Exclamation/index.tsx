import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const Exclamation:React.FC<IconOtherProps> = (props) => (
  <Svg
    viewBox="0 0 25 28"
    {...props}
    fill="none"
  >
    <Path
      d="M13.8052 6.97719L12.5 15.7505L11.1948 6.97719C11.1635 6.76505 11.1738 6.54782 11.225 6.34058C11.2762 6.13335 11.367 5.94107 11.4912 5.7771C11.6154 5.61313 11.77 5.4814 11.9442 5.39105C12.1184 5.3007 12.3081 5.25391 12.5 5.25391C12.692 5.25391 12.8817 5.3007 13.0559 5.39105C13.2301 5.4814 13.3847 5.61313 13.5089 5.7771C13.6331 5.94107 13.7239 6.13335 13.7751 6.34058C13.8263 6.54782 13.8366 6.76505 13.8052 6.97719Z"
      stroke={props.fill}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.5 23.3333C13.0753 23.3333 13.5417 22.811 13.5417 22.1667C13.5417 21.5223 13.0753 21 12.5 21C11.9247 21 11.4584 21.5223 11.4584 22.1667C11.4584 22.811 11.9247 23.3333 12.5 23.3333Z"
      stroke={props.fill}
      strokeWidth={2}
    />
  </Svg>
);
export default Exclamation;
