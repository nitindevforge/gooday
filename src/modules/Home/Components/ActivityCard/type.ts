import { SlideComponentProps } from "@app/ui";
import { Icons } from "src/ui/Icon/type";

export type ActivityCardProps = {
  slide: ActivityCardSlide;
} & SlideComponentProps

export type ActivityCardSlide = {
  icon: Icons;
  title: string;
  desc: string;
  image: string;
  onPress?: () => void;
};