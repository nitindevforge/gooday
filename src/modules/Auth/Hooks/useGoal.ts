import { useFormik } from "formik";
import {
  GoalFormState,
  useGetUser,
  useUserOnboardingMutation,
} from "@app/modules";
import { Alert } from "react-native";
import { useNavigationRoute } from "@app/common";

const useGoal = () => {
  const { data } = useGetUser();
  const { mutate, isLoading } = useUserOnboardingMutation();
  const { goToRoute } = useNavigationRoute();

  const form = useFormik<GoalFormState>({
    initialValues: {
      goal: data?.data?.data?.goals ?? [],
      other: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(
        {
          goals: values?.other ? [...values?.goal, values.other] : values?.goal,
        },
        {
          onSuccess: () => {
            form?.resetForm();
            goToRoute()
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

export default useGoal;
