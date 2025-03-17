import React, { useEffect, useMemo, useState } from "react";
import {
  BusinessDetailsInfoFormProps,
  ConsentCheckbox,
  useBusinessCategoriesMutation,
  useBusinessType,
  useBusinessVerificationMutation,
  VenueCard,
  VenueModalForm,
} from "@app/modules";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Button, Icon, Input, Typography, Tooltip, Dropdown } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import {
  BusinessVenueDTO,
  BusinessVerificationControllerABNVerificationTypeEnum,
  CategoryEntity,
} from "@gooday_corp/gooday-api-client";
import clsx from "clsx";
import { isFormValid } from "@app/utils";
interface Country {
  title: string;
  BNTitle: BusinessVerificationControllerABNVerificationTypeEnum;
}
export const BusinessDetailsInfoForm: React.FC<
  BusinessDetailsInfoFormProps
> = ({
  form: {
    handleChange,
    handleBlur,
    values,
    handleSubmit,
    errors,
    setFieldValue,
    touched,
    setFieldError,
    setFieldTouched,
  },
  isLoading,
}) => {
  const tailwind = useTailwind();
  const [showTip, setShowTip] = useState<Boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data: businessType } = useBusinessType();
  const [categories, setCategories] = useState<CategoryEntity[]>([]);
  const { mutate } = useBusinessCategoriesMutation();
  const [updateIndex, setUpdateIndex] = useState<number>();
  const {
    mutate: businessVerification,
    isLoading: isBusinessLoading,
    isError,
  } = useBusinessVerificationMutation();
  const disabled = isFormValid(errors, values) || !values?.venues?.length;

  const businessTypes = useMemo(() => {
    return (
      businessType?.data?.data?.map((el) => ({
        label: el?.name,
        value: el?._id,
      })) || []
    );
  }, [businessType]);

  const countryList: Country[] = [
    {
      title: "Australia",
      BNTitle: "ABN",
    },
    {
      title: "New Zealand",
      BNTitle: "NZBN",
    },
    {
      title: "United States",
      BNTitle: "EIN",
    },
    {
      title: "United Kingdom",
      BNTitle: "CRN",
    },
  ];

  const infoMsg = {
    ABN: "An Australian Business Number (ABN)",
    NZBN: "A New Zealand Business Number (NZBN)",
    EIN: "A Employer Identification Number (EIN)",
    CRN: "A Company Registration Number (CRN)",
  };

  const handleChangeBusinessType = (item: string) => {
    setFieldValue("businessCategory", "");
    setFieldValue("businessCategoryLabel", "");
    const isBusinessType = businessType?.data?.data?.find(
      (el) => el?._id === item
    );
    if (isBusinessType) {
      setFieldValue("businessType", isBusinessType?._id);
      setFieldValue("businessTypeLabel", isBusinessType?.name);
    } else {
      setFieldValue("businessTypeLabel", item);
    }
  };

  const handleChangeCategory = (item: string) => {
    const isCategory = categories?.find((el) => el?._id === item);
    if (isCategory) {
      setFieldValue("businessCategory", isCategory?._id);
      setFieldValue("businessCategoryLabel", isCategory?.name);
    } else {
      setFieldValue("businessCategoryLabel", item);
    }
  };

  const onBusinessVerification = () => {
    if (values?.businessID && values?.businessCountry) {
      const payload = {
        businessNumber: values?.businessID,
        type: values?.businessCountry as BusinessVerificationControllerABNVerificationTypeEnum,
      };
      businessVerification(payload, {
        onSuccess(data) {
          if (data?.data?.data?.verified) {
            setFieldValue("businessIDVerified", true);
          }
        },
        onError(error) {
          setFieldError("businessID", error.response?.data?.message);
        },
      });
    }
  };

  const handleSetVenue = (venue: BusinessVenueDTO) => {
    if (updateIndex || updateIndex === 0) {
      const venues = values?.venues;
      venues[updateIndex] = venue;
      setFieldValue("venues", venues);
      setUpdateIndex(undefined);
    } else {
      setFieldValue("venues", [...values?.venues, venue]);
    }
  };

  const onDelete = (index: number) => {
    const updatedVenues = values?.venues?.filter((el, i) => i !== index);
    setFieldValue("venues", updatedVenues);
  };

  const onEdit = (index: number) => {
    setUpdateIndex(index);
    setShowModal(true);
  };

  const onCountryPress = (country: string) => {
    setFieldValue("businessCountry", country);
    setFieldValue("businessID", "");
    setFieldValue("businessIDVerified", false);
  };

  useEffect(() => {
    setFieldValue("businessIDVerified", false);
  }, [values?.businessID]);

  useEffect(() => {
    if (values?.businessType) {
      const isBusinessType = businessType?.data?.data?.find(
        (el) => el?._id === values?.businessType
      );
      if (isBusinessType) {
        setFieldValue("businessTypeLabel", isBusinessType?.name);
        mutate(isBusinessType?._id!, {
          onSuccess(data) {
            if (data?.data?.data?.length) {
              setCategories(data?.data?.data);
              const isCategoryType = data?.data?.data?.find(
                (el) => el?._id === values?.businessCategory
              );
              if (isCategoryType) {
                setFieldValue("businessCategoryLabel", isCategoryType?.name);
              }
            }
          },
        });
      }
    }
  }, [values?.businessType]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      disableScrollOnKeyboardHide
    >
      <View style={tailwind("flex-1")}>
        <View style={{ ...tailwind("pt-4 flex"), rowGap: 10 }}>
          <View>
            <Input
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values?.name}
              label="Business Name"
              placeholder="Business Name"
              returnKeyType="next"
              error={errors?.name && touched?.name ? errors?.name : ""}
            />
          </View>
          <Typography variant="sm" weight="medium">
            Where is your business registered?
          </Typography>
          {countryList.map((country) => (
            <ConsentCheckbox
              key={country.BNTitle}
              onPress={() => onCountryPress(country.BNTitle)}
              checked={values?.businessCountry === country.BNTitle}
              title={country.title}
            />
          ))}
          {values?.businessCountry && (
            <View
              style={tailwind(
                clsx("relative", {
                  " z-50": showTip,
                })
              )}
            >
              <Tooltip
                showTip={showTip}
                massage={`${
                  infoMsg[values?.businessCountry]
                } is required to verify your business account.`}
                styles={{ maxWidth: 300 }}
                onClose={() => setShowTip(false)}
              />
              <TouchableOpacity
                onPress={() => setShowTip(!showTip)}
                style={tailwind("absolute right-0 top-1 z-10")}
              >
                <Icon name="info" width={17} height={17} />
              </TouchableOpacity>
              <Input
                onChangeText={handleChange("businessID")}
                onBlur={handleBlur("businessID")}
                value={values?.businessID}
                label={`Enter your ${values?.businessCountry}`}
                placeholder="XXXXXXXX"
                returnKeyType="next"
                error={
                  values?.businessIDVerified
                    ? "Verified!"
                    : (errors?.businessID && touched?.businessID) || isError
                    ? errors?.businessID
                    : values?.businessID
                    ? "Press the blue arrow to verify"
                    : ""
                }
                success={!!values?.businessIDVerified}
                massageStyle={{
                  color: values?.businessIDVerified ? "#68A659" : "#BA0000",
                  textAlign: "right",
                  fontSize: 14,
                  marginTop: 4,
                }}
                onSubmitEditing={onBusinessVerification}
                right={
                  <>
                    {isBusinessLoading ? (
                      <ActivityIndicator />
                    ) : (
                      <>
                        {values?.businessIDVerified ? (
                          <Icon
                            name="check"
                            width={20}
                            height={20}
                            fill="#68A659"
                          />
                        ) : errors?.businessID && touched?.businessID ? (
                          <Icon
                            name="close"
                            width={20}
                            height={20}
                            fill="#BA0000"
                          />
                        ) : (
                          <TouchableOpacity
                            activeOpacity={values?.businessID ? 0.2 : 1}
                            style={[tailwind("py-3 px-2")]}
                            disabled={values?.businessIDVerified}
                            onPress={onBusinessVerification}
                          >
                            <Icon name="right-arrow" width={16} height={16} />
                          </TouchableOpacity>
                        )}
                      </>
                    )}
                  </>
                }
              />
            </View>
          )}
          <Dropdown
            data={businessTypes}
            label="Business Type (Primary Category)"
            placeholder="i.e (Grocery Store)"
            selected={values?.businessType}
            onBlur={() => setFieldTouched("businessType", true)}
            labelField="label"
            valueField="value"
            onChangeText={handleChangeBusinessType}
            error={
              !values?.businessType && touched?.businessType
                ? errors?.businessType
                : ""
            }
            onChange={() => {}}
          />
          <Dropdown
            data={
              categories?.map((el) => ({
                label: el?.name,
                value: el?._id?.toString(),
              })) || []
            }
            label="(Additional Category)"
            placeholder="i.e (Deli, Pharmacy)"
            selected={values?.businessCategory}
            onBlur={() => setFieldTouched("businessCategory", true)}
            labelField="label"
            valueField="value"
            onChangeText={handleChangeCategory}
            error={
              !values?.businessCategory && touched?.businessCategory
                ? errors?.businessCategory
                : ""
            }
            onChange={() => {}}
          />
          <View>
            <Typography variant="base" weight="regular">
              Venues
            </Typography>

            {values?.venues?.map((el, i) => (
              <VenueCard
                key={i}
                venue={el}
                onDelete={() => onDelete(i)}
                onEdit={() => onEdit(i)}
              />
            ))}

            {showModal && (
              <VenueModalForm
                onClose={() => {
                  setShowModal(false);
                  setUpdateIndex(undefined);
                }}
                handleSetVenue={handleSetVenue}
                updateIndex={updateIndex}
                venues={values?.venues}
              />
            )}
            <Button
              onPress={() => setShowModal(true)}
              className="mt-3"
              title="Add Venues"
              variant="outline"
            />
          </View>
        </View>
      </View>
      <Button
        disabled={disabled}
        loading={isLoading}
        onPress={handleSubmit}
        className="mt-6 mb-4"
        title="Next"
      />
    </KeyboardAwareScrollView>
  );
};
