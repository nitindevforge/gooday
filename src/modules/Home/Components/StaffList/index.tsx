import React, { FC } from "react";
import { FlatList } from "react-native";
import { useTailwind } from "tailwind-rn";
import { StaffListProps } from "./type";
import { StaffCard } from "../StaffCard";
import { EmptyComponent } from "@app/ui";

export const StaffList: FC<StaffListProps> = ({ staff,today }) => {
  const tailwind = useTailwind();
  return (
    <FlatList
      style={tailwind("flex-1")}
      data={staff}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <StaffCard key={item?._id} item={item} todayDate={today} />}
      ListEmptyComponent={<EmptyComponent />}
    />
  );
};
