import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { AvatarGroup, Typography } from "@app/ui";
import { CalendarListResponseDTO } from "@gooday_corp/gooday-api-client";
import { useCalendar } from "@app/common";
import { getAssetUrl } from "@app/utils";

export const CalendarList: React.FC<{
  data: CalendarListResponseDTO["data"];
}> = ({ data }) => {
  const tailwind = useTailwind();
  const { updateCalendar, onModalVisible } = useCalendar();
  const onCalendarNavigate = (item?: any) => {
    updateCalendar(
      item
        ? item
        : {
          collaborators: [],
          type: null,
          name: "",
          owner: null,
          _id: "",
        }
    );
    onModalVisible(false);
  };
  return (
    <View style={tailwind("flex-1 mb-4")}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 20, paddingHorizontal: 10 }}
        ListHeaderComponent={
          <TouchableOpacity
            onPress={() => onCalendarNavigate()}
            activeOpacity={0.7}
            style={[
              tailwind(
                "px-6 py-4 bg-white flex-row items-center border-gray-600 justify-between"
              ),
              {
                borderBottomWidth: data?.length ? 0.5 : 0,
                borderTopWidth: 0.5,
                gap: 12,
              },
            ]}
          >
            <Typography variant="sm" color="black">
              All shared calendars
            </Typography>
            <AvatarGroup
              avatars={[
                ...new Set(
                  data
                    ?.map((item) =>
                      item?.collaborators?.map((el) => getAssetUrl(el?.profile))
                    )
                    .flat()
                ),
              ]}
            />
          </TouchableOpacity>
        }
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => onCalendarNavigate(item)}
              activeOpacity={0.7}
              style={[
                tailwind(
                  "px-6 py-2.5 bg-white flex-row items-center border-gray-600 justify-between"
                ),
                {
                  borderBottomWidth:
                    data[data?.length - 1]?.name !== item?.name ? 0.5 : 0,
                  borderTopWidth: data?.length > 0 ? 0.5 : 0,
                  gap: 12,
                },
              ]}
            >
              <View style={tailwind('flex-row items-center')}>
                <Typography variant="sm" color="black">
                  {item?.name}
                </Typography>
                {item?.type === 'PERSONAL' && (
                  <View style={[tailwind("rounded-md px-3 py-1 ml-2 border-primary-300"), {
                    borderWidth: 1.5
                  }]}>
                    <Typography className="text-xs" weight="medium" color="primary-300">
                      Primary
                    </Typography>
                  </View>
                )}
              </View>
              <AvatarGroup
                avatars={item?.collaborators.map((el) =>
                  getAssetUrl(el?.profile)
                )}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(_, index) => index?.toString()}
      />
    </View>
  );
};
