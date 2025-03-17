import { useLoading } from "@app/common";
import React, { FC, useEffect } from "react";

export const Loading: FC<{ loading: boolean }> = ({ loading }) => {
  const { changeLoading } = useLoading();

  useEffect(() => {
    changeLoading(loading);
  }, [loading, changeLoading]);

  return <></>;
};
