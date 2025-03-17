import { useFormik } from "formik";
import {
  AuthNavigationParamList,
  MailVerificationState,
  useGetUser,
  useOtpVerifyMutation,
} from "@app/modules";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigationRoute } from "@app/common";
import { Alert } from "react-native";

const useMailVerification = (navigate: boolean) => {
  const { mutate, isLoading } = useOtpVerifyMutation();
  const { data, refetch } = useGetUser();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthNavigationParamList>>();

  let params = null;
  if (navigate) {
    params =
      useRoute<RouteProp<AuthNavigationParamList, "MAIL_VERIFICATION">>();
  }

  const { goToRoute, setPendingAction, setCurrentRoute } = useNavigationRoute();
  const form = useFormik<MailVerificationState>({
    initialValues: {
      code: "",
    },
    onSubmit: (values) => {
      mutate(
        {
          email: navigate ? params?.params?.email! : data?.data?.data?.email!,
          otp: values?.code,
        },
        {
          onSuccess: async () => {
            form?.resetForm();
            if (navigate) {
              navigation.navigate("RESET_PASSWORD", {
                email: navigate
                  ? params?.params?.email!
                  : data?.data?.data?.email!,
                role: data?.data?.data?.role!,
              });
            } else {
              const response = await refetch()
              setPendingAction(response?.data?.data?.data?.pendingAction!);
              setCurrentRoute(response?.data?.data?.data?.pendingAction?.[0]!);
            }
          },
          onError: (error) => {
            Alert.alert("Error", error.response?.data?.message || 'Something went wrong!!');
          },
        }
      );
    },
  });

  return {
    form,
    isLoading,
    email: navigate ? params?.params?.email! : data?.data?.data?.email!,
  };
};

export default useMailVerification;
