import { SlideComponentProps } from "../Carousel";

export type BriefingCardState = {
  id: number;
  title: string;
};

export type BriefingCardProps = {
  slide: BriefingCardState;
  showButton?: boolean
  removeItem?: (id:number) => void
} & SlideComponentProps