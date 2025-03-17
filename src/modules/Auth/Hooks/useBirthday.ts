import { useFormik } from "formik";
import {
  BirthdayFormState,
  useGetUser,
  useUserOnboardingMutation,
} from "@app/modules";
import { Alert } from "react-native";
import { useNavigationRoute } from "@app/common";
import moment from "moment";

const useBirthday = () => {
  const { data } = useGetUser();
  const { mutate, isLoading } = useUserOnboardingMutation();
  const { goToRoute } = useNavigationRoute();

  const form = useFormik<BirthdayFormState>({
    initialValues: {
      date: data?.data?.data?.dob ? new Date(data?.data?.data?.dob)?.toLocaleDateString() : '',
    },
    onSubmit: (values) => {
      const date = moment(values.date, 'DD/MM/YYYY').utc(true)
      mutate(
        {
          dob: date,
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

export default useBirthday;
