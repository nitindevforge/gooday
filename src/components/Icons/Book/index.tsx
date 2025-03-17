import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const Book: React.FC<IconOtherProps> = ({ ...props }) => (
  <Svg
    width={29}
    height={22}
    viewBox="0 0 29 22"
    fill="none"
    {...props}
  >
    <Path
      d="M14.5 21C12.4477 19.8879 10.1197 19.3024 7.75 19.3024C5.38026 19.3024 3.05226 19.8879 1 21V2.69758C3.05226 1.58548 5.38026 1 7.75 1C10.1197 1 12.4477 1.58548 14.5 2.69758M14.5 21C16.5523 19.8879 18.8803 19.3024 21.25 19.3024C23.6197 19.3024 25.9477 19.8879 28 21V2.69758C25.9477 1.58548 23.6197 1 21.25 1C18.8803 1 16.5523 1.58548 14.5 2.69758M14.5 21V2.69758"
      stroke={props?.fill}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Book;
