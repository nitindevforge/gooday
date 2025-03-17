import { Icon, Input } from "@app/ui";
import NiceModal from "@ebay/nice-modal-react";
import React, { FC, useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { SearchVenueBottomSheet } from "../SearchVenueBottomSheet";
import { RouteProp, useRoute } from "@react-navigation/native";
import { HomeNavigationParamList } from "../../Navigation";

type BottomSearchProps = {
  mapIcon?: boolean;
  changeMapView?: () => void;
  enableMapView?: boolean
};

export const BottomSearch: FC<BottomSearchProps> = ({
  mapIcon = false,
  changeMapView = () => { },
  enableMapView
}) => {
  const tailwind = useTailwind();
  const [mapIconOutline, setMapIconOutline] = useState<boolean>(false);
  const { params } =
    useRoute<RouteProp<HomeNavigationParamList, "CATEGORIES" | "FIND_VENUE">>();
  return (
    <View style={tailwind("px-6 pb-3 pt-5 bg-gray-700 rounded-t-2.5xl")}>
      <Input
        onPressIn={() =>
          NiceModal.show(SearchVenueBottomSheet, {
            type: params?.type?._id!,
            category: params?.categoryId!,
          })
        }
        editable={Platform.OS === 'android'}
        height={36}
        placeholder="Search"
        className="bg-dark-gray border-2 pr-5"
        left={
          <Icon
            name="search"
            fill="#3C3C4399"
            width={18}
            height={16}
            stroke="none"
          />
        }
        right={
          mapIcon && (
            <TouchableOpacity
              activeOpacity={1}
              onPress={changeMapView}
            >
              <Icon
                name="map"
                fill="#292D32"
                width={18}
                height={16}
                stroke="none"
                outline={!enableMapView}
              />
            </TouchableOpacity>
          )
        }
      />
    </View>
  );
};
