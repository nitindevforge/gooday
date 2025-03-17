import React, {
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTailwind } from "tailwind-rn";
import { CalendarDefaultLayoutProps } from "./type";
import {
  Alert,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AddBookingModal,
  CalendarList,
  CalendarNavigationParamList,
  CreateEventModal,
  DropdownIconModal,
  DropdownItemModal,
  Header,
  NOTIFICATION,
  Role,
  useAddCalendarMutation,
  useCalendarRenameMutation,
  useDeleteCalendarMutation,
  useGetMyCalendar,
  useGetUser,
  useNotificationCountMutation,
} from "@app/modules";
import { AvatarGroup, Icon, Loading, Typography } from "@app/ui";
import { getAssetUrl, getFormattedDate } from "@app/utils";
import NiceModal from "@ebay/nice-modal-react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useCalendar } from "@app/common";
import { UserEntity } from "@gooday_corp/gooday-api-client";
import clsx from "clsx";

export const CalenderDefaultLayout: React.FC<
  PropsWithChildren<CalendarDefaultLayoutProps>
> = ({
  calenderType,
  date,
  role,
  children,
  onCalendar,
}) => {
    const tailwind = useTailwind();
    const {
      updateCalendar,
      onModalVisible,
      modalVisible,
      calendar,
      onFocus,
      focus,
    } = useCalendar();
    const { data, refetch } = useGetMyCalendar(true);
    const { data: userMe } = useGetUser();
    const [name, setName] = useState<string>(calendar?.name || "");
    const inputRef = useRef<TextInput>(null);
    const user: UserEntity = userMe?.data?.data!;
    const { mutate: addCalendar, isLoading } = useAddCalendarMutation();
    const { mutate: removeCalendar, isLoading: isRemoveCalendarLoading } =
      useDeleteCalendarMutation();
    const { data: notification } = useNotificationCountMutation({
      category: [NOTIFICATION.CALENDAR],
    });
    useMemo(() => {
      setName(calendar?.name);
    }, [calendar]);

    const { mutate: renameCalendar, isLoading: isRenameCalLoading } =
      useCalendarRenameMutation();

    const calendarNavigation =
      useNavigation<NativeStackNavigationProp<CalendarNavigationParamList>>();
    const calendarOptions: DropdownItemModal[] = useMemo(() => {
      const options: DropdownItemModal[] = [
        {
          icon: {
            name: "swap",
            round: false,
            width: 14,
            height: 14,
            stroke: "none",
          },
          label: "Add Shared Calendar",
          textColor: "gray-400",
          onPress: () => {
            addCalendar(
              { name: `${user?.nickName || user?.firstName}'s Calendar` || "New" },
              {
                onSuccess: (response) => {
                  refetch();
                  onModalVisible(false);
                  updateCalendar(response?.data?.data);
                  calendarNavigation.navigate("COLLABORATOR");
                },
              }
            );
          },
        },
      ];
      if (user?._id === calendar?.owner) {
        if (calendar?.type === "SHARED") {
          options?.push({
            icon: {
              name: "add",
              fill: "black",
              stroke: "none",
              width: 18,
              height: 18,
              round: true,
            },
            label: "Add Contact",
            textColor: "gray-400",
            onPress: () => {
              calendarNavigation.navigate("COLLABORATOR");
              onModalVisible(false);
            },
          });
        }
        options?.push({
          icon: {
            name: "edit",
            outline: false,
            width: 16,
            height: 16,
            fill: "black",
            stroke: "none",
          },
          label: "Rename",
          textColor: "gray-400",
          onPress: () => {
            onFocus(true);
          },
        });
      }
      if (calendar?.type === "SHARED") {
        options?.push({
          icon: {
            name: "delete",
            stroke: "#E24653",
            fill: "none",
            outline: true,
            width: 17,
            height: 19,
          },
          label: "Delete Shared Calendar",
          textColor: "error",
          onPress: () => {
            Alert.alert(
              "Are you sure?",
              "Contacts using this shared calendar will be notified that you are leaving.",
              [
                {
                  text: "Nevermind",
                },
                {
                  text: "Confirm",
                  onPress: () => {
                    removeCalendar(
                      {
                        calendar: calendar?._id,
                      },
                      {
                        onSuccess: () => {
                          refetch();
                          updateCalendar(data?.data?.data?.[0]!);
                        },
                      }
                    );
                  },
                },
              ]
            );
          },
        });
      }
      return options;
    }, [user, calendar]);

    const onPlusPress = () => {
      const modal = role === Role.BUSINESS ? AddBookingModal : CreateEventModal;
      NiceModal?.show(modal);
    };

    useEffect(() => {
      if (focus) {
        setTimeout(() => {
          inputRef?.current?.focus();
        }, 500);
      }
    }, [focus]);

    return (
      <SafeAreaView style={tailwind("flex-1")}>
        <Loading
          loading={isLoading || isRemoveCalendarLoading || isRenameCalLoading}
        />
        <View style={tailwind("flex-1")}>
          <Header showLogo showDate />
          <View style={tailwind("px-6 flex-1")}>
            <View style={tailwind("flex-row items-center justify-between mt-1")}>
              <View style={tailwind("flex-row items-center")}>
                {calendar?.name && (
                  <TextInput
                    editable={calendar?.owner === user?._id}
                    ref={inputRef}
                    onBlur={() => onFocus(false)}
                    onChangeText={(text) => setName(text)}
                    value={name}
                    style={[{ fontSize: 24, fontWeight: "500", marginBottom: 5 }]}
                    numberOfLines={1}
                    returnKeyType="done"
                    onSubmitEditing={() => {
                      onFocus(false);
                      if (calendar?.name !== name) {
                        renameCalendar(
                          {
                            calendar: (calendar?._id
                              ? calendar?._id
                              : user?.calendar)!,
                            name: name,
                          },
                          {
                            onSuccess: () => {
                              refetch();
                              updateCalendar({
                                calendar: (calendar?._id
                                  ? calendar?._id
                                  : user?.calendar)!,
                                name: name,
                              });
                            },
                          }
                        );
                      }
                    }}
                  />
                )}
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => inputRef?.current?.focus()}
                >
                  <Typography weight="medium" variant="2xl">
                    {!name && "Calendar"}
                  </Typography>
                </TouchableOpacity>
              </View>
              <View>
                <AvatarGroup
                  avatars={calendar?.collaborators?.map((el) =>
                    getAssetUrl(el?.profile)
                  )}
                />
              </View>
            </View>
            <View style={[tailwind(clsx("mb-2 flex-row items-end justify-between", {
              "items-center": calenderType === "month"
            }))]}>
              <View
                style={[tailwind(clsx("flex-row flex-1 items-end -mb-1", {
                  "items-center": calenderType === "month"
                })), { columnGap: calenderType === "week" ? 12 : 0 }]}
              >
                <Typography
                  weight="medium"
                  numberOfLines={1}
                  variant={calenderType === "month" ? "32" : "5xl"}
                  className={calenderType === "week" ? "-mb-1" : ""}
                >
                  {calenderType === "month"
                    ? getFormattedDate("MMMM", date)
                    : getFormattedDate("DD", date)}
                </Typography>
                <View style={[tailwind('flex-1'), { gap: 1 }]}>
                  {calenderType === "week" && (
                    <Typography numberOfLines={1} weight="medium" variant="lg" className="-mb-1">
                      {getFormattedDate("ddd", date)}
                    </Typography>
                  )}
                  <Typography numberOfLines={1} weight="medium" variant={calenderType === "month" ? "32" : "2xl"}>
                    {calenderType === "week" && getFormattedDate("MMMM", date)}{" "}
                    {getFormattedDate("YYYY", date)}
                  </Typography>
                </View>
              </View>
              <View
                style={[tailwind("flex-row items-center")]}
              >
                <View
                  style={[
                    tailwind("flex-row items-center"),
                    { columnGap: 10 },
                  ]}
                >
                  <TouchableOpacity activeOpacity={0.7} onPress={onCalendar}>
                    {calenderType === "month" ? (
                      <Icon name="toggle" stroke="none" />
                    ) : (
                      <Icon name="month-view" fill="none" stroke="#4D4D4D" />
                    )}
                  </TouchableOpacity>
                  <DropdownIconModal
                    disabled={role === Role.BUSINESS}
                    data={calendarOptions}
                    icon={{
                      name: "circle-dots",
                      width: 20,
                      height: 20,
                    }}
                    variant="between"
                    onModal={(value) => onModalVisible(value)}
                    visible={modalVisible}
                  >
                    {data?.data?.data?.length && (
                      <CalendarList data={data?.data?.data!} />
                    )}
                  </DropdownIconModal>
                </View>
              </View>
            </View>
            {children}
          </View>
        </View>
        <View style={tailwind("absolute items-end mb-6 mr-6 bottom-0 right-0")}>
          <TouchableOpacity activeOpacity={1} onPress={onPlusPress}>
            <Icon
              name="plus"
              stroke="none"
              width={60}
              height={60}
              style={{ backgroundColor: "transparent" }}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
