import { useFormik } from "formik";
import {
  signupValidationSchema,
  useUserSignupMutation,
  SignUpFormState,
  BottomSheet,
  getDeviceInfo,
  useDeviceMutation,
  setUserItem,
  useProfilePictureMutation,
  useUserOnboardingMutation,
  useProfileMutation,
} from "@app/modules";
import { Alert } from "react-native";
import NiceModal from "@ebay/nice-modal-react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationParamList } from "@app/navigation";
import { Buffer } from "buffer";
import { getBriefing } from "@app/utils";

const useSignUp = () => {
  const { mutate: deviceAdd } = useDeviceMutation();
  const { mutate, isLoading } = useUserSignupMutation();
  const { mutate: addProfile } = useProfilePictureMutation();
  const { mutate: onBoardProfile } = useUserOnboardingMutation();
  const { mutate: uploadImage } = useProfileMutation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootNavigationParamList>>();

  const form = useFormik<SignUpFormState>({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "",
      mobileNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      term1: false,
      term2: true,
      term3: true,
    },
    validationSchema: signupValidationSchema,
    onSubmit: async (values) => {
      mutate(
        {
          email: values?.email,
          firstName: values?.firstName,
          lastName: values?.lastName,
          password: values?.password,
          gender: values?.gender ?? "",
          mobileNumber: values?.mobileNumber
            ? values?.countryCode + values?.mobileNumber
            : "",
        },
        {
          onSuccess: async (response) => {
            await setUserItem(response.data.data);
            const deviceInfo = await getDeviceInfo();
            form.resetForm();
            deviceAdd({ ...deviceInfo, version: String(deviceInfo?.version) });
            if (values?.upload) {
              addProfile(
                {
                  fileName: `${response.data.data?.user?._id}.png`,
                  bucketName: "users",
                },
                {
                  onSuccess: (res) => {
                    const buffer = Buffer.from(
                      (values?.upload || "").replace(
                        /^data:image\/\w+;base64,/,
                        ""
                      ),
                      "base64"
                    );
                    uploadImage(
                      {
                        url: res?.data.signedUrl,
                        data: buffer,
                      },
                      {
                        onSuccess: () => {
                          onBoardProfile({
                            profile: `users/${response.data.data?.user?._id
                              }.png?date=${new Date()?.getTime()}`,
                          });
                        },
                      }
                    );
                  },
                }
              );
            }
            form?.resetForm();
            // const briefing = await getBriefing();
            if (response?.data?.data?.user?.pendingAction?.length) {
              NiceModal.show(BottomSheet, {
                pendingActions: response?.data?.data?.user?.pendingAction,
              });
            } else {
              // briefing ? navigation.replace("DAILY_BRIEFING_CHAT") : navigation.replace("APP");
              navigation.replace("APP");
            }
          },
          onError: async (error) => {
            Alert.alert(
              "Error",
              error.response?.data?.message || "Something went wrong!!"
            );
          },
        }
      );
    },
  });

  return { form, isLoading };
};

export default useSignUp;
