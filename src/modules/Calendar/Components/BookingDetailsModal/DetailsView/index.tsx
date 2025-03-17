import { AvatarGroup, Button, Icon, Typography } from "@app/ui";
import {
  eventBgColor,
  eventBorderColor,
  eventTextColor,
  getAssetUrl,
  getFormattedDate,
} from "@app/utils";
import clsx from "clsx";
import React, { FC } from "react";
import { Linking, ScrollView, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { DetailsProps } from "./type";
import config from "@app/config";

export const Details: FC<DetailsProps> = ({ data, changeView, closeModal }) => {
  const tailwind = useTailwind();

  const isBooking = data?.type === "booking";
  const isGoogle = data?.type === "google";
  const isMicrosoft = data?.type === "microsoft";
  const eventType = data.eventType;

  const getButtonTitle = () => {
    if (isGoogle) {
      return "Update in Google";
    }
    if (isMicrosoft) {
      return "Update in Outlook";
    }
    return "Edit";
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={tailwind("px-6 flex-1 pt-8")}>
        <View style={tailwind("flex-1")}>
          <View style={tailwind("flex-row items-center pb-2 justify-between")}>
            <View style={tailwind("flex-row items-center")}>
              <TouchableOpacity
                style={tailwind("flex items-start w-7 h-11 justify-center")}
                onPress={closeModal}
              >
                <Icon
                  fill="#2E2E2E"
                  name="back"
                  stroke="none"
                  width={10}
                  height={20}
                />
              </TouchableOpacity>
              <Typography weight="medium" variant="2xl">
                {`${isBooking ? "Booking" : "Event"} Details`}
              </Typography>
            </View>
            {isMicrosoft && (
              <Icon
                fill="#2E2E2E"
                name="outlook-calendar"
                stroke="none"
                width={24}
                height={24}
              />
            )}
            {isGoogle && (
              <Icon
                fill="#2E2E2E"
                name="google"
                stroke="none"
                width={24}
                height={24}
              />
            )}
          </View>
          <View
            style={[
              tailwind(
                clsx(
                  "rounded-lg p-4 w-full flex-1 py-8",
                  `${eventBgColor?.[eventType]}`
                )
              ),
              { gap: 12 },
            ]}
          >
            <View>
              <Typography weight="medium" variant="base">
                Title
              </Typography>
              <Typography color={eventTextColor?.[data?.eventType]}>
                {data?.title || data?.business?.name}
              </Typography>
            </View>
            <View>
              <Typography weight="medium" variant="base">
                Invite
              </Typography>
              <View style={[tailwind("flex-row items-center"), { gap: 12 }]}>
                <View style={[tailwind("flex-row"), { gap: 5 }]}>
                  <Icon
                    fill={eventBorderColor?.[data?.eventType]}
                    name="profile-policy"
                    stroke="none"
                    outline={false}
                    width={16}
                    height={22}
                  />
                  <Typography
                    weight="regular"
                    variant="base"
                    color={eventTextColor?.[data?.eventType]}
                  >
                    {data?.collaborators?.length}
                  </Typography>
                </View>

                <AvatarGroup
                  avatars={data?.collaborators?.map((ele) =>
                    getAssetUrl(ele?.profile)
                  )}
                />
              </View>
            </View>
            <View>
              <Typography weight="medium" variant="base">
                Start Date
              </Typography>
              <Typography color={eventTextColor?.[data?.eventType]}>
                {getFormattedDate(`hh A ddd, MMMM DD, YYYY`, data.startDate)}
              </Typography>
            </View>
            <View>
              <Typography weight="medium" variant="base">
                End Date
              </Typography>
              <Typography color={eventTextColor?.[data?.eventType]}>
                {getFormattedDate(`hh A ddd, MMMM DD, YYYY`, data.endDate)}
              </Typography>
            </View>
            {!!(
              data?.venue?.location?.meta?.shortFormattedAddress ||
              data?.location?.meta?.shortFormattedAddress
            ) && (
                <View>
                  <Typography weight="medium" variant="base">
                    Location
                  </Typography>
                  <View style={[tailwind("flex-row"), { columnGap: 5 }]}>
                    <Icon
                      fill={eventBorderColor?.[data?.eventType]}
                      name="location"
                      width={16}
                      height={26}
                    />
                    <Typography color={eventTextColor?.[data?.eventType]}>
                      {data?.venue?.location?.meta?.shortFormattedAddress ||
                        data?.location?.meta?.shortFormattedAddress}
                    </Typography>
                  </View>
                </View>
              )}
            <View>
              <Typography weight="medium" variant="base">
                Notes
              </Typography>
              <Typography color={eventTextColor?.[data?.eventType]}>
                {data.notes || "-"}
              </Typography>
            </View>
            {!!data?.tags?.length && (
              <View>
                <Typography weight="medium" variant="base">
                  Tags
                </Typography>
                <View style={tailwind("flex-row")}>
                  {data?.tags?.map((el, index) => (
                    <Typography
                      key={el._id}
                      color={eventTextColor?.[data?.eventType]}
                    >
                      {index > 0 && ", "}
                      {el.name}
                    </Typography>
                  ))}
                </View>
              </View>
            )}
            <View>
              <Typography weight="medium" variant="base">
                Policy
              </Typography>
              <Typography color="gray-400" variant="sm">
                View Gooday's{" "}
                <Button
                  title="Terms and Conditions"
                  variant="text"
                  className="h-4 p-0"
                  onPress={() =>
                    Linking.openURL(config.TERMS_CONDITION_PAGE_URL)
                  }
                />{" "}
                and{" "}
                <Button
                  title="Privacy Policy. "
                  variant="text"
                  className="h-4 p-0"
                  onPress={() => Linking.openURL(config.PRIVACY_POLICY_URL)}
                />
                View the event venue's business policies.
              </Typography>
            </View>
            <View style={tailwind("flex-1 justify-end")}>
              <Button
                title={getButtonTitle()}
                color="primary"
                onPress={() => {
                  if (isGoogle || isMicrosoft) {
                    Linking.openURL(data.link!);
                    return
                  }
                  isBooking ? changeView!("edit") : changeView!("event-edit");
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
