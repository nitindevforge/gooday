import * as React from "react";
import Svg, { Mask, Path, Rect } from "react-native-svg";
import { IconOtherProps } from "../type";
const QRCode: React.FC<IconOtherProps> = ({ ...props }) => (
  <Svg
    viewBox="0 0 13 13"
    fill="none"
    {...props}
  >
    <Mask id="a" fill="#fff">
      <Rect y={7.07996} width={5.91965} height={5.91965} rx={1.14286} />
    </Mask>
    <Rect
      y={7.07996}
      width={5.91965}
      height={5.91965}
      rx={1.14286}
      stroke="#000"
      strokeWidth={3.42858}
      mask="url(#a)"
    />
    <Mask id="b" fill="#fff">
      <Rect width={5.91965} height={5.91965} rx={1.14286} />
    </Mask>
    <Rect
      width={5.91965}
      height={5.91965}
      rx={1.14286}
      stroke="#000"
      strokeWidth={3.42858}
      mask="url(#b)"
    />
    <Mask id="c" fill="#fff">
      <Rect x={7.08008} width={5.91965} height={5.91965} rx={1.14286} />
    </Mask>
    <Rect
      x={7.08008}
      width={5.91965}
      height={5.91965}
      rx={1.14286}
      stroke="#000"
      strokeWidth={3.42858}
      mask="url(#c)"
    />
    <Path fill="#000" d="M7.08008 7.07996H9.0533V9.05318H7.08008z" />
    <Path fill="#000" d="M9.05273 9.05359H11.02595V11.02681H9.05273z" />
    <Path fill="#000" d="M11.0273 11.0272H13.00052V13.00042H11.0273z" />
    <Path fill="#000" d="M7.08008 11.0272H9.0533V13.00042H7.08008z" />
    <Path fill="#000" d="M11.0273 7.07996H13.00052V9.05318H11.0273z" />
  </Svg>
);
export default QRCode;
