import React, { useEffect, useMemo, useState } from "react";
import { Image, SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import {
  Header,
  HomeNavigationParamList,
  ListComponents,
  PrepaidServiceCard,
  StaffRoasterList,
  useBusinessType,
  useGetPrepaidService,
  useGetUser,
  useGetWhatsOn,
  useUserLocationMutation,
  useUserPermissionSyncMutation,
  WhatsOnCard,
} from "@app/modules";
import { Loading } from "@app/ui";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  PrepaidServiceResponseDTO,
  UserEntity,
  WhatsOnResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AxiosResponse } from "axios";
import { BottomTabsNavigatorList } from "src/navigation/BottomTabsNavigator/type";
import moment from "moment";
import { getFormattedDate, getKeyWithUserID } from "@app/utils";
import { DAILY_BRIEFING } from "@app/api";
import { storageService } from "@app/services";
import GetLocation from "react-native-get-location";
import Purchases from "react-native-purchases";
import { checkNotifications } from "react-native-permissions";

const VENUS = [
  {
    business: {
      name: 'Cousin Christmas Party',
    },
    startDate: new Date().setHours(9),
    endDate: new Date().setHours(10),
    collaborators: [
      {},
      {}
    ],
    image: require('@app/assets/Images/picture.png'),
    favoriteCount: 2,
    venue: {
      location: {
        meta: {
          shortFormattedAddress: 'Kogarah, NSW 2217'
        }
      }
    }
  },
  {
    business: {
      name: 'Catherine’s Birthday',
    },
    startDate: new Date(new Date().getDate() - 1).setHours(12),
    endDate: new Date(new Date().getDate() - 1).setHours(1),
    collaborators: [{}],
    image: require('@app/assets/Images/picture1.png'),
    favoriteCount: 3,
    venue: {
      location: {
        meta: {
          shortFormattedAddress: 'Sydney'
        }
      }
    }
  },
  {
    business: {
      name: ' Live Music',
    },
    startDate: new Date(new Date().getDate() + 2).setHours(2),
    endDate: new Date(new Date().getDate() + 2).setHours(3),
    collaborators: [{}],
    image: require('@app/assets/Images/picture2.png'),
    favoriteCount: 1,
    venue: {
      location: {
        meta: {
          shortFormattedAddress: 'Sydney'
        }
      }
    }
  },
]

const SOCIAL_CALENDARS = [
  {
    name: 'Catherine’s Birthday',
    startDate: new Date().setHours(10),
    endDate: new Date().setHours(11),
    staffs: [
      {},
      {}
    ],
    image: require('@app/assets/Images/picture1.png'),
  },
  {
    name: 'Cousin Christmas Party',
    startDate: new Date(new Date().getDate() - 1).setHours(10),
    endDate: new Date(new Date().getDate() - 1).setHours(11),
    staffs: [{}],
    image: require('@app/assets/Images/picture.png'),
  },
]

export const BusinessHomeContainer = () => {
  const isFocused = useIsFocused();
  const tailwind = useTailwind();
  const { data: businessTypes } = useBusinessType(true);
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeNavigationParamList & BottomTabsNavigatorList>>();
  const [isBriefing, setBriefing] = useState<boolean>(false);
  const { mutate } = useUserLocationMutation();
  const { data, isLoading: isUserLoading } = useGetUser();
  const user: UserEntity = data?.data?.data!;
  const { data: prepaid, isLoading: isPrepaidServiceLoading } = useGetPrepaidService();
  const { data: whatsOn, isLoading: isWhatsOnLoading } = useGetWhatsOn();
  const { mutate: onPermission } = useUserPermissionSyncMutation();

  const prepaidService = useMemo(() => {
    const services = prepaid?.pages?.reduce(
      (
        acc: PrepaidServiceResponseDTO["data"],
        page: AxiosResponse<PrepaidServiceResponseDTO>
      ) => {
        return [...(acc ?? []), ...(page?.data?.data ?? [])];
      },
      []
    );
    return services ?? [];
  }, [prepaid]);

  const whatsOnList = useMemo(() => {
    const whatsOnRecord = whatsOn?.pages?.reduce(
      (
        acc: WhatsOnResponseDTO["data"],
        page: AxiosResponse<WhatsOnResponseDTO>
      ) => {
        return [...(acc ?? []), ...(page?.data?.data ?? [])];
      },
      []
    );
    return whatsOnRecord ?? [];
  }, [whatsOn]);

  useEffect(() => {
    (async () => {
      const key = await getKeyWithUserID(DAILY_BRIEFING);
      const checkDailyBriefing = await storageService.getItem(key);
      const currentDate = getFormattedDate("L");
      if (checkDailyBriefing !== currentDate) {
        setBriefing(true)
      }
    })();
  }, [])

  useEffect(() => {
    (async () => {
      let notification = await checkNotifications();
      try {
        const location = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        });
        onPermission({
          locationAccessPermission: true,
          booking: notification.status === 'granted',
          calendar: notification.status === 'granted',
          invites: notification.status === 'granted',
          reminders: notification.status === 'granted',
          waitlist: notification.status === 'granted',
          tasks: notification.status === 'granted',
        })
        mutate({
          location: [location?.longitude, location?.latitude],
          timezone: moment.tz.guess(),
        });
      } catch (error) {
        onPermission({
          locationAccessPermission: true,
          booking: notification.status === 'granted',
          calendar: notification.status === 'granted',
          invites: notification.status === 'granted',
          reminders: notification.status === 'granted',
          waitlist: notification.status === 'granted',
          tasks: notification.status === 'granted',
        })
      }
    })();
  }, []);

  useEffect(() => {
    if (user?._id) {
      (async () => {
        await Purchases.logIn(user?._id);
        await Purchases.setEmail(user?.email);
      })();
    }
  }, [user]);

  const onNavigate = async () => {
    navigation.navigate("BUSINESS_TYPE");
  };

  return (
    <>
      <Loading loading={isUserLoading} />
      {isFocused && (
        <StatusBar backgroundColor="white" barStyle="dark-content" />
      )}
      <SafeAreaView style={tailwind("flex-1")}>
        <View style={tailwind("flex-1")}>
          <Header />
          <View style={tailwind("px-2 mb-5")}>
            <Image
              resizeMode="contain"
              source={require("../../../../assets/Images/gooday.png")}
              style={{ width: 164, height: 44 }}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[{ rowGap: 22 }, tailwind('pb-2')]}>
              <View style={tailwind("")}>
                <StaffRoasterList />
              </View>
              <ListComponents
                title="Your Pre-Paid Services"
                data={prepaidService?.length ? prepaidService?.slice(0, 10) : SOCIAL_CALENDARS}
                width={175}
                height={135}
                onHeaderPress={() => {
                  if (prepaidService?.length) {
                    navigation.navigate('PREPAID_SERVICE_LIST')
                  }
                }}
                renderItem={({ item }) => (
                  <PrepaidServiceCard
                    item={item}
                    width={175}
                    style={{
                      width: 175, height: 135, maxHeight: "auto",
                      opacity: !prepaidService?.length ? 0.5 : 1,
                    }}
                  />
                )}
              />
              <ListComponents
                title="What’s On"
                data={whatsOnList?.length ? whatsOnList : VENUS}
                onHeaderPress={() => {
                  if (whatsOnList?.length) {
                    navigation.navigate('WHATS_ON_BUSINESS')
                  }
                }}
                renderItem={({ item }) => (
                  <WhatsOnCard
                    item={item}
                    width={172}
                    style={{
                      width: 172, height: 135, maxHeight: "auto",
                      opacity: !whatsOnList?.length ? 0.5 : 1,
                    }}
                  />
                )}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};
