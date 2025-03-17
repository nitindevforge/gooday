import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const Hangout: React.FC<IconOtherProps> = ({ ...props }) => (
  <Svg
    width={26}
    height={27}
    viewBox="0 0 26 27"
    fill="none"
    {...props}
  >
    <Path
      d="M18.416 22.5H23.8327V20.25C23.8326 19.5486 23.6222 18.8646 23.2305 18.2932C22.8388 17.7218 22.2855 17.2912 21.6473 17.0615C21.0092 16.8317 20.3179 16.8141 19.6697 17.0111C19.0215 17.2082 18.4485 17.61 18.0303 18.1609M18.416 22.5H7.58268M18.416 22.5V20.25C18.416 19.512 18.2795 18.8066 18.0303 18.1609M18.0303 18.1609C17.628 17.1168 16.9338 16.2219 16.037 15.5915C15.1403 14.9611 14.0822 14.6242 12.9993 14.6242C11.9165 14.6242 10.8584 14.9611 9.96169 15.5915C9.06495 16.2219 8.37065 17.1168 7.96835 18.1609M7.58268 22.5H2.16602V20.25C2.16607 19.5486 2.37655 18.8646 2.7682 18.2932C3.15985 17.7218 3.71322 17.2912 4.35137 17.0615C4.98952 16.8317 5.68076 16.8141 6.32898 17.0111C6.97721 17.2082 7.55021 17.61 7.96835 18.1609M7.58268 22.5V20.25C7.58268 19.512 7.71918 18.8066 7.96835 18.1609M16.2493 7.875C16.2493 8.77011 15.9069 9.62855 15.2974 10.2615C14.688 10.8944 13.8613 11.25 12.9993 11.25C12.1374 11.25 11.3107 10.8944 10.7013 10.2615C10.0918 9.62855 9.74935 8.77011 9.74935 7.875C9.74935 6.97989 10.0918 6.12145 10.7013 5.48851C11.3107 4.85558 12.1374 4.5 12.9993 4.5C13.8613 4.5 14.688 4.85558 15.2974 5.48851C15.9069 6.12145 16.2493 6.97989 16.2493 7.875ZM22.7493 11.25C22.7493 11.8467 22.5211 12.419 22.1147 12.841C21.7084 13.2629 21.1573 13.5 20.5827 13.5C20.008 13.5 19.4569 13.2629 19.0506 12.841C18.6443 12.419 18.416 11.8467 18.416 11.25C18.416 10.6533 18.6443 10.081 19.0506 9.65901C19.4569 9.23705 20.008 9 20.5827 9C21.1573 9 21.7084 9.23705 22.1147 9.65901C22.5211 10.081 22.7493 10.6533 22.7493 11.25ZM7.58268 11.25C7.58268 11.8467 7.35441 12.419 6.94808 12.841C6.54175 13.2629 5.99065 13.5 5.41602 13.5C4.84138 13.5 4.29028 13.2629 3.88395 12.841C3.47762 12.419 3.24935 11.8467 3.24935 11.25C3.24935 10.6533 3.47762 10.081 3.88395 9.65901C4.29028 9.23705 4.84138 9 5.41602 9C5.99065 9 6.54175 9.23705 6.94808 9.65901C7.35441 10.081 7.58268 10.6533 7.58268 11.25Z"
      stroke={props?.fill}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Hangout;
