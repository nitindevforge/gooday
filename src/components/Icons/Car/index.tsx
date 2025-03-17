import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const Car: React.FC<IconOtherProps> = ({ ...props }) => (
  <Svg
    width={22}
    height={22}
    viewBox="0 0 22 22"
    fill="none"
    {...props}
  >
    <Path
      d="M20.6492 7.52278L19.1444 2.50678C18.9261 1.77648 18.5062 1.14119 17.9444 0.691177C17.3826 0.241164 16.7075 -0.000682251 16.0149 1.44561e-06H5.9851C5.29253 -0.000682251 4.61738 0.241164 4.05557 0.691177C3.49377 1.14119 3.07389 1.77648 2.8556 2.50678L1.3508 7.52278C0.950645 7.70882 0.608917 8.02214 0.368573 8.42337C0.12823 8.82459 -5.2899e-07 9.29581 0 9.77778V15.8889C0 16.7909 0.4444 17.5707 1.1 17.9948V20.7778C1.1 21.1019 1.21589 21.4128 1.42218 21.642C1.62847 21.8712 1.90826 22 2.2 22H3.3C3.59174 22 3.87153 21.8712 4.07782 21.642C4.28411 21.4128 4.4 21.1019 4.4 20.7778V18.3333H17.6V20.7778C17.6 21.1019 17.7159 21.4128 17.9222 21.642C18.1285 21.8712 18.4083 22 18.7 22H19.8C20.0917 22 20.3715 21.8712 20.5778 21.642C20.7841 21.4128 20.9 21.1019 20.9 20.7778V17.9948C21.2337 17.7821 21.5111 17.4755 21.7042 17.1058C21.8974 16.7361 21.9994 16.3164 22 15.8889V9.77778C22 9.29581 21.8718 8.82459 21.6314 8.42337C21.3911 8.02214 21.0494 7.70882 20.6492 7.52278ZM5.9851 2.44445H16.0138C16.4879 2.44445 16.9081 2.77933 17.0577 3.28045L18.2743 7.33333H3.7257L4.9412 3.28045C5.01418 3.03697 5.15429 2.8252 5.34165 2.67515C5.52902 2.5251 5.75414 2.44438 5.9851 2.44445ZM3.85 14.6667C3.63325 14.6666 3.41863 14.6191 3.2184 14.5268C3.01818 14.4346 2.83626 14.2994 2.68305 14.1291C2.52983 13.9587 2.40831 13.7565 2.32543 13.534C2.24255 13.3114 2.19993 13.0729 2.2 12.8321C2.20007 12.5913 2.24284 12.3528 2.32585 12.1303C2.40887 11.9079 2.53051 11.7057 2.68382 11.5355C2.83714 11.3653 3.01914 11.2302 3.21942 11.1381C3.4197 11.0461 3.63435 10.9987 3.8511 10.9988C4.28885 10.9989 4.70862 11.1923 5.01805 11.5364C5.32749 11.8804 5.50125 12.3469 5.5011 12.8333C5.50095 13.3197 5.32692 13.7861 5.01728 14.1299C4.70763 14.4738 4.28775 14.6668 3.85 14.6667ZM18.15 14.6667C17.9332 14.6666 17.7186 14.6191 17.5184 14.5268C17.3182 14.4346 17.1363 14.2994 16.983 14.1291C16.8298 13.9587 16.7083 13.7565 16.6254 13.534C16.5425 13.3114 16.4999 13.0729 16.5 12.8321C16.5001 12.5913 16.5428 12.3528 16.6259 12.1303C16.7089 11.9079 16.8305 11.7057 16.9838 11.5355C17.1371 11.3653 17.3191 11.2302 17.5194 11.1381C17.7197 11.0461 17.9343 10.9987 18.1511 10.9988C18.5889 10.9989 19.0086 11.1923 19.3181 11.5364C19.6275 11.8804 19.8012 12.3469 19.8011 12.8333C19.801 13.3197 19.6269 13.7861 19.3173 14.1299C19.0076 14.4738 18.5878 14.6668 18.15 14.6667Z"
      fill={props?.fill}
    />
  </Svg>
);
export default Car;
