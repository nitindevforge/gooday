import { AssistantEntity, UserEntity } from "@gooday_corp/gooday-api-client";

export type ProfileDetailsProps = {
  user?: UserEntity;
  assistant?:AssistantEntity
  editable?: boolean;
  massage?: string
};
