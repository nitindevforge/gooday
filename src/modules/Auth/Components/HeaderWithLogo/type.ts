export type logoType = "primary" | "normal";
export type HeaderWithLogoProps = {
  title: string;
  subtitle?: string;
  logoType?: logoType;
  className?: string;
  back?: boolean;
  hideLogo?: boolean
};
