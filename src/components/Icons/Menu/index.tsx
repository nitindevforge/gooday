import React from "react";
import { ClipPath, Defs, G, Path, Svg, SvgProps } from "react-native-svg";

export const MenuIcon = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 17 9" fill="none" {...props}>
      <G clipPath="url(#clip0_2928_46576)">
        <Path d="M15.582 4.465H1.514c-.353 0-.639.15-.639.336 0 .185.286.336.64.336h14.067c.353 0 .64-.15.64-.336 0-.186-.287-.336-.64-.336zM15.582 2.111H1.514c-.353 0-.639.15-.639.336 0 .186.286.336.64.336h14.067c.353 0 .64-.15.64-.336 0-.185-.287-.336-.64-.336zM15.582 6.816H1.514c-.353 0-.639.15-.639.336 0 .186.286.337.64.337h14.067c.353 0 .64-.15.64-.337 0-.185-.287-.336-.64-.336z" />
      </G>
      <Defs>
        <ClipPath id="clip0_2928_46576">
          <Path
            fill="#fff"
            transform="translate(.875 .768)"
            d="M0 0H15.3468V8.06519H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
