import { useFormik } from "formik";
import {
  forgotPasswordValidationSchema,
  AuthNavigationParamList,
  ForgotPasswordFormState,
  useForgotPasswordMutation,
} from "@app/modules";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert } from "react-native";

export const useForgotPassword = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthNavigationParamList>>();
  const { mutate, isLoading } = useForgotPasswordMutation();
  const form = useFormik<ForgotPasswordFormState>({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess() {
          form?.resetForm();
          navigation.navigate("MAIL_VERIFICATION", { email: values?.email });
        },
        onError: async (error) => {
          Alert.alert("Error", error.response?.data?.message || 'Something went wrong!!');
        },
      });
    },
  });

  return { form, isLoading };
};
