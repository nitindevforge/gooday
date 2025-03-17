import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconOtherProps } from "../type";
const Notification: React.FC<IconOtherProps> = ({ ...props }) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M9.9615 2.37472C10.1258 1.96855 10.4077 1.6207 10.771 1.37578C11.1343 1.13085 11.5625 1 12.0007 1C12.4388 1 12.867 1.13085 13.2303 1.37578C13.5936 1.6207 13.8755 1.96855 14.0399 2.37472C15.6663 2.82202 17.101 3.79088 18.1235 5.1325C19.146 6.47411 19.6998 8.11429 19.6999 9.80114V14.9673L21.7149 17.9898C21.8254 18.1554 21.8889 18.348 21.8985 18.5469C21.9082 18.7457 21.8637 18.9435 21.7697 19.1191C21.6758 19.2947 21.5359 19.4415 21.3651 19.5438C21.1943 19.6461 20.9989 19.7001 20.7998 19.7001H15.8118C15.6794 20.6164 15.2212 21.4543 14.5213 22.0604C13.8214 22.6664 12.9265 23 12.0007 23C11.0748 23 10.18 22.6664 9.48008 22.0604C8.78016 21.4543 8.32202 20.6164 8.18959 19.7001H3.20161C3.00249 19.7001 2.80709 19.6461 2.63626 19.5438C2.46544 19.4415 2.32559 19.2947 2.23165 19.1191C2.13771 18.9435 2.0932 18.7457 2.10286 18.5469C2.11252 18.348 2.17599 18.1554 2.28651 17.9898L4.3015 14.9673V9.80114C4.3015 6.25511 6.69924 3.26783 9.9615 2.37472ZM10.4455 19.7001C10.559 20.022 10.7697 20.3007 11.0483 20.4979C11.327 20.695 11.6599 20.8009 12.0012 20.8009C12.3426 20.8009 12.6755 20.695 12.9542 20.4979C13.2328 20.3007 13.4434 20.022 13.557 19.7001H10.4444H10.4455ZM12.0007 4.30172C10.5421 4.30172 9.14335 4.88112 8.11201 5.91246C7.08067 6.9438 6.50126 8.3426 6.50126 9.80114V15.3006C6.50131 15.5178 6.43702 15.7302 6.31648 15.911L5.2573 17.5003H18.743L17.6838 15.911C17.5636 15.7301 17.4997 15.5177 17.5001 15.3006V9.80114C17.5001 8.3426 16.9207 6.9438 15.8894 5.91246C14.858 4.88112 13.4592 4.30172 12.0007 4.30172Z"
      stroke={props.fill}
      strokeWidth={0}
    />
  </Svg>
);
export default Notification;
