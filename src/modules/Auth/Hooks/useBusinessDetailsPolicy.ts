import { useFormik } from "formik";
import {
  businessDetailsPoliciesValidationSchema,
  BusinessDetailsPolicyFormState,
  useBusinessMe,
  useBusinessOnboardingMutation,
} from "@app/modules";
import { useNavigationRoute } from "@app/common";
import { Alert } from "react-native";

export const useBusinessDetailsPolicy = () => {
  const { data } = useBusinessMe();
  const { mutate, isLoading } = useBusinessOnboardingMutation();
  const { goToRoute } = useNavigationRoute();

  const form = useFormik<BusinessDetailsPolicyFormState>({
    initialValues: {
      policies: data?.data?.data?.policies ?? '',
      cancellationFee: data?.data?.data?.cancellationFee
    },
    enableReinitialize: true,
    validationSchema: businessDetailsPoliciesValidationSchema,
    onSubmit: async (values) => {
      mutate({
        ...values,
        cancellationFee: values?.cancellationFee ?? 0
      },
        {
          onSuccess: () => {
            form?.resetForm();
            goToRoute();
          },
          onError: async (error) => {
            Alert.alert("Error", error.response?.data?.message || 'Something went wrong!!');
          },
        }
      );
    },
  });

  return { form, isLoading };
};