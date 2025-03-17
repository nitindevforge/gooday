import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const Mail: React.FC<IconOtherProps> = ({ ...props }) => (
  props?.outline ?
    <Svg
      viewBox="0 0 24 16"
      fill="none"
      {...props}
    >
      <Path
        d="M21.3335 4L12.0002 9L2.66683 4V2L12.0002 7L21.3335 2M21.3335 0H2.66683C1.37183 0 0.333496 0.89 0.333496 2V14C0.333496 14.5304 0.579329 15.0391 1.01691 15.4142C1.4545 15.7893 2.04799 16 2.66683 16H21.3335C21.9523 16 22.5458 15.7893 22.9834 15.4142C23.421 15.0391 23.6668 14.5304 23.6668 14V2C23.6668 1.46957 23.421 0.960859 22.9834 0.585786C22.5458 0.210714 21.9523 0 21.3335 0Z"
        fill={props?.fill}
      />
    </Svg>
    :
    <Svg viewBox="0 0 22 23" {...props} fill="none">
      <Path
        d="M6.41732 19.6771C3.66732 19.6771 1.83398 18.3021 1.83398 15.0937L1.83398 8.67708C1.83398 5.46875 3.66732 4.09375 6.41732 4.09375L15.584 4.09375C18.334 4.09375 20.1673 5.46875 20.1673 8.67708L20.1673 15.0937C20.1673 18.3021 18.334 19.6771 15.584 19.6771L6.41732 19.6771Z"
        stroke="#2E2E2E"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.5827 9.13477L12.7135 11.4264C11.7693 12.1781 10.2202 12.1781 9.27601 11.4264L6.41602 9.13477"
        stroke="#2E2E2E"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
);
export default Mail;
