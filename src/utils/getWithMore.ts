import { UserEntity } from "@gooday_corp/gooday-api-client";

export const getWithMore = (users: UserEntity[], ignore?: string[]) => {
  if (ignore?.length) {
    users = users?.filter((el) => !ignore?.includes(el?._id));
  }
  const data = users
    .filter((item) => item?.firstName || item?.nickName || item?.name)
    .map((item) => item.firstName || item?.nickName || item?.name);
  if (data.length <= 2) {
    return data.join(" & ");
  }
  return data[0] + ` & ${data.length - 1} more`;
};

export const getWithoutMore = (users: any[] = [], test: string) => {
  const data = users
    ?.filter?.((item) => item?.firstName || item?.nickName || item?.name)
    ?.map((item) => item?.firstName || item?.nickName || item?.name) || [];

  if (data.length === 0) return '';
  if (data.length === 2) {
    return `${data.join(', ')} ${test}`;
  }

  if (data.length > 2) {
    const firstPart = data.slice(0, 2).join(', ');
    const restPart = data.slice(2).join(' & ');
    return `${firstPart}, ${restPart} ${test}`;
  }

  return `${data[0]} ${test}`;
};
