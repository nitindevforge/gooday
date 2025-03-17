import { useFormik } from "formik";
import {
  businessDetailsValidationSchema,
  BusinessDetailsFormState,
  useBusinessMe,
  useBusinessTimingMutation,
} from "@app/modules";
import { useNavigationRoute } from "@app/common";
import { Alert } from "react-native";
import { BusinessVenueTimingPayload } from "@gooday_corp/gooday-api-client";

export const useBusinessDetails = () => {
  const { data } = useBusinessMe();
  const { mutate, isLoading } = useBusinessTimingMutation();
  const { goToRoute } = useNavigationRoute();

  const form = useFormik<BusinessDetailsFormState>({
    initialValues: {
      timing: data?.data?.data?.venues?.[0]?.timing ?? [
        {
          time: [
            {
              openAt: "",
              closeAt: "",
              finalBookingTime: ""
            },
          ],
          day: "Monday",
          isClose: false,
        },
        {
          time: [
            {
              openAt: "",
              closeAt: "",
              finalBookingTime: ""
            },
          ],
          day: "Tuesday",
          isClose: false,
        },
        {
          time: [
            {
              openAt: "",
              closeAt: "",
              finalBookingTime: ""
            },
          ],
          day: "Wednesday",
          isClose: false,
        },
        {
          time: [
            {
              openAt: "",
              closeAt: "",
              finalBookingTime: ""
            },
          ],
          day: "Thursday",
          isClose: false,
        },
        {
          time: [
            {
              openAt: "",
              closeAt: "",
              finalBookingTime: ""
            },
          ],
          day: "Friday",
          isClose: false,
        },
        {
          time: [
            {
              openAt: "",
              closeAt: "",
              finalBookingTime: ""
            },
          ],
          day: "Saturday",
          isClose: false,
        },
        {
          time: [
            {
              openAt: "",
              closeAt: "",
              finalBookingTime: ""
            },
          ],
          day: "Sunday",
          isClose: false,
        },
      ],
    },
    validationSchema: businessDetailsValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      onSubmitDetails(values);
    },
  });

  const onSubmitDetails = (payload: BusinessVenueTimingPayload) => {
    mutate(payload, {
      onSuccess: (res) => {
        form?.resetForm();
        goToRoute();
      },
      onError: async (error) => {
        Alert.alert(
          "Error",
          error.response?.data?.message || "Something went wrong!!"
        );
      },
    });
  };

  return { form, isLoading, onSubmitDetails };
};
