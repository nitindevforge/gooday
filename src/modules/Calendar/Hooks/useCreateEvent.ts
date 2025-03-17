import { useFormik } from "formik";
import { createEventValidationSchema } from "../Utils";
import { CreateEventPayloadDTO } from "@gooday_corp/gooday-api-client";
import {
  CreateEventModal,
  useCreateEventMutation,
  useEditEventMutation,
  useGetLocationCoordinatesMutation,
  useGetUser,
  useProfileMutation,
  useProfilePictureMutation,
} from "@app/modules";
import NiceModal from "@ebay/nice-modal-react";
import { useCalendar } from "@app/common";
import { Alert } from "react-native";
import { Buffer } from "buffer";
import { getFormattedDate } from "@app/utils";
import moment from "moment";

type FormikCreateEventState = {
  people: number;
  type: "create" | "edit";
  upload?: string[];
} & CreateEventPayloadDTO;

export const useCreateEvent = (cb: () => void = () => { }, rowData?: any) => {
  const { calendar } = useCalendar();
  const { data: userData } = useGetUser();
  const { mutate: createEvent, isLoading: isCreating } =
    useCreateEventMutation();
  const { mutate: editEvent, isLoading: isEditing } = useEditEventMutation();
  const { mutateAsync: uploadProfilePicture } = useProfilePictureMutation();
  const { mutateAsync: uploadImageToServer } = useProfileMutation();
  const { mutateAsync: fetchCoordinates } = useGetLocationCoordinatesMutation();

  const uploadImages = async (uploads: string[], imagePaths: string[]) => {
    const uploadedImages: string[] = [];
    for (let i = 0; i < uploads.length; i++) {
      const upload = uploads[i];
      const imagePath = imagePaths[i];
      const fileName = imagePath.split("/").pop();
      try {
        const { data: uploadInfo } = await uploadProfilePicture({
          fileName: fileName!,
          bucketName: "event",
        });

        const buffer = Buffer.from(
          upload.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );

        await uploadImageToServer({
          url: uploadInfo.signedUrl,
          data: buffer,
        });

        uploadedImages.push(`event/${fileName}`);
      } catch (error) {
        Alert.alert("Error", `Failed to upload image: ${fileName}`);
      }
    }
    return uploadedImages;
  };

  const getCoordinates = async (locationValue: any, locationName: string) => {
    if (!locationValue) {
      return {
        type: "Point",
        coordinates: [],
        meta: {
          formattedAddress: locationName,
          shortFormattedAddress: locationName,
        },
      };
    }

    const { data: response } = await fetchCoordinates(locationValue);
    return response?.data || {};
  };

  const form = useFormik<FormikCreateEventState>({
    initialValues: {
      title: rowData?.title || "",
      startDate: rowData?.startDate || "",
      endDate: rowData?.endDate || "",
      note: rowData?.note || "",
      calendar: rowData?.calendar || [],
      people: rowData?.people || 0,
      collaborators: rowData?.collaborators || [],
      type: rowData ? "edit" : "create",
      location: rowData?.location || null,
      images: rowData?.images || [],
      upload: [],
      from: "",
      to: "",
      repeat: "NONE",
    },
    enableReinitialize: true,
    validationSchema: createEventValidationSchema,
    onSubmit: async (values) => {
      try {
        const existingImages = rowData?.images || [];
        const newImages = values?.images?.filter(
          (image: string) => !existingImages.includes(image)
        );

        const uploadedImages =
          newImages.length > 0
            ? await uploadImages(values.upload!, newImages)
            : [];

        const allImages = [...existingImages, ...uploadedImages];

        const coordinates =
          values.location &&
            values.locationValue?.meta?.formattedAddress !== values.location
            ? await getCoordinates(values.locationValue, values.location)
            : values.locationValue;

        const calendarId = calendar?._id || userData?.data?.data?.calendar;

        const payload: CreateEventPayloadDTO = {
          ...values,
          location: coordinates,
          calendar: values.calendar.length ? values.calendar : [calendarId],
          images: allImages,
          from: getFormattedDate('HH:mm', values.from),
          to: getFormattedDate('HH:mm', values.to),
        };

        const mutate = values.type === "edit" ? editEvent : createEvent;

        mutate(payload, {
          onSuccess: () => {
            form.resetForm();
            cb();
            NiceModal.hide(CreateEventModal);
          },
          onError: (error) => {
            const message =
              error.response?.data?.message || "Something went wrong!";
            Alert.alert("Error", message);
          },
        });
      } catch (error) {
        Alert.alert("Error", "An unexpected error occurred.");
      }
    },
  });

  return { form, isLoading: isCreating || isEditing };
};
