import React, { Fragment, useMemo, useState } from "react";
import { Venues } from "../Venues";
import { SafeAreaView, StatusBar, View } from "react-native";
import { ProgressBar } from "@app/ui";
import { BottomSearch, FilterOptions } from "../../Components";
import { HomeNavigationParamList } from "../../Navigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";
import { HeaderWithLogo, useGetUser, VenueMapView } from "@app/modules";

export const VenueListContainer = () => {
  const { params } =
    useRoute<RouteProp<HomeNavigationParamList, "FIND_VENUE">>();
  const tailwind = useTailwind();
  const { data, isLoading: isUserLoading } = useGetUser();
  const [enableMapView, setEnableMapView] = useState<boolean>(false);

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
          <View style={tailwind("px-6 mb-4")}>
            <ProgressBar progress={20} className="mt-4" />
            <HeaderWithLogo title={title} className="mt-6" />
          </View>
          <FilterOptions />
          {enableMapView ? (
            <VenueMapView
              active={
                !!params?.categoryId &&
                !isUserLoading &&
                !!data?.data?.data?.location?.length
              }
              type={params?.categoryId}
            />
          ) : (
            <Venues
              active={
                !!params?.categoryId &&
                !isUserLoading &&
                !!data?.data?.data?.location?.length
              }
              type={params?.categoryId}
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
