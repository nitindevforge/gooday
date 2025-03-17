import { Icon, Typography } from "@app/ui";
import React, { FC } from "react";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { ListComponentsProps } from "./type";
import { shadowStyles } from "@app/modules";

export const ListComponents: FC<ListComponentsProps> = ({
  data = [],
  onHeaderPress,
  onAdd,
  renderItem: RenderItem,
  title,
  hideArrow,
  width,
  height,
  empty = 'Make plans with your friend!'
}) => {
  const tailwind = useTailwind();
  return (
    <View style={[{ rowGap: 12 }]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onHeaderPress}
        style={[
          tailwind("w-full flex-row items-center px-6"),
          { columnGap: 5 },
        ]}
      >
        <Typography weight="semibold" variant="17">
          {title}
        </Typography>
        {!hideArrow && (
          <Icon
            name="back"
            width={14}
            height={14}
            stroke="none"
            style={{ transform: [{ rotate: "180deg" }] }}
          />
        )}
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 18 }}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {
          !!onAdd &&
          <TouchableOpacity
            onPress={onAdd}
            activeOpacity={0.8}
            style={[
              tailwind("bg-yellow-50 rounded-lg items-center justify-end"),
              {
                width: width ?? 225,
                height: height ?? 181,
                rowGap: 10,
                marginRight: 10,
                marginBottom: 10,
              },
              shadowStyles.boxShadow1
            ]}
          >
            <Icon name="add-round" stroke="none" fill="#876718" width={38} height={39} />
            <Typography className='text-center mb-2 p-1' weight="medium">
              {empty}
            </Typography>
          </TouchableOpacity>
        }

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          contentContainerStyle={{ paddingBottom: 10 }}
          ItemSeparatorComponent={() => <View style={tailwind("mx-1")} />}
          renderItem={({ item }) => {
            return (
              <RenderItem item={item} />
            )
          }
          }
          keyExtractor={(_, index) => index?.toString()}
        />
      </ScrollView>
    </View>
  );
};
