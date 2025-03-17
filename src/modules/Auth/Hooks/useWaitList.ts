import { useFormik } from "formik";
import {
  HomeNavigationParamList,
  useWaitListMutation,
  waitListValidationSchema,
} from "@app/modules";
import { WaitListState } from "../Components/WaitListForm/type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Alert } from "react-native";

export const useWaitList = () => {
  const { mutate, isLoading } = useWaitListMutation();
  const { params } = useRoute<RouteProp<HomeNavigationParamList, "WAITLIST">>();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();
  const form = useFormik<WaitListState>({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      name: params.name ?? "",
    },
    enableReinitialize: true,
    validationSchema: waitListValidationSchema,
    onSubmit: (values) => {
      mutate(
        {
          businessName: params.name,
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
        },
        {
          onSuccess: () => {
            form?.resetForm();
            navigation?.navigate("HOMEPAGE");
          },
          onError: () => {
            Alert.alert("Gooday", "Something went wrong!!");
          },
        }
      );
    },
  });

  return { form, isLoading: isLoading };
};
