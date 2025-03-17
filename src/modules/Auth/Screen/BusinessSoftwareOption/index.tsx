import { Button } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import {
  AuthDefaultLayout,
  AuthNavigationParamList,
  UserRole,
} from "@app/modules";
import { View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const BusinessSoftwareOptionScreen = () => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthNavigationParamList>>();
  const { params } =
    useRoute<
      RouteProp<
        AuthNavigationParamList,
        "AUTH_OPTIONS" | "BUSINESS_SOFTWARE_OPTION"
      >
    >();
  return (
    <AuthDefaultLayout
      header=" "
      backgroundImage={require("../../../../assets/Images/business-full-bg.png")}
      hideProgress
      back
      className="bg-primary-100"
    >
      <UserRole />
      <View style={tailwind("flex-1 justify-end mb-10")}>
        <Button
          onPress={() =>
            navigation.navigate("BUSINESS_SOFTWARE_SELECTION", {
              role: params?.role,
            })
          }
          title="I have a booking software"
        />
        <Button
          className="mt-4"
          onPress={() =>
            navigation.navigate("BUSINESS_SIGN_UP", { role: params?.role })
          }
          title="I do not have a booking software"
        />
      </View>
    </AuthDefaultLayout>
  );
};
