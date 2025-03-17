import { UserEntity } from "@gooday_corp/gooday-api-client";

export type FriendsProps = {
  isRefetching?: boolean;
  friends: UserEntity[];
  fetchNextPage: () => void;
  setSearch: (search: string) => void;
  search: string;
};
