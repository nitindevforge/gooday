"use client";
import { ApiClient } from "@app/api";
import {
  TagsControllerFindTagsCategoryEnum,
  TagsResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { AxiosError, AxiosResponse } from "axios";
import { useInfiniteQuery } from "react-query";
import { TAGS } from "../../Constants";

export const useTags = (
  venue?: string,
  category?: TagsControllerFindTagsCategoryEnum
) => {
  const getTags = (pageParam: number) => {
    return ApiClient.Tag.tagsControllerFindTags(
      pageParam + 1,
      0,
      [venue!],
      [category!]
    );
  };

  return useInfiniteQuery<AxiosResponse<TagsResponseDTO>, AxiosError>(
    [...TAGS, venue],
    ({ pageParam = 0 }) => getTags(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.data?.data?.length) {
          return pages?.length;
        }
        return undefined;
      },
      enabled: !!venue,
    }
  );
};

export const useGoodayTags = () => {
  const getTags = (pageParam: number) => {
    return ApiClient.Tag.tagsControllerFindTags(
      pageParam + 1,
      0,
    );
  };

  return useInfiniteQuery<AxiosResponse<TagsResponseDTO>, AxiosError>(
    [...TAGS],
    ({ pageParam = 0 }) => getTags(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.data?.data?.length) {
          return pages?.length;
        }
        return undefined;
      },
    }
  );
};
