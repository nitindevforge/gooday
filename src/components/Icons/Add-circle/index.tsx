import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const AddCircle: React.FC<IconOtherProps> = (props) => (
  <Svg viewBox="0 0 20 21" {...props} fill="none">
    <Path
      d="M10 0.5C4.49 0.5 0 4.99 0 10.5C0 16.01 4.49 20.5 10 20.5C15.51 20.5 20 16.01 20 10.5C20 4.99 15.51 0.5 10 0.5ZM14 11.25H10.75V14.5C10.75 14.91 10.41 15.25 10 15.25C9.59 15.25 9.25 14.91 9.25 14.5V11.25H6C5.59 11.25 5.25 10.91 5.25 10.5C5.25 10.09 5.59 9.75 6 9.75H9.25V6.5C9.25 6.09 9.59 5.75 10 5.75C10.41 5.75 10.75 6.09 10.75 6.5V9.75H14C14.41 9.75 14.75 10.09 14.75 10.5C14.75 10.91 14.41 11.25 14 11.25Z"
      fill={props?.fill}
    />
  </Svg>
);
export default AddCircle;
