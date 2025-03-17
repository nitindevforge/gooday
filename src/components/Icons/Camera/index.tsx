import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const Camera: React.FC<IconOtherProps> = ({ ...props }) => (
  <Svg
    viewBox="0 0 25 25"
    {...props}
    fill="none"
  >
    <Circle
      cx={12.5}
      cy={12.5}
      r={12.037}
      fill="#3A5ACA"
      stroke="white"
      strokeWidth={0.925926}
    />
    <Path
      d="M15.6492 15.9678H9.8362C8.9743 15.9678 8.26562 15.2016 8.26562 14.2631V11.256C8.26562 10.3175 8.9743 9.5514 9.8362 9.5514H10.8992L11.0907 8.90976C11.1674 8.65119 11.3972 8.46924 11.6462 8.46924H13.686C13.9254 8.46924 14.1457 8.63204 14.2319 8.88103L14.4617 9.5514H15.6492C16.5111 9.5514 17.2198 10.3175 17.2198 11.256V14.2631C17.2198 15.2016 16.5111 15.9678 15.6492 15.9678Z"
      stroke="white"
      strokeMiterlimit={10}
    />
    <Path
      d="M12.7478 14.2631C13.684 14.2631 14.4429 13.5042 14.4429 12.568C14.4429 11.6318 13.684 10.8729 12.7478 10.8729C11.8116 10.8729 11.0527 11.6318 11.0527 12.568C11.0527 13.5042 11.8116 14.2631 12.7478 14.2631Z"
      stroke="white"
      strokeMiterlimit={10}
    />
  </Svg>);
export default Camera;
