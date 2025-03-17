import { Button, Icon, Typography } from "@app/ui";
import React, { } from "react";
import { Linking, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { ContactVenueProps } from "./type";
import { BookingDetailsCard } from "../../BookingDetailsCard";
import config from "@app/config";

export const ContactVenue: React.FC<ContactVenueProps> = ({ data: booking, changeView, closeModal }) => {
  const tailwind = useTailwind();

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <View style={tailwind("px-6 flex-1  mt-4")}>
        <View style={tailwind("flex-1")}>
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
              {booking?.business?.name}
            </Typography>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={tailwind("flex-1")}>
            <View style={[{ gap: 24 }]}>
              <BookingDetailsCard data={booking} />
              {booking?.business?.cancellationFee > 0 ? (
                <View style={[{ gap: 12, marginTop: 22 }]}>
                  <Typography color="gray-400" variant="sm">
                    Cancellations made within 24 hours of the bookings at {booking?.business?.name}
                    will result in a fee of ${booking?.business?.cancellationFee} per
                    person.
                  </Typography>

                </View>
              ) : null}
              <Typography color="gray-400" variant="sm">
                View Gooday's{" "}
                <Button
                  title="Terms and Conditions"
                  variant="text"
                  className="h-5 px-0"
                  onPress={() =>
                    Linking.openURL(config.TERMS_CONDITION_PAGE_URL)
                  }
                />{" "}
                and{" "}
                <Button
                  title="Privacy Policy. "
                  variant="text"
                  className="h-5 px-0"
                  onPress={() =>
                    Linking.openURL(config.PRIVACY_POLICY_URL)
                  }
                />
                View the event venue's business policies.
              </Typography>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[tailwind('flex-row  pt-10'),
              { gap: 12 }]}>
              {
                !!booking?.venue?.website &&
                <Button
                  variant='outline'
                  iconPosition='left'
                  icon='website'
                  title='Website'
                  onPress={() => Linking.openURL(booking?.venue?.website)}
                  iconProps={{
                    name: 'website',
                    fill: '#3A5ACA'
                  }}
                  className='flex-1'
                  radius='rounded-full'
                />
              }
              {
                !!booking?.venue?.phone &&
                <Button
                  variant='outline'
                  iconPosition='left'
                  icon='call'
                  onPress={() => Linking.openURL(`tel:$${booking?.venue?.phone}`)}
                  title='Call'
                  className='flex-1'
                  iconProps={{
                    name: 'call',
                    fill: '#3A5ACA'
                  }}
                  radius='rounded-full'
                />
              }

              {!!booking?.venue?.email &&
                <Button
                  variant='outline'
                  iconPosition='left'
                  icon='mail'
                  onPress={() => Linking.openURL(`mailto:${booking?.venue?.email}`)}
                  title='Email'
                  className='flex-1'
                  iconProps={{
                    name: 'mail',
                    fill: '#3A5ACA',
                    stroke: '#3A5ACA'
                  }}
                  radius='rounded-full'
                />}
            </ScrollView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};
