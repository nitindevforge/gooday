import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AutoComplete,
  AutoCompleteItem,
  Button,
  CalendarBottomSheet,
  Dropdown,
  ErrorMassage,
  Icon,
  Input,
  LoadingUi,
  MultiSelectDropdown,
  PhoneInput,
  Typography,
  UploadImage,
} from "@app/ui";
import { useTailwind } from "tailwind-rn";
import {
  InputFieldValue,
  PhotoAccessModal,
  SelectOptions,
  useCreateEvent,
  useGetMyFriends,
  useGetUser,
  useSearchLocationMutation,
} from "@app/modules";
import clsx from "clsx";
import {
  checkMonth,
  getAssetUrl,
  getDatesBefore,
  getFormattedDate,
  getWithoutMore,
  useDebounce,
} from "@app/utils";
import {
  CalendarSlots,
  CreateEventCollaboratorPayload,
  FriendsDTO,
  UserEntity,
} from "@gooday_corp/gooday-api-client";
import { AxiosResponse } from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import moment from "moment";

interface EventModalProps {
  rowData?: any;
  userId?: any;
  visible: boolean;
  hide: () => void;
}
export const EventModal: FC<EventModalProps> = ({
  rowData,
  hide,
  visible,
  userId,
}) => {
  const tailwind = useTailwind();
  const [searchText, setSearchText] = useState<string>("");
  const [location, setLocation] = useState<AutoCompleteItem[]>([]);
  const inputRef = useRef<TextInput[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [field, setField] = useState<string>("");
  const [activeStart, setActiveStart] = useState<any>();
  const [activeEnd, setActiveEnd] = useState<any>();
  const debounceValue = useDebounce(searchText, 300);
  const [slotPeriod, setSlotPeriod] = useState<"month" | "day">("month");
  const [type, setType] = useState<"start" | "end">("start");
  const { mutate: searchLocation } = useSearchLocationMutation();
  const { data: userMe } = useGetUser();
  const {
    data: myFriends,
    isLoading,
    fetchNextPage,
    refetch,
  } = useGetMyFriends("", "", userId);
  const [slotsMonth, setSlotsMonth] = useState(moment());
  const [showModal, setShowModal] = useState<boolean>(false);

  const resetState = () => {
    setSelectedDate(moment());
    setField("");
    setSlotPeriod("month");
    setSlotsMonth(moment());
    setSearchText("");
    setLocation([]);
  };

  const {
    form: {
      setFieldValue,
      handleChange,
      values,
      errors,
      handleBlur,
      handleSubmit,
      touched,
      setValues,
      resetForm,
      setFieldTouched,
    },
    isLoading: isCreateEventLoading,
  } = useCreateEvent(() => {
    resetState();
    hide();
  }, rowData);

  const onChangeMonth = (prev: boolean = false) => {
    const currentMonth = moment(slotsMonth);
    const month = prev
      ? currentMonth.clone().subtract(1, "months")
      : currentMonth.clone().add(1, "months");
    setSlotsMonth(month);
    setSelectedDate(
      checkMonth(month!) ? moment() : moment(month).startOf("month")
    );
  };

  const friends = useMemo(() => {
    return myFriends?.pages?.reduce(
      (acc: FriendsDTO["data"], page: AxiosResponse<FriendsDTO>) => {
        return [...(acc ?? []), ...(page?.data?.data ?? [])];
      },
      []
    );
  }, [myFriends]);

  const repeatList = [
    {
      label: "None",
      value: "NONE",
    },
    {
      label: "Every day",
      value: "DAILY",
    },
    {
      label: "Every week",
      value: "WEEKLY",
    },
    {
      label: "Every month",
      value: "MONTHLY",
    },
    {
      label: "Every year",
      value: "YEAR",
    },
  ];

  const inputField: InputFieldValue[] = [
    {
      type: "text",
      name: "title",
      label: "Title",
      placeholder: "Add title",
    },
    {
      type: "multiple",
      name: "people",
      label: "Invite",
      placeholder: "Add contact",
      data:
        friends?.map((friend) => ({
          label: `${friend?.firstName} ${friend?.lastName}`,
          value: friend?._id,
        })) || [],
    },
    {
      type: "select",
      name: "repeat",
      label: "Repeat",
      placeholder: "repeat",
      data: repeatList,
    },
    {
      type: "date",
      name: "startDate",
      label: "Start Date",
      placeholder: "DD/MM/YYYY",
    },
    {
      type: "auto-complete",
      name: "Location",
      label: "Location",
      placeholder: "Add location",
    },
    {
      type: "textarea",
      name: "note",
      label: "Note",
      placeholder: "Additional details",
    },
  ];

  const dateTimeError = useMemo(() => {
    return (
      (errors?.startDate && touched?.startDate) ||
      (errors?.from && touched?.from) ||
      (errors?.to && touched?.to)
    );
  }, [errors, touched]);

  useEffect(() => {
    if (debounceValue) {
      searchLocation(debounceValue, {
        onSuccess(data) {
          setLocation(data?.data?.data);
        },
        onError(error) { },
      });
    }
  }, [debounceValue]);

  const onLocationChange = (value: string) => {
    if (value) {
      const locationLabel = location?.find((el) => el?.value === value);
      setSearchText(locationLabel?.label || value);
      handleChange("location")(locationLabel?.label || value);
      setFieldValue("locationValue", locationLabel);
      setLocation([]);
    } else {
      setSearchText("");
      handleChange("location")("");
      setFieldValue("locationValue", {});
    }
  };

  const onInvite = (selected, first?: boolean = false) => {
    selected = friends?.filter((el) =>
      selected.some((innerEl) => el?._id === innerEl.value)
    );
    if (!first) {
      setFieldValue("startDate", "");
      setFieldValue("endDate", "");
    }
    setActiveStart({});
    setActiveEnd({});
    const collaborators: CreateEventCollaboratorPayload[] =
      [userMe?.data?.data, ...selected]?.map((el) => ({
        _id: el?._id,
        email: el?.email,
        goodayId: el?.goodayId,
        mobile: el?.mobileNumber,
        name: el?.firstName,
      })) || [];
    setFieldValue("collaborators", [...collaborators]);
  };

  useEffect(() => {
    if ((userId && userMe?.data?.data?._id, friends?.length)) {
      onInvite([{ value: userId }], true);
    }
  }, [userId, userMe?.data?.data, friends]);

  const onDatePress = (
    field: string,
    period: "month" | "day",
    value: string,
    type: "button" | "style"
  ) => {
    // if (
    //   (period === "day" && !values?.[field]) ||
    //   (period === "month" && field === "from" && !values?.startDate)
    // ) {
    //   return;
    // }
    if (type === "style") {
      return true;
    }
    if (value) {
      setSelectedDate(moment(value));
    }
    setSlotPeriod(period);
    setOpen(true);
    setField(field);
  };

  useMemo(() => {
    if (rowData && visible) {
      setValues({
        title: rowData?.title,
        startDate: rowData?.startDate,
        endDate: rowData?.endDate,
        note: rowData?.notes,
        calendar: rowData?.calendar,
        people: rowData?.collaborators?.length,
        collaborators: rowData?.collaborators,
        type: "edit",
        _id: rowData?._id,
        location: rowData?.location?.meta?.formattedAddress,
        locationValue: rowData?.location,
        images: rowData?.images,
        from : rowData?.startDate,
        repeat : rowData?.repeat,
        to: rowData?.endDate
      });
      setSearchText(rowData?.location?.meta?.formattedAddress);
    }
  }, [rowData, visible]);

  const onTimeChange = (date: CalendarSlots) => {
    setFieldValue(field, new Date(date?.start));
    setOpen(false);
    if (field === "startDate") {
      setActiveStart(date);
    } else {
      setActiveEnd(date);
    }
  };

  const onDateChange = (date: Date) => {
    setFieldValue(field, date);
    setSelectedDate(date);
    setOpen(false);
  };

  useEffect(() => {
    if (visible) {
      refetch();
    }
  }, [visible, refetch]);

  const onFile = useCallback(
    async (file: string, upload: string) => {
      setValues({
        ...values,
        images: [...values?.images, file],
        upload: [...(values?.upload || []), upload],
      });
    },
    [values.images]
  );

  const onPhoto = () => {
    setShowModal(true);
  };

  const existingImages = rowData?.images || [];
  const newImages = values?.images?.filter(
    (image: string) => !existingImages.includes(image)
  );

  const uniqueData = (data: any) => {
    return Array.from(
      new Map(
        data?.unavailableFriends
          ?.map((element: any) => element)
          .flat()
          .map((item: any) => [item._id, item])
      ).values()
    );
  };

  return isLoading ? null : (
    <>
      <SafeAreaView style={tailwind("flex-1")}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={tailwind("px-6 flex-1")}>
            <View style={tailwind("flex-row items-center mt-3")}>
              <TouchableOpacity
                style={tailwind("flex items-start w-7 h-11 justify-center")}
                onPress={() => {
                  resetForm();
                  resetState();
                  hide();
                  setActiveStart({});
                  setActiveEnd({});
                }}
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
                {rowData ? "Edit" : "Create"} Event
              </Typography>
            </View>
            <View style={[tailwind("my-2 flex-1")]}>
              <UploadImage onPress={onPhoto} label="Photo" title="Optional" />
            </View>
            <ScrollView
              horizontal
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[tailwind("flex-row"), { gap: 10 }]}
            >
              {existingImages?.map((ele: string | undefined) => (
                <View key={ele} style={tailwind("flex")}>
                  <Image
                    source={{ uri: getAssetUrl(ele) }}
                    resizeMode="cover"
                    style={{ width: 65, height: 65 }}
                  />
                </View>
              ))}
              {newImages?.map((ele) => (
                <View key={ele} style={tailwind("flex")}>
                  <Image
                    src={ele}
                    resizeMode="cover"
                    style={{ width: 65, height: 65 }}
                  />
                </View>
              ))}
            </ScrollView>
            <View style={[tailwind("flex flex-1"), { rowGap: 10 }]}>
              {inputField?.map((field, index) => {
                const { name, label, placeholder, type, data } = field;

                return (
                  <React.Fragment key={name}>
                    {type === "mobile" ? (
                      <PhoneInput
                        onChangeItem={(value, countryCode) => {
                          setFieldValue("phoneNumber", value);
                          handleChange("countryCode")(countryCode);
                        }}
                        onBlur={handleBlur(name)}
                        value={values[name]}
                        label={label}
                        placeholder={placeholder}
                        ref={(ref) => (inputRef.current[index] = ref)}
                        returnKeyType="next"
                        keyboardType={"number-pad"}
                        error={
                          errors[name] && touched[name] ? errors[name] : ""
                        }
                        onSubmitEditing={() => {
                          if (inputField?.length > index + 1) {
                            inputRef.current[index + 1]?.focus();
                          }
                        }}
                      />
                    ) : type === "multiple" ? (
                      <MultiSelectDropdown
                        onChange={onInvite}
                        disabled={
                          (rowData &&
                            rowData?.createdBy !== userMe?.data?.data?._id) ||
                            !data?.length
                            ? true
                            : false
                        }
                        fetchNextPage={fetchNextPage}
                        selectedOptions={
                          values?.collaborators
                            ?.map((friend) => ({
                              label: friend?.name,
                              value: friend?._id,
                            }))
                            ?.filter(
                              (el) =>
                                el?.value?.toString() !==
                                userMe?.data?.data?._id?.toString()
                            ) || []
                        }
                        options={data}
                        optionComponent={(props) => (
                          <OptionComponent
                            {...props}
                            friend={friends?.find(
                              (el) => el?._id === props?.value
                            )}
                          />
                        )}
                      />
                    ) : type === "select" ? (
                      <Dropdown
                        data={data as any}
                        onChangeText={(text) => {
                          setFieldValue(name, text);
                        }}
                        onBlur={() => setFieldTouched(name, true)}
                        label={label}
                        placeholder={placeholder}
                        selected={values[name] || data?.[0]?.value!}
                        error={
                          !values[name] && touched[name] ? errors[name] : ""
                        }
                        labelField="label"
                        valueField="value"
                        onChange={() => { }}
                      />
                    ) : type === "date" ? (
                      <>
                        <View
                          style={[
                            tailwind(clsx("flex-1 flex-row items-center")),
                            { gap: 4 },
                          ]}
                        >
                          <View style={tailwind("flex-1")}>
                            <TouchableOpacity
                              onPress={() =>
                                onDatePress(
                                  name,
                                  "month",
                                  values[name],
                                  "button"
                                )
                              }
                              activeOpacity={1}
                            >
                              <Input
                                onPress={() =>
                                  onDatePress(
                                    name,
                                    "month",
                                    values[name],
                                    "button"
                                  )
                                }
                                value={
                                  values[name] &&
                                  getFormattedDate("DD/MM/YYYY", values[name])
                                }
                                editable={false}
                                onChangeText={handleChange(name)}
                                onBlur={handleBlur(name)}
                                label={label}
                                placeholder="DD/MM/YYYY"
                                returnKeyType="next"
                                ref={(ref) => (inputRef.current[index] = ref)}
                                className={clsx({
                                  "bg-gray-600": !onDatePress(
                                    name,
                                    "month",
                                    values[name],
                                    "style"
                                  ),
                                })}
                              />
                            </TouchableOpacity>
                          </View>
                          <View>
                            <TouchableOpacity
                              onPress={() => {
                                onDatePress(
                                  "from",
                                  "day",
                                  values["from"],
                                  "button"
                                );
                                setType("start");
                              }}
                              activeOpacity={1}
                            >
                              <Input
                                label="From"
                                onPress={() => {
                                  onDatePress(
                                    "from",
                                    "day",
                                    values["from"],
                                    "button"
                                  );
                                  setType("start");
                                }}
                                onChangeText={handleChange("from")}
                                onBlur={handleBlur("from")}
                                editable={false}
                                value={
                                  values["from"] &&
                                  getFormattedDate("LT", values["from"])
                                }
                                placeholder="00:00 AM"
                                className={clsx("rounded-xl", {
                                  "bg-gray-600": !onDatePress(
                                    "from",
                                    "day",
                                    values["from"],
                                    "style"
                                  ),
                                })}
                                style={{
                                  fontSize: 14,
                                  width: 70,
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              />
                            </TouchableOpacity>
                          </View>

                          <View>
                            <TouchableOpacity
                              onPress={() => {
                                onDatePress(
                                  "to",
                                  "day",
                                  values["to"],
                                  "button"
                                );
                                setType("end");
                              }}
                              activeOpacity={1}
                            >
                              <Input
                                label="To"
                                onPress={() => {
                                  onDatePress(
                                    "to",
                                    "day",
                                    values["to"],
                                    "button"
                                  );
                                  setType("end");
                                }}
                                onChangeText={handleChange("to")}
                                onBlur={handleBlur("to")}
                                editable={false}
                                value={
                                  values["to"] &&
                                  getFormattedDate("LT", values["to"])
                                }
                                placeholder="00:00 AM"
                                className={clsx("rounded-xl", {
                                  "bg-gray-600": !onDatePress(
                                    "to",
                                    "day",
                                    values["to"],
                                    "style"
                                  ),
                                })}
                                style={{
                                  fontSize: 14,
                                  width: 70,
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                        {!!dateTimeError && (
                          <ErrorMassage error="Date & time required" />
                        )}
                        <Typography weight="medium" color="error" variant="sm">
                          {activeStart &&
                            name === "startDate" &&
                            getWithoutMore(
                              uniqueData(activeStart),
                              "is unavailable at this time!"
                            )}
                          {activeEnd &&
                            name === "endDate" &&
                            getWithoutMore(
                              uniqueData(activeEnd),
                              "is unavailable at this time!"
                            )}
                        </Typography>
                      </>
                    ) : type === "auto-complete" ? (
                      <View style={tailwind("z-50")}>
                        <AutoComplete
                          data={searchText ? location : []}
                          className="z-50"
                          label="Location"
                          placeholder="Location"
                          onChange={onLocationChange}
                          onBlur={handleBlur("location")}
                          fromApi={true}
                          selected={values?.location! || searchText}
                          error={
                            errors?.location && touched?.location
                              ? errors?.location
                              : ""
                          }
                        />
                      </View>
                    ) : (
                      <View
                        style={[
                          tailwind(clsx("flex flex-row items-center")),
                          { columnGap: 10 },
                        ]}
                      >
                        <Input
                          onChangeText={handleChange(name)}
                          onBlur={handleBlur(name)}
                          value={values[name]}
                          label={label}
                          autoCorrect={false}
                          placeholder={placeholder}
                          error={
                            errors[name] && touched[name] ? errors[name] : ""
                          }
                          ref={(ref) => (inputRef.current[index] = ref)}
                          returnKeyType="next"
                          keyboardType={
                            name === "email" ? "email-address" : "default"
                          }
                          onSubmitEditing={() => {
                            if (inputField?.length > index + 1) {
                              inputRef.current[index + 1]?.focus();
                            }
                          }}
                          multiline={type === "textarea"}
                          height={type === "textarea" ? 166 : 42.88}
                          textAlignVertical={name === "note" ? "top" : "auto"}
                        />
                      </View>
                    )}
                  </React.Fragment>
                );
              })}
            </View>
          </View>
          <PhotoAccessModal
            onFile={onFile}
            hide={() => setShowModal(false)}
            visible={showModal}
          />
          <View style={tailwind("px-6")}>
            <Button
              disabled={
                activeStart?.unavailableFriends?.length ||
                activeStart?.unavailableFriends?.length
              }
              onPress={handleSubmit}
              className="mt-6"
              title="Save"
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <CalendarBottomSheet
        open={open}
        onClose={() => setOpen(false)}
        view="monthly"
        variant="secondary"
        date={selectedDate}
        type={type}
        startDate={values?.from}
        onTimeChange={onTimeChange}
        onPress={onDateChange}
        collaborators={values?.collaborators?.map((ele) => ele?._id) ?? []}
        onChangeMonth={onChangeMonth}
        slotPeriod={slotPeriod}
        disabledDates={getDatesBefore(
          field === "startDate" ? moment() : moment(values?.startDate)
        )}
      />
      <LoadingUi loading={isCreateEventLoading} />
    </>
  );
};

type OptionComponentProps = {
  id: string;
  friend: UserEntity;
} & SelectOptions;

const OptionComponent: FC<OptionComponentProps> = ({ id, label, friend }) => {
  const tailwind = useTailwind();
  return (
    <View style={[tailwind("flex-row p-1"), { gap: 6 }]}>
      <Image
        style={[
          {
            borderWidth: 1.5,
          },
          tailwind("rounded-full border-white w-6 h-6"),
        ]}
        source={{ uri: getAssetUrl(friend?.profile) }}
        defaultSource={require("../../../../../assets/Images/profile.png")}
      />
      <Typography>{label}</Typography>
    </View>
  );
};
