import React, { useEffect } from "react";
import {
  BottomSearch,
  CategoryCard,
  Header,
  HomeNavigationParamList,
  useBusinessCategoriesMutation,
} from "@app/modules";
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import { EmptyComponent, Icon, Loading, Typography } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getAssetUrl } from "@app/utils";

export const CategoriesContainer = () => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();

  const { params } =
    useRoute<RouteProp<HomeNavigationParamList, "CATEGORIES">>();

  const { mutate, isLoading, data } = useBusinessCategoriesMutation();
  const categories = data?.data?.data ?? [];

  const onPress = (id: string, name: string) => {
    navigation?.navigate("FIND_VENUE", { categoryId: id, title: name });
  };

  useEffect(() => {
    if (params?.type?._id) {
      mutate(params?.type?._id);
    }
  }, [params?.type?._id]);

  return (
    <>
      <Loading loading={isLoading} />
      <StatusBar backgroundColor={params.type.backgroundColor} barStyle='dark-content' />

      <ImageBackground
        source={{
          uri: getAssetUrl(params?.type?.images?.large),
        }}
        imageStyle={tailwind("rounded-b-3xl")}
      >
        <SafeAreaView style={tailwind('bg-black/40 rounded-b-3xl')}>
          <Header darkHeader />
          <View style={tailwind("flex-row items-center mb-3 mt-8 px-6")}>
            <TouchableOpacity
              style={tailwind("flex items-start w-7 h-11 justify-center")}
              onPress={() => navigation?.goBack()}
            >
              <Icon
                fill="white"
                name="back"
                stroke="none"
                width={10}
                height={20}
              />
            </TouchableOpacity>
            <Typography weight="medium" variant="3xl" color="white">
              {params?.type?.name}
            </Typography>
          </View>
        </SafeAreaView>
      </ImageBackground>
      <View style={tailwind("px-6 flex-1")}>
        <FlatList
          style={tailwind("my-4")}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => !isLoading && (
            <EmptyComponent />
          )}
          data={categories}
          renderItem={(item) => (
            <CategoryCard
              onPress={() => onPress(item?.item?._id, item?.item?.name)}
              key={item?.item?._id}
              title={item?.item?.name}
              bgImage={item?.item?.image}
            />
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
      <BottomSearch
        mapIcon
        changeMapView={() => {
          navigation?.navigate("FIND_VENUE", { businessType: params?.type?._id, title: params?.type?.name, categoryId: '' });
        }}
      />
    </>
  );
};
