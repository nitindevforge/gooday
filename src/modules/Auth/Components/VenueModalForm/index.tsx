import {
  AutoComplete,
  AutoCompleteItem,
  Button,
  Dropdown,
  Icon,
  LoadingUi,
  Typography,
} from "@app/ui";
import React, { FC, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import {
  PhotoAccessModal,
  useEmployeesSize,
  useGetLocationCoordinatesMutation,
  usePriceRange,
  useProfileMutation,
  useProfilePictureMutation,
  useSearchLocationMutation,
  useVenue,
} from "@app/modules";
import { VenueModalFormProps } from "./type";
import { getAssetUrl, isFormValid, useDebounce } from "@app/utils";
import { Buffer } from "buffer";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { DropdownItem } from "src/ui/Dropdown/type";

export const VenueModalForm: FC<VenueModalFormProps> = ({
  onClose,
  handleSetVenue,
  updateIndex,
  venues,
}) => {
  const tailwind = useTailwind();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<string>("");
  const [update, setUpdate] = useState<boolean>(false);
  const [location, setLocation] = useState<AutoCompleteItem[]>([]);
  const [locationValue, setLocationValue] = useState<AutoCompleteItem>();
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const debounceValue = useDebounce(searchText, 300);
  const { mutateAsync: addProfile } = useProfilePictureMutation();
  const { mutateAsync: coordinatesMutate } =
    useGetLocationCoordinatesMutation();
  const { mutate: uploadImage, error } = useProfileMutation();
  const { data: priceRange } = usePriceRange();
  const { data: employeesSize } = useEmployeesSize();
  const {
    form: {
      errors,
      values,
      setFieldValue,
      touched,
      handleBlur,
      handleChange,
      setFieldTouched,
      setValues,
    },
  } = useVenue();
  const { mutate: searchLocation, isLoading } = useSearchLocationMutation();
  const disabled = isFormValid(errors, values, [
    "location.coordinates",
    "coverPhoto",
  ]);

  const onFile = (image: string, upload: string) => {
    if (image && upload) {
      setFieldValue("coverPhoto", image);
      setImageFile(upload);
    } else {
      setFieldTouched("coverPhoto", true);
    }
  };

  const handleAddVenue = async () => {
    setLoading(true);
    try {
      let coverPhoto = values.coverPhoto;
      const venue = venues?.[updateIndex!];
      let coordinates = venue?.location;
      if (imageFile && values.coverPhoto) {
        const image: string[] = values.coverPhoto?.split("/");
        const signedUrl = await addProfile({
          fileName: `${image[image?.length - 1]}`,
          bucketName: "business",
        });
        const buffer = Buffer.from(
          (imageFile || "").replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );
        await uploadImage({
          url: signedUrl?.data?.signedUrl,
          data: buffer,
        });

        coverPhoto = `/business/${image[image?.length - 1]
          }?date=${new Date().getTime()}`;
      }
      if (venue?.location?.meta?.formattedAddress !== values?.location) {
        const newCoordinates = await coordinatesMutate(locationValue!);
        coordinates = newCoordinates?.data?.data;
      }
      handleSetVenue({
        coverPhoto: [coverPhoto]!,
        priceRange: values?.priceRange!,
        location: coordinates!,
        numberOfEmployee: values?.numberOfEmployee!,
      });
      onClose();
      setLoading(false);
    } catch (error: any) {
      Alert.alert(error || "Something went wrong!!");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (venues?.[updateIndex!]) {
      setValues({
        coverPhoto: venues?.[updateIndex!]?.coverPhoto?.[0],
        priceRange: venues?.[updateIndex!]?.priceRange,
        location: venues?.[updateIndex!]?.location?.meta?.formattedAddress,
        numberOfEmployee: venues?.[updateIndex!]?.numberOfEmployee,
      });
      setUpdate(true);
    }
  }, [venues, updateIndex]);

  const venueImageUrl = useMemo(() => {
    if (values?.coverPhoto?.includes("business")) {
      return getAssetUrl(values?.coverPhoto);
    } else {
      return values?.coverPhoto;
    }
  }, [values?.coverPhoto])

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
    setLocationValue(undefined);
    if (value) {
      const locationLabel = location?.find((el) => el?.value === value);
      setSearchText(locationLabel?.label || value);
      handleChange("location")(locationLabel?.label || value);
      setLocation([]);
      if (locationLabel) setLocationValue(locationLabel);
    } else {
      setSearchText("");
      handleChange("location")("");
    }
  };

  const priceRangeOptions = useMemo(() => {
    return (
      priceRange?.data?.data?.map((el) => ({
        ...el,
        label: el.title,
      })) ?? []
    );
  }, [priceRange]);

  const employeesOptions = useMemo(() => {
    return (
      employeesSize?.data?.data?.map((el) => ({
        ...el,
        label: el.title,
      })) ?? []
    );
  }, [employeesSize]);

  return (
    <>
      <Modal
        animationType="slide"
        visible={true}
        presentationStyle="fullScreen"
      >
        <SafeAreaView style={tailwind("flex-1")}>
          <View style={tailwind("flex-1 pb-4 px-6 pt-4")}>
            <View style={tailwind("flex-row items-center")}>
              <TouchableOpacity onPress={onClose}>
                <Icon name="back" height={20} width={20} />
              </TouchableOpacity>
              <Typography
                weight="medium"
                variant="2xl"
                className="leading-7 ml-4"
              >
                {update ? "Update" : "Add"} venue
              </Typography>
            </View>
            <KeyboardAwareScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              style={tailwind("flex-1")}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={tailwind("flex-1 mt-4")}>
                <View style={[{ rowGap: 15 }, tailwind("flex-col")]}>
                  <View>
                    <Typography variant="base" weight="regular">
                      {update ? "Update" : "Add"} a cover photo
                    </Typography>
                    <TouchableOpacity
                      onPress={() => setShowModal(true)}
                      activeOpacity={0.7}
                      style={tailwind(
                        "items-center justify-center h-28 rounded-2xl bg-gray-700 mt-2"
                      )}
                    >
                      {values?.coverPhoto ? (
                        <Image
                          source={{
                            uri: venueImageUrl,
                          }}
                          resizeMode="cover"
                          style={tailwind("h-28 w-full rounded-2xl")}
                        />
                      ) : (
                        <Icon name="image-add" height={40} width={45} />
                      )}
                    </TouchableOpacity>
                    {errors?.coverPhoto && touched?.coverPhoto && (
                      <Typography
                        variant="sm"
                        weight="regular"
                        color="error"
                        className="mt-1"
                      >
                        Cover photo {errors?.coverPhoto}
                      </Typography>
                    )}

                    <PhotoAccessModal
                      onFile={onFile}
                      hide={() => setShowModal(false)}
                      visible={showModal}
                    />
                  </View>
                  <View>
                    <Dropdown
                      data={priceRangeOptions}
                      label="Estimated price range"
                      placeholder="Select from options"
                      onChangeText={handleChange("priceRange")}
                      selected={values?.priceRange!}
                      labelField="label"
                      valueField="value"
                      onBlur={() => setFieldTouched('priceRange', true)}
                      error={
                        !values?.priceRange && touched?.priceRange
                          ? errors?.priceRange
                          : ""
                      }
                      onChange={() => { }}
                    />
                  </View>
                  <View>
                    <Dropdown
                      data={employeesOptions}
                      label="Employees Size"
                      placeholder="Select from options"
                      onChangeText={handleChange("numberOfEmployee")}
                      onBlur={() => setFieldTouched('numberOfEmployee', true)}
                      labelField="label"
                      valueField="value"
                      selected={values?.priceRange!}
                      error={!values?.numberOfEmployee && touched?.numberOfEmployee
                        ? errors?.numberOfEmployee
                        : ""}
                      onChange={() => { }}
                    />
                  </View>
                  <View>
                    <AutoComplete
                      data={searchText ? location : []}
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
                </View>
              </View>
              <View style={tailwind("mt-8")}>
                <Button
                  disabled={disabled || !locationValue?.label}
                  onPress={handleAddVenue}
                  title={update ? "Update" : "Add"}
                />
              </View>
            </KeyboardAwareScrollView>
          </View>
        </SafeAreaView>
        <LoadingUi loading={loading} />
      </Modal>
    </>
  );
};
