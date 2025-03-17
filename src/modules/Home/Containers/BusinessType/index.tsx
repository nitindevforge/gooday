import React, { useEffect } from "react";
import {
  BottomSearch,
  CategoryCard,
  Header,
  HeaderWithLogo,
  HomeNavigationParamList,
  useBusinessType,
  useGetUser,
} from "@app/modules";
import { Alert, FlatList, Image, SafeAreaView, StatusBar, View } from "react-native";
import { Loading, Typography } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BusinessTypeEntity, UserEntity } from "@gooday_corp/gooday-api-client";
import { useBottomVarVariant } from "@app/common";
import { storageService } from "@app/services";
import { DAILY_ALERT } from "@app/api";
import { getFormattedDate } from "@app/utils";

export const BusinessTypeContainer = () => {
  const tailwind = useTailwind();
  const { changeVariant } = useBottomVarVariant();
  const { data } = useGetUser();
  const user: UserEntity = data?.data?.data!;

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();

  const { data: businessTypes, isLoading } = useBusinessType(true);

  const onPress = (item: BusinessTypeEntity) => {
    if (item?._id === "favorite") {
      navigation?.navigate("FIND_VENUE", { categoryId: item?._id, title: item?.name });
    } else {
      navigation?.navigate("CATEGORIES", { type: item });
    }
  };

  useEffect(() => {
    changeVariant("square");
  }, []);

  useEffect(() => {
    (async () => {
      const checkDailyAlert = await storageService.getItem(DAILY_ALERT);
      const currentDate = getFormattedDate("L");
      if (checkDailyAlert !== currentDate && user?.role === "user") {
        Alert.alert(
          "Want to see your business on Gooday?",
          "Terms and Conditions apply",
          [
            {
              text: "No thanks",
              onPress: async () => {
                await storageService.setItem(
                  DAILY_ALERT,
                  getFormattedDate("L")
                );
              },
            },
            {
              text: "Learn more",
              onPress: async () => {
                await storageService.setItem(
                  DAILY_ALERT,
                  getFormattedDate("L")
                );
                navigation?.navigate("TERMS_AND_CONDITION");
              },
            },
          ]
        );
      }
    })();
  }, []);

  return (
    <>
      <Loading loading={isLoading} />
      <StatusBar backgroundColor="white" barStyle='dark-content' />
      <SafeAreaView style={tailwind("flex-1")}>
        <Header />
        <View style={tailwind("px-6 flex-1")}>
          <HeaderWithLogo
            title="Categories"
            back
          />
          <FlatList
            style={tailwind("my-4")}
            showsVerticalScrollIndicator={false}
            data={businessTypes?.data?.data}
            renderItem={(item) => (
              <CategoryCard
                onPress={() => onPress(item?.item)}
                key={item?.index}
                title={item?.item?.name}
                bgImage={item?.item?.images?.small}
              />
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      </SafeAreaView>
      <BottomSearch />
    </>
  );
};
