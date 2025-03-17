import React, { FC, useEffect, useMemo, useState } from "react";
import { View, FlatList } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Chip, Loading, Typography } from "@app/ui";
import { ServiceCard, useGetPrepaidService, usePrepaidServiceCategories, VenueEmpty } from "@app/modules";
import { useUserBooking } from "@app/common";
import { PrepaidServiceEntity, PrepaidServiceResponseDTO } from "@gooday_corp/gooday-api-client";
import { AxiosResponse } from "axios";
import clsx from "clsx";
import { ServiceListProps } from "./type";
const filterOptions = [
  {
    id: "FEATURED",
    title: "Featured",
  },
  {
    id: "BEGINNER",
    title: "Beginners",
  },
  {
    id: "INTERMEDIATE",
    title: "Intermediate",
  },
  {
    id: "ADVANCED",
    title: "Advanced",
  },
];

export const ServiceList: FC<ServiceListProps> = ({ purchase, setPurchase }) => {
  const tailwind = useTailwind();
  const { data: categories, isLoading } = usePrepaidServiceCategories();
  const [category, setCategory] = useState<string>('featured')
  const { updateBooking, booking } = useUserBooking();
  const { data, isLoading: isPrepaidServiceLoading } = useGetPrepaidService({
    venue: booking?.venueObj?._id!,
    category: category === 'featured' ? "" : category
  });
  const prepaidService = useMemo(() => {
    const services = data?.pages?.reduce(
      (
        acc: PrepaidServiceResponseDTO["data"],
        page: AxiosResponse<PrepaidServiceResponseDTO>
      ) => {
        return [...(acc ?? []), ...(page?.data?.data ?? [])];
      },
      []
    );
    return services ?? [];
  }, [data]);

  const prepaidServiceCategories = useMemo(() => {
    const categoriesRecords = categories?.data?.data?.map((ele) => {
      return {
        id: ele,
        title: ele,
      }
    })
    const services = [
      {
        id: "featured",
        title: "Featured",
      },
      ...(categoriesRecords ?? [])
    ]
    return services;
  }, [categories]);

  useEffect(() => {
    updateBooking({
      serviceId: null,
      selectedStaff: null
    });
  }, [])

  return (
    <View style={tailwind('flex-1')}>
      <Loading loading={isLoading || isPrepaidServiceLoading} />
      <View style={tailwind("mt-2")}>
        <Typography className="mb-3">Service Add Ons</Typography>
        <FlatList
          data={prepaidServiceCategories}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={tailwind("mx-1")} />}
          renderItem={({ item }) => {
            return (
              <Chip
                key={item?.id}
                label={item?.title}
                textColor={category === item?.id ? "white" : "black"}
                onPress={() => {
                  setCategory(item?.id);
                  setPurchase({});
                  updateBooking({
                    serviceId: null,
                  });
                }}
                styles={{
                  height: 33,
                  ...tailwind(clsx("rounded-xl", {
                    "bg-primary-300 border-primary-300 border": category === item?.id
                  })),
                }}
              />
            );
          }}
          keyExtractor={(item) => item?.id}
        />
      </View>
      <FlatList
        data={[...prepaidService]}
        style={tailwind('pt-10')}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={tailwind("my-4")} />}
        renderItem={({ item }) => {
          return (
            <ServiceCard
              title={item?.name}
              subTitle={item?.category}
              price={item?.price}
              onUpdateQuantity={(quantity) => {
                updateBooking({
                  serviceId: null,
                  selectedStaff: null
                });
                setPurchase({
                  _id: item._id,
                  quantity: quantity || 0,
                  service: item as PrepaidServiceEntity
                });
              }}
              quantity={purchase?._id === item._id ? (purchase?.quantity ?? 0) : 0}
            />
          );
        }}
        keyExtractor={(item) => item?._id}
        ListEmptyComponent={
          <VenueEmpty massage="No services are currently available. Please check back soon for updates!" />
        }
      />
    </View>
  );
};
