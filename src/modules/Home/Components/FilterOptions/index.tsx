import {
  Chip,
  CommonBottomSheet,
  EmptyComponent,
  Icon,
  Typography,
} from "@app/ui";
import React, { useMemo } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import {
  filterInitialValues,
  useEmployeesSize,
  usePriceRange,
  useVenueFilter,
  VenueFilterStore,
} from "@app/modules";
import { useTailwind } from "tailwind-rn";
import NiceModal from "@ebay/nice-modal-react";
import clsx from "clsx";

type FilterOptionsType = {
  id: string;
  title: string;
  options?: Array<{
    label: string | number;
    value: string | number;
  }>;
  type: "checkbox" | "dropdown";
};

export const FilterOptions = () => {
  const { data: priceRange } = usePriceRange();
  const { data: employeesSize } = useEmployeesSize();
  const { filter, updateFilter } = useVenueFilter();

  const filterOptionsArr: FilterOptionsType[] = useMemo(() => {
    return [
      {
        id: "available_today",
        title: "Available today",
        type: "checkbox",
      },
      {
        id: "distance",
        title: "Distance",
        options: [
          {
            label: 5,
            value: 5,
          },
          {
            label: 10,
            value: 10,
          },
          {
            label: 15,
            value: 15,
          },
          {
            label: 20,
            value: 20,
          }
        ],
        type: "dropdown",
      },
      {
        id: "price",
        title: "Price",
        options:
          priceRange?.data?.data?.map((el) => ({
            ...el,
            label: el.title,
          })) ?? [],
        type: "dropdown",
      },
    ];
  }, [priceRange, employeesSize]);

  const onFilter = (item: FilterOptionsType) => {
    const value: any = filter[item.id as keyof VenueFilterStore["filter"]];
    const obj = filterInitialValues;
    if (item.type === "checkbox") {
      obj[item?.id] = !value;
      updateFilter(obj);
    } else {
      NiceModal.show(CommonBottomSheet, {
        children: (
          <View style={[tailwind("bg-white w-full p-4 pb-8 rounded-xl"), {
            maxHeight: 350
          }]}>
            <Typography weight="medium">{item?.title}</Typography>
            <FlatList
              style={[tailwind("bg-white pt-1")]}
              ListEmptyComponent={<EmptyComponent style={tailwind("py-2")} />}
              data={item?.options}
              renderItem={({ item: option }) => (
                <TouchableOpacity
                  style={[
                    tailwind(
                      clsx("px-4 py-2.5 rounded-xl", {
                        "bg-gray-700": value === option?.value,
                      })
                    ),
                  ]}
                  onPress={() => {
                    const active = obj[item?.id];
                    if (String(active) === String(option?.value)) {
                      obj[item?.id] = '';
                    } else {
                      obj[item?.id] = option?.value;
                    }
                    updateFilter(obj);
                    NiceModal.hide(CommonBottomSheet);
                  }}
                >
                  <Typography variant="base">{option.label}</Typography>
                </TouchableOpacity>
              )}
              keyExtractor={(_, index) => index.toString()}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        ),
        style: { margin: 0 },
      });
    }
  };

  const tailwind = useTailwind();

  return (
    <View>
      <FlatList
        data={filterOptionsArr}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 18 }}
        ItemSeparatorComponent={() => <View style={tailwind("mx-1")} />}
        renderItem={({ item }) => {
          const value: any =
            filter[item.id as keyof VenueFilterStore["filter"]];
          return (
            <Chip
              key={item?.id}
              label={`${item?.title} ${value && item?.type === "dropdown" ? `: ${value}` : ""
                }`}
              textColor={value ? "primary-300" : "gray-400"}
              onPress={() => onFilter(item)}
              rightIcon={() =>
                item?.type === "dropdown" ? (
                  <View
                    style={{
                      transform: [{ rotate: "-90deg" }],
                      marginLeft: 5,
                    }}
                  >
                    <Icon width={10} height={10} name="back" />
                  </View>
                ) : null
              }
              styles={{
                borderWidth: 1,
                borderColor: value ? "#3A5ACA" : "#8B8B8B",
                ...tailwind("rounded-xl"),
              }}
            />
          );
        }}
        keyExtractor={(item) => item?.id}
      />
    </View>
  );
};
