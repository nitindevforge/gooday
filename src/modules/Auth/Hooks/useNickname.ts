import { useFormik } from "formik";
import { NicknameFormState, nicknameValidationSchema, useGetUser, useUserOnboardingMutation } from "@app/modules";
import { Alert } from "react-native";
import { useNavigationRoute } from "@app/common";

const useNickname = () => {
  const { data } = useGetUser();
  const { mutate, isLoading } = useUserOnboardingMutation();
  const { goToRoute } = useNavigationRoute();
  const form = useFormik<NicknameFormState>({
    initialValues: {
      nickname: data?.data?.data?.nickName ?? "",
    },
    validationSchema: nicknameValidationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values,
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

export default useNickname;
