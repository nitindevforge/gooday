import React, { useEffect, useMemo, useRef, useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
  Modal,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Button,
  DatePickerModel,
  Dropdown,
  ErrorMassage,
  Icon,
  Input,
  LoadingUi,
  PaymentCard,
  PhoneInput,
  Typography,
} from "@app/ui";
import { useTailwind } from "tailwind-rn";
import {
  CalendarNavigationParamList,
  InputFieldValue,
  useAddBooking,
  useBusinessMe,
} from "@app/modules";
import clsx from "clsx";
import { getFormattedDate } from "@app/utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface AddBookingModalProps {
  pendingActions?: string[];
}
export const AddBookingModal = NiceModal.create<AddBookingModalProps>(({ }) => {
  const { visible, hide } = useModal();
  const { data: business } = useBusinessMe();
  const tailwind = useTailwind();
  const {
    form: {
      setFieldValue,
      handleChange,
      values,
      errors,
      handleBlur,
      handleSubmit,
      touched,
      resetForm,
      setFieldTouched,
    },
    isLoading,
  } = useAddBooking((business?.data?.data?.cancellationFee ?? 0));
  const inputRef = useRef<TextInput[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [field, setField] = useState<string>("");
  const [fields, setFields] = useState<number>(1);
  const navigation =
    useNavigation<NativeStackNavigationProp<CalendarNavigationParamList>>();

  const inputField: InputFieldValue[] = [
    {
      type: "text",
      name: "title",
      label: "Booking Title",
      placeholder: "Shamim Hashemi Hair cut",
    },
    {
      type: "date",
      name: "date",
      label: "Date",
      placeholder: "DD / MM / YYYY",
    },
    {
      type: "select",
      name: "people",
      label: "Number of people",
      placeholder: "Select a people",
      data: [
        {
          label: "1",
          value: 1,
        },
        {
          label: "2",
          value: 2,
        },
        {
          label: "3",
          value: 3,
        },
        {
          label: "4",
          value: 4,
        },
      ],
    },
    {
      type: "select",
      name: "venue",
      label: "Venue",
      placeholder: "Select a venue",
      data:
        business?.data?.data?.venues?.map((el) => ({
          value: el?._id,
          label: el?.location?.meta?.shortFormattedAddress,
        })) || [],
    },
    {
      type: "textarea",
      name: "note",
      label: "Note",
      placeholder: "Additional details",
    },
    {
      type: "text",
      name: "customerName",
      label: "Customer’s name",
      placeholder: "Shamim Hashemi Hair cut",
    },
    {
      type: "mobile",
      name: "phoneNumber",
      label: "Phone number",
      placeholder: "",
    },
    {
      type: "text",
      name: "email",
      label: "Email",
      placeholder: "example@gmail.com",
    },
  ];

  const onDone = () => {
    setFieldValue(field, selectedDate);
    setOpen(false);
  };

  const dateTimeError = useMemo(() => {
    let error = false;
    const fields = ["calendar", "startDate", "endDate"];
    fields?.forEach((el) => {
      error = errors[el] && touched[el];
    });
    return error;
  }, [errors, touched]);

  useEffect(() => {
    setFieldValue("venue", business?.data?.data?.venues?.[0]?._id);
  }, [business]);

  const onNavigatePolicies = () => {
    hide()
    navigation.navigate("POLICY", {
      policies: business?.data?.data?.policies!,
      businessName: business?.data?.data?.name!,
    });
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
      presentationStyle="fullScreen"
    >
      <SafeAreaView style={tailwind("flex-1")}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={tailwind("px-6 flex-1")}>
            <View style={tailwind("flex-row items-center")}>
              <TouchableOpacity
                style={tailwind("flex items-start w-7 h-11 justify-center")}
                onPress={() => {
                  resetForm();
                  hide();
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
                Add Booking
              </Typography>
            </View>

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
                        inputMode="numeric"
                      />
                    ) : type === "select" ? (
                      <Dropdown
                        data={data as any}
                        onChangeText={(text) => {
                          setFieldValue(name, text);
                          if (name === "people") {
                            setFields(1);
                          }
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
                          style={tailwind(clsx("flex flex-row items-center"))}
                        >
                          <View style={tailwind("w-2/5 pr-1")}>
                            <TouchableOpacity
                              onPress={() => {
                                setOpen(true);
                                setField("date");
                              }}
                            >
                              <Input
                                onPress={() => {
                                  setOpen(true);
                                  setField("date");
                                }}
                                value={
                                  values?.date &&
                                  getFormattedDate("L", values?.date)
                                }
                                // editable={false}
                                onChangeText={handleChange(name)}
                                onBlur={handleBlur(name)}
                                label={label}
                                placeholder="DD/MM/YYYY"
                                returnKeyType="next"
                                ref={(ref) => (inputRef.current[index] = ref)}
                              />
                            </TouchableOpacity>
                          </View>
                          <View
                            style={tailwind("w-3/5 flex flex-row items-center")}
                          >
                            <View style={tailwind("w-1/2 pr-1")}>
                              <TouchableOpacity
                                onPress={() => {
                                  setOpen(true);
                                  setField("from");
                                }}
                              >
                                <Input
                                  label="From"
                                  onPress={() => {
                                    setOpen(true);
                                    setField("from");
                                  }}
                                  onChangeText={handleChange("from")}
                                  onBlur={handleBlur("from")}
                                  editable={false}
                                  value={
                                    values?.from &&
                                    getFormattedDate("HH:mm", values?.from)
                                  }
                                  placeholder="00:00 AM"
                                  className="rounded-xl"
                                  style={{ fontSize: 14 }}
                                />
                              </TouchableOpacity>
                            </View>
                            <View style={tailwind("w-1/2")}>
                              <TouchableOpacity
                                onPress={() => {
                                  setOpen(true);
                                  setField("to");
                                }}
                              >
                                <Input
                                  label="To"
                                  onPress={() => {
                                    setOpen(true);
                                    setField("to");
                                  }}
                                  onChangeText={handleChange("to")}
                                  onBlur={handleBlur("to")}
                                  editable={false}
                                  value={
                                    values?.to &&
                                    getFormattedDate("HH:mm", values?.to)
                                  }
                                  placeholder="00:00 PM"
                                  className="rounded-xl"
                                  style={{ fontSize: 14 }}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                        {!!dateTimeError && (
                          <ErrorMassage error="Date & time required" />
                        )}
                      </>
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
              {Array.from({ length: fields }, (_, i) => (
                <View
                  key={i}
                  style={tailwind(clsx("flex flex-row items-center"))}
                >
                  <Input
                    onChangeText={(text) => {
                      const goodayIds = [...values.goodayIds];
                      goodayIds[fields - 1] = text;
                      setFieldValue("goodayIds", goodayIds);
                    }}
                    label={i === 0 ? "Gooday ID (Optional)" : ""}
                    placeholder="Enter Gooday ID(s)"
                    returnKeyType="next"
                    right={
                      <TouchableOpacity
                        onPress={() => {
                          if (i === 0) {
                            if (fields < values?.people) {
                              setFields(fields + 1);
                            }
                          } else {
                            setFields(fields - 1);
                          }
                        }}
                        activeOpacity={
                          i === 0 ? (fields < values?.people ? 0.6 : 1) : 0.6
                        }
                        style={[
                          tailwind(clsx("items-end justify-center")),
                          { width: 22, height: 20 },
                        ]}
                      >
                        {i === 0 ? (
                          <Icon
                            name="add"
                            width={15}
                            height={15}
                            stroke="#8B8B8B"
                          />
                        ) : (
                          <View
                            style={{
                              width: 13.31,
                              height: 2,
                              backgroundColor: "#8B8B8B",
                            }}
                          ></View>
                        )}
                      </TouchableOpacity>
                    }
                  />
                </View>
              ))}

              {
                (business?.data?.data?.cancellationFee ?? 0) > 0 &&
                <>
                  <View>
                    <PaymentCard
                      style={{ height: 120 }}
                      onSubmit={(cardDetails) => {
                        setFieldValue("cardDetails", cardDetails);
                      }}
                    />
                    {errors?.cardDetails && touched.cardDetails && (
                      <ErrorMassage error="Card details required" />
                    )}
                  </View>
                  <View>
                    <Typography weight="medium" variant="sm" color="gray-400">
                      Please enter your customer’s credit card details to authorise
                      payment for the booking and potential cancellation fees. By
                      providing this information, you confirm that you have obtained
                      the customer’s consent to store and charge the card for
                      cancellations made within 24 hours of the booking date and
                      time, as per the cancellation policy.{" "}
                      {/* <Typography
                    onPress={() => {}}
                    weight="medium"
                    variant="sm"
                    className="underline"
                  >
                  </Typography> */}
                    </Typography>
                  </View>
                </>
              }
            </View>
          </View>
          <View style={tailwind("px-6")}>
            <Button
              disabled={false}
              onPress={handleSubmit}
              className="mt-6"
              title="Add booking"
            />
          </View>
        </KeyboardAwareScrollView>
        <DatePickerModel
          mode={field !== "date" ? "time" : "date"}
          minimumDate={
            field !== "date"
              ? field === "endDate"
                ? values?.startDate
                : undefined
              : new Date()
          }
          open={open}
          onClose={() => setOpen(false)}
          date={selectedDate}
          onDateChange={(date) => setSelectedDate(date)}
          onSubmit={onDone}
        />
      </SafeAreaView>
      <LoadingUi loading={isLoading} />
    </Modal>
  );
});
