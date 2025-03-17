import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const GoogleCalendar: React.FC<IconOtherProps> = ({ ...props }) => (
  <Svg viewBox="0 0 32 32" {...props}>
    <Path d="m22 4.5v6h-12v11h-6v-15a2.0059 2.0059 0 0 1 2-2z" fill="#4285f4" />
    <Path d="m22 27.5v-6h6z" fill="#ea4435" />
    <Path d="m22 9.5h6v12h-6z" fill="#ffba00" />
    <Path
      d="m13 18.5h6v12h-6z"
      fill="#00ac47"
      transform="matrix(0 1 -1 0 40.5 8.5)"
    />
    <Path d="m28 6.5v4h-6v-6h4a2.0059 2.0059 0 0 1 2 2z" fill="#0066da" />
    <Path d="m10 21.5v6h-4a2.0059 2.0059 0 0 1 -2-2v-4z" fill="#188038" />
    <G fill="#4285f4">
      <Path d="m15.69 17.09c0 .89-.66 1.79-2.15 1.79a3.0026 3.0026 0 0 1 -1.52-.39l-.08-.06.29-.82.13.08a2.3554 2.3554 0 0 0 1.17.34 1.191 1.191 0 0 0 .88-.31.8586.8586 0 0 0 .25-.65c-.01-.73-.68-.99-1.31-.99h-.54v-.81h.54c.45 0 1.12-.22 1.12-.82 0-.45-.31-.71-.85-.71a1.8865 1.8865 0 0 0 -1.04.34l-.14.1-.28-.79.07-.06a2.834 2.834 0 0 1 1.53-.45c1.19 0 1.72.73 1.72 1.45a1.4369 1.4369 0 0 1 -.81 1.3 1.52 1.52 0 0 1 1.02 1.46z" />
      <Path d="m18.71 12.98v5.81h-.98v-4.79l-.94.51-.21-.82 1.37-.71z" />
    </G>
  </Svg>
);

export default GoogleCalendar;