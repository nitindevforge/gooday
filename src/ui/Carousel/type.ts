import { ScrollViewProps, ViewStyle } from "react-native";
import { Style } from "tailwind-rn";

export interface CarouselProps extends ScrollViewProps {
  slides: any[];
  slideComponent: React.FC<SlideComponentProps>;
  ComponentStyle?: Style
  pagination?: boolean
  slideActiveIndex?: (slideActiveIndex: number) => void
  parRow?: number
  style?: ViewStyle
  assistant?: string;
  paginationAbsolute?: boolean;
};

export type SlideComponentProps = {
  index: number;
  active: number;
  slide: any;
  numberOfSlide: number
};
