import { useFormik } from "formik";
import { useGetUser, useUserOnboardingMutation } from "../Data";
import { Alert } from "react-native";
import { AvatarOptionsState } from "@app/modules";

interface UseAvatarProps {
  onSuccess: () => void;
}

const useAvatar = ({ onSuccess }: UseAvatarProps) => {
  const { data } = useGetUser();
  const { mutate, isLoading } = useUserOnboardingMutation();

  const form = useFormik<AvatarOptionsState>({
    initialValues: {
      avatar: data?.data?.data?.assistant ?? "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(
        {
          assistant: values?.avatar,
        },
        {
          onSuccess: () => {
            form?.resetForm();
            onSuccess();
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

export default useAvatar;
