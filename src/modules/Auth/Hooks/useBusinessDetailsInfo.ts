import { useFormik } from "formik";
import {
  BusinessDetailsInfoFormState,
  businessDetailsInfoValidationSchema,
  useBusinessMe,
  useBusinessOnboardingMutation,
} from "@app/modules";
import { useNavigationRoute } from "@app/common";
import { Alert } from "react-native";

export const useBusinessDetailsInfo = () => {
  const { data } = useBusinessMe();
  const { mutate, isLoading } = useBusinessOnboardingMutation();
  const { goToRoute } = useNavigationRoute();

  const {
    businessCategory,
    businessType = "",
    businessCountry = "",
    businessID = "",
    venues,
    name
  } = data?.data?.data || {};

  const form = useFormik<BusinessDetailsInfoFormState>({
    initialValues: {
      name,
      businessCategory: businessCategory?._id!,
      businessCountry,
      businessID,
      businessIDVerified: businessID ? true : false,
      businessType: businessType?._id,
      venues: venues!,
      businessTypeLabel: businessType?.name ?? '',
      businessCategoryLabel: businessCategory?.name ?? '',
    },
    validationSchema: businessDetailsInfoValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      mutate(values, {
        onSuccess: (response) => {
          form?.resetForm();
          goToRoute();
        },
        onError: async (error) => {
          Alert.alert("Error", error.response?.data?.message || 'Something went wrong!!');
        },
      });
    },
  });

  return { form, isLoading };
};
