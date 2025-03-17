import { useFormik } from "formik";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AuthNavigationParamList, RoleFormState } from "@app/modules";

const useRole = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthNavigationParamList>>();
  const { params } = useRoute<RouteProp<AuthNavigationParamList, "ROLE">>();

  const form = useFormik<RoleFormState>({
    initialValues: {
      role: "",
    },
    onSubmit: (values) => {
      form?.resetForm();
      if (params.authType === "SIGNIN") {
        navigation.navigate("LOGIN", {
          role: values?.role,
        });
      } else {
        navigation.navigate("AUTH_OPTIONS", {
          role: values?.role,
          authType: params.authType,
        });
      }
    },
  });

  return { form };
};

export default useRole;
