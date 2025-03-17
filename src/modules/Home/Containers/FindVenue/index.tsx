import { ProgressBar } from "@app/ui";
import React, { Fragment, useMemo, useState } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import {
  BottomSearch,
  FilterOptions,
  HeaderWithLogo,
  HomeNavigationParamList,
  useGetUser,
  VenueMapView,
  VenueSectionList,
} from "@app/modules";
import { useTailwind } from "tailwind-rn";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import clsx from "clsx";

export const FindVenueContainer = () => {
  const { params } =
    useRoute<RouteProp<HomeNavigationParamList, "FIND_VENUE">>();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();
  const tailwind = useTailwind();
  const { data, isLoading: isUserLoading } = useGetUser();
  const [enableMapView, setEnableMapView] = useState<boolean>(params?.businessType ? true : false);

  const title = useMemo(() => {
    if (params?.title === "Favourites") {
      return params?.title;
    }
    return `Find a ${params?.title?.toLocaleLowerCase()}`;
  }, [params?.title]);

  return (
    <Fragment>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView style={tailwind("flex-1")}>
        <View style={tailwind("flex-1")}>
          <View style={tailwind(clsx("px-6", {
            "mb-4": !params?.businessType
          }))}>
            <ProgressBar progress={20} className="mt-4" />
            <HeaderWithLogo title={title} className="mt-6" />
          </View>
          {
            !params?.businessType &&
            <FilterOptions />
          }
          {enableMapView ? (
            <VenueMapView
              active={
                (!!params?.categoryId || !!params?.businessType) &&
                !isUserLoading &&
                !!data?.data?.data?.location?.length
              }
              type={params?.categoryId}
              businessType={params?.businessType}
            />
          ) : (
            <VenueSectionList
              active={
                (!!params?.categoryId || !!params?.businessType) &&
                !isUserLoading &&
                !!data?.data?.data?.location?.length
              }
              type={params?.categoryId}
              businessType={params?.businessType}
              back={title}
              onView={() => navigation?.navigate("VENUE_LIST", { ...params })}
            />
          )}
        </View>
      </SafeAreaView>
      <BottomSearch
        mapIcon
        enableMapView={enableMapView}
        changeMapView={() => setEnableMapView(!enableMapView)}
      />
    </Fragment>
  );
};
