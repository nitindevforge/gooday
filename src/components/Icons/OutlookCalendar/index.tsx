import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const OutlookCalendar: React.FC<IconOtherProps> = ({ ...props }) => (
  <Svg viewBox="0 0 56.693 56.693" {...props}>
    <G>
      <Path
        d="m38.958 26.384 14.625-9.86c0-1.167-1.088-2.004-1.703-2.004H35.186v9.724l3.399 2.14a.87.87 0 0 0 .373 0z"
        fill="#1876d2"
        opacity={1}
        data-original="#000000"
      />
      <Path
        d="M39.25 30.003s-.526.321-.962 0l-3.102-2.13h-.002v13.215H50.94c1.4 0 2.646-.815 2.646-2.761V20.454s-14.859 9.87-14.334 9.55zM18.639 34.193c1.04 0 1.865-.469 2.474-1.406.608-.938.915-2.24.915-3.903 0-1.735-.295-3.085-.887-4.05-.592-.963-1.4-1.445-2.427-1.445-1.057 0-1.9.497-2.521 1.488-.622.992-.934 2.305-.934 3.938 0 1.658.312 2.969.934 3.932.621.966 1.438 1.446 2.446 1.446z"
        fill="#1876d2"
        opacity={1}
        data-original="#000000"
      />
      <Path
        d="m4 47.626 28.941 6.067V3.98L4.001 9.582zm9.922-25.032c1.227-1.634 2.851-2.451 4.874-2.451 1.91 0 3.456.78 4.634 2.345 1.18 1.564 1.77 3.625 1.77 6.185.002 2.631-.61 4.752-1.833 6.362-1.224 1.61-2.818 2.416-4.786 2.416-1.918 0-3.479-.78-4.687-2.34-1.206-1.56-1.811-3.592-1.811-6.098 0-2.646.613-4.785 1.84-6.419z"
        fill="#1876d2"
        opacity={1}
        data-original="#000000"
      />
    </G>
  </Svg>
);
export default OutlookCalendar;
