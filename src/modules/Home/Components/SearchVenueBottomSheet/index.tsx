import React, { useMemo, useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Modal, ScrollView, TouchableOpacity, View } from "react-native";
import { Button, Icon, Input, Typography } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import {
  HomeNavigationParamList,
  useGetBusinessVenue,
  VenueCard,
} from "@app/modules";
import { useDebounce } from "@app/utils";
import {
  BusinessVenueDetailsEntity,
  BusinessVenueResponseDTO,
  GetBusinessVenueDto,
} from "@gooday_corp/gooday-api-client";
import { AxiosResponse } from "axios";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUserBooking } from "@app/common";

export const SearchVenueBottomSheet = NiceModal.create<GetBusinessVenueDto>(
  (query) => {
    const { visible, hide } = useModal();
    const tailwind = useTailwind();
    const { updateBooking } = useUserBooking();
    const navigation =
      useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();
    const [searchText, setSearchText] = useState<string>("");
    const debounceValue = useDebounce(searchText, 300);
    const { data, isLoading } = useGetBusinessVenue(
      {
        ...query,
        search: debounceValue,
      },
      !!debounceValue
    );

    const venues = useMemo(() => {
      const venues = data?.pages?.reduce(
        (
          acc: BusinessVenueResponseDTO["data"],
          page: AxiosResponse<BusinessVenueResponseDTO>
        ) => {
          return [...(acc ?? []), ...(page?.data?.data ?? [])];
        },
        []
      );
      return venues ?? [];
    }, [data]);

    const onVenuePress = (venue: BusinessVenueDetailsEntity) => {
      updateBooking({
        venueObj: venue,
        venue: venue?._id,
        business: venue.business?._id,
      });
      hide();
      navigation?.navigate("VENUE_DETAILS", { id: venue?._id! });
      setSearchText("");
    };

    return (
      <Modal
        animationType="slide"
        visible={visible}
        presentationStyle="pageSheet"
      >
        <View style={tailwind("px-6 py-3 flex-1")}>
          <View style={tailwind("flex-row items-center justify-between")}>
            <Typography weight="bold" variant="lg">
              Search Venue
            </Typography>
            <TouchableOpacity onPress={() => hide()}>
              <Icon name="close" />
            </TouchableOpacity>
          </View>
          <View style={tailwind("mt-5 mb-3")}>
            <Input
              autoFocus
              onChangeText={(text) => setSearchText(text)}
              height={36}
              placeholder="Search"
              className="bg-dark-gray border-0 pr-5"
              left={
                <Icon
                  name="search"
                  fill="#3C3C4399"
                  width={18}
                  height={16}
                  stroke="none"
                />
              }
            />
          </View>
          {isLoading && (
            <View style={tailwind("items-center justify-center h-20")}>
              <Typography>Searching...</Typography>
            </View>
          )}
          {venues?.length ? (
            <ScrollView
              style={tailwind("flex-1")}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps
            >
              <View style={tailwind("mt-2 flex-1")}>
                {venues?.map((venue, i) => {
                  return (
                    <VenueCard
                      onPress={() => onVenuePress(venue)}
                      venue={venue}
                      key={i}
                    />
                  );
                })}
              </View>
            </ScrollView>
          ) : (
            <>
              {searchText && !isLoading && (
                <View style={tailwind("items-center flex-1")}>
                  <View>
                    <Typography styles={tailwind("text-center mt-10")}>
                      The venue or business you’re looking for isn’t currently
                      available on Gooday. Would you like to join the waitlist
                      to be notified when it becomes available?
                    </Typography>
                    <Button
                      title="Join waitlist"
                      onPress={() => {
                        hide();
                        navigation?.navigate("WAITLIST", { name: searchText });
                      }}
                      className="mt-5"
                    />
                  </View>
                </View>
              )}
            </>
          )}
        </View>
      </Modal>
    );
  }
);
