import { ImageBackgroundProps } from "react-native";
import { logoType } from "../../Components/HeaderWithLogo/type";
import { Style } from "tailwind-rn";

export type AuthDefaultLayoutProps = {
  className?: string;
  progress?: number;
  backgroundImage?: ImageBackgroundProps;
  header?: string;
  logoType?: logoType;
  subtitle?: string;
  back?: boolean;
  hideLogo?: boolean;
  hideProgress?: boolean;
  childrenStyles?: Style
  headerStyles?: string
  onChange?: () => void;
};
