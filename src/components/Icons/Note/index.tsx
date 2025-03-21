import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
export const Note: React.FC<IconOtherProps> = (props) =>
  props?.outline ? (
    <Svg viewBox="0 0 24 24" {...props} fill="none">
      <Path
        d="M20 8.25V18C20 21 18.21 22 16 22H8C5.79 22 4 21 4 18V8.25C4 5 5.79 4.25 8 4.25C8 4.87 8.24997 5.43 8.65997 5.84C9.06997 6.25 9.63 6.5 10.25 6.5H13.75C14.99 6.5 16 5.49 16 4.25C18.21 4.25 20 5 20 8.25Z"
        stroke="#292D32"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 4.25C16 5.49 14.99 6.5 13.75 6.5H10.25C9.63 6.5 9.06997 6.25 8.65997 5.84C8.24997 5.43 8 4.87 8 4.25C8 3.01 9.01 2 10.25 2H13.75C14.37 2 14.93 2.25 15.34 2.66C15.75 3.07 16 3.63 16 4.25Z"
        stroke="#292D32"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 13H12"
        stroke="#292D32"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 17H16"
        stroke="#292D32"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ) : (
    <Svg
      viewBox="0 0 24 24"
      {...props}
      fill="none"
    >
      <Path
        d="M16 4.25C16 5.49 14.99 6.5 13.75 6.5H10.25C9.63 6.5 9.07 6.25 8.66 5.84C8.25 5.43 8 4.87 8 4.25C8 3.01 9.01 2 10.25 2H13.75C14.37 2 14.93 2.25 15.34 2.66C15.75 3.07 16 3.63 16 4.25Z"
        fill="black"
      />
      <Path
        d="M18.83 5.03021C18.6 4.84021 18.34 4.69021 18.06 4.58021C17.77 4.47021 17.48 4.70021 17.42 5.00021C17.08 6.71021 15.57 8.00021 13.75 8.00021H10.25C9.25 8.00021 8.31 7.61021 7.6 6.90021C7.08 6.38021 6.72 5.72021 6.58 5.01021C6.52 4.71021 6.22 4.47021 5.93 4.59021C4.77 5.06021 4 6.12021 4 8.25021V18.0002C4 21.0002 5.79 22.0002 8 22.0002H16C18.21 22.0002 20 21.0002 20 18.0002V8.25021C20 6.62021 19.55 5.62021 18.83 5.03021ZM8 12.2502H12C12.41 12.2502 12.75 12.5902 12.75 13.0002C12.75 13.4102 12.41 13.7502 12 13.7502H8C7.59 13.7502 7.25 13.4102 7.25 13.0002C7.25 12.5902 7.59 12.2502 8 12.2502ZM16 17.7502H8C7.59 17.7502 7.25 17.4102 7.25 17.0002C7.25 16.5902 7.59 16.2502 8 16.2502H16C16.41 16.2502 16.75 16.5902 16.75 17.0002C16.75 17.4102 16.41 17.7502 16 17.7502Z"
        fill="black"
      />
    </Svg>
  );
