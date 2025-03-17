import { useFormik } from "formik";
import {
  resetPasswordValidationSchema,
  AuthNavigationParamList,
  ResetPasswordFormState,
  useNewPasswordMutation,
} from "@app/modules";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert } from "react-native";
import { useNavigationRoute } from "@app/common";

export const useResetPassword = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthNavigationParamList>>();
  const { params } =
    useRoute<RouteProp<AuthNavigationParamList, "RESET_PASSWORD">>();
  const { mutate, isLoading } = useNewPasswordMutation();
  const { setLoading } = useNavigationRoute();
  const form = useFormik<ResetPasswordFormState>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordValidationSchema,
    onSubmit: (values) => {
      mutate(
        {
          email: params?.email,
          password: values?.password,
        },
        {
          onSuccess() {
            form?.resetForm();
            setLoading(false);
            navigation.replace("LOGIN", { role: params?.role });
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
