import { SlideComponentProps } from "@app/ui";
import { AssistantEntity } from "@gooday_corp/gooday-api-client";

export type AvatarCardProps = {
  slide: AssistantEntity;
} & SlideComponentProps;
