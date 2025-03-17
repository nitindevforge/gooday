import React, { FC, Fragment } from "react";
import { View, FlatList } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Button, Typography } from "@app/ui";
import { SectionListCardProps } from "./type";

export const SectionListCard: FC<SectionListCardProps> = ({
  data,
  onPress,
  title,
  isLoading = false,
  onView,
  buttonTitle,
  SectionCard,
}) => {
  const tailwind = useTailwind();

  return (
    <View style={tailwind("flex-1")}>
      {
        !!data?.length &&
        <Fragment>
          <View
            style={tailwind("flex-row justify-between items-center my-2 pl-5")}
          >
            <Typography weight="medium" variant="xl">
              {title}
            </Typography>
            {
              data?.length > 3 &&
              <Button title={buttonTitle} size="small" onPress={onPress} variant="text" />
            }
          </View>
          <FlatList
            data={data?.slice(0, 3)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 18, marginBottom: 12 }}
            ItemSeparatorComponent={() => <View style={tailwind("mx-2")} />}
            renderItem={({ item }) => {
              return <SectionCard item={item} onNavigateCb={onView} />;
            }}
            keyExtractor={(item) => item?._id?.toString()!}
          />
        </Fragment>
      }
    </View>
  );
};
