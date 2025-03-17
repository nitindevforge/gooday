import { useFormik } from "formik";
import {
  businessSignupValidationSchema,
  BottomSheet,
  BusinessSignUpFormState,
  useBusinessSignupMutation,
  setUserItem,
  getDeviceInfo,
  useDeviceMutation,
  AuthNavigationParamList,
} from "@app/modules";
import NiceModal from "@ebay/nice-modal-react";
import { storageService } from "@app/services";
import { AUTH_TYPE } from "@app/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { RootNavigationParamList } from "@app/navigation";

export const useBusinessSignUp = () => {
  const { mutate, isLoading } = useBusinessSignupMutation();
  const { mutate: deviceAdd } = useDeviceMutation();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthNavigationParamList & RootNavigationParamList>>();

  const form = useFormik<BusinessSignUpFormState>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      term1: false,
      term2: true,
      term3: true,
    },
    validationSchema: businessSignupValidationSchema,
    onSubmit: (values) => {
      mutate({
        ...values,
        gender: values?.gender ?? '',
        mobileNumber: values?.mobileNumber ? values?.countryCode + values?.mobileNumber : ''
      }, {
        onSuccess: async (response) => {
          await setUserItem(response.data.data);
          await storageService.setItem(AUTH_TYPE, "SIGNUP");
          const deviceInfo = await getDeviceInfo();
          form.resetForm();
          deviceAdd({ ...deviceInfo, version: String(deviceInfo?.version) });
          if (response?.data?.data?.user?.pendingAction?.length) {
            NiceModal.show(BottomSheet, {
              pendingActions: response?.data?.data?.user?.pendingAction,
            });
          } else {
            navigation.navigate("ON_BOARD");
          }
        },
        onError: async (error) => {
          Alert.alert("Error", error.response?.data?.message || 'Something went wrong!!');
        },
      })
    },
  });

  return { form, isLoading };
};
