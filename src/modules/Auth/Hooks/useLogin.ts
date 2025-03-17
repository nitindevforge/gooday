import { useFormik } from "formik";
import {
  LoginFormState,
  useLoginMutation,
  loginValidationSchema,
  BottomSheet,
  getDeviceInfo,
  useDeviceMutation,
  setUserItem,
} from "@app/modules";
import { Alert } from "react-native";
import NiceModal from "@ebay/nice-modal-react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootNavigationParamList } from "@app/navigation";
import { getBriefing } from "@app/utils";

const useLogin = () => {
  const { mutate: deviceAdd } = useDeviceMutation();
  const { mutate, isLoading } = useLoginMutation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootNavigationParamList>>();
  const form = useFormik<LoginFormState>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      mutate(values, {
        onSuccess: async (response) => {
          await setUserItem(response.data.data);
          const deviceInfo = await getDeviceInfo();
          form.resetForm();
          deviceAdd({ ...deviceInfo, version: String(deviceInfo?.version) });
          // const briefing = await getBriefing();
          if (response?.data?.data?.user?.pendingAction?.length) {
            NiceModal.show(BottomSheet, {
              pendingActions: response?.data?.data?.user?.pendingAction,
            });
          } else {
            // briefing ? navigation.replace("DAILY_BRIEFING_CHAT") : navigation.replace("APP");
            if (response?.data?.data?.user?.role === 'business') {
              navigation.replace("APP", {
                screen: "HOME",
                params: {
                  screen: "BUSINESS_HOME"
                }
              } as any);
            } else {
              navigation.replace("APP");
            }
          }
        },
        onError: (error) => {
          Alert.alert("", error.response?.data?.message || 'Something went wrong!!');
        },
      });
    },
  });

  return { form, isLoading };
};

export default useLogin;
