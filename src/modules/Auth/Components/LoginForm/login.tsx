import React, { useRef } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { Button, Input, PasswordInput, Typography } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  AuthNavigationParamList,
  AuthOptionButtons,
  InputFieldValue,
  LoginFormProps,
  Role,
} from "@app/modules";
import { isFormValid } from "@app/utils";

export const LoginForm: React.FC<LoginFormProps> = ({
  form: { handleChange, handleBlur, values, handleSubmit, errors, touched },
  isLoading,
}) => {
  const tailwind = useTailwind();
  const inputRef = useRef<TextInput>(null);
  const { params } = useRoute<RouteProp<AuthNavigationParamList, "LOGIN">>();
  const disabled = isFormValid(errors, values);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthNavigationParamList>>();

  const inputField: InputFieldValue[] = [
    {
      type: "text",
      name: "email",
      label: "Email",
      placeholder: "example@gmail.com",
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Must be 8 characters and contain a ‘#!~@?’ ",
    },
  ];

  const onNavigate = () => {
    if (params?.role === Role.BUSINESS) {
      navigation.navigate("BUSINESS_SIGN_UP", { role: params?.role });
    } else {
      navigation.navigate("SIGN_UP", { role: params?.role });
    }
  };

  return (
    <View style={tailwind("flex-1")}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={tailwind("flex-1")}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ ...tailwind("mt-4 flex-1"), rowGap: 10 }}>
          {inputField?.map((field) => {
            const { name, label, placeholder, type } = field;
            return (
              <React.Fragment key={name}>
                {type === "password" ? (
                  <PasswordInput
                    onChangeText={handleChange(name)}
                    onBlur={handleBlur(name)}
                    value={values[name]}
                    label={label}
                    placeholder={placeholder}
                    error={errors[name] && touched[name] ? errors[name] : ""}
                    ref={inputRef}
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit}
                  />
                ) : (
                  <Input
                    onChangeText={handleChange(name)}
                    onBlur={handleBlur(name)}
                    value={values[name]}
                    label={label}
                    placeholder={placeholder}
                    error={errors[name] && touched[name] ? errors[name] : ""}
                    returnKeyType="next"
                    keyboardType="email-address"
                    onSubmitEditing={() => inputRef.current?.focus()}
                  />
                )}
              </React.Fragment>
            );
          })}
          <TouchableOpacity
            onPress={() => navigation.navigate("FORGOT_PASSWORD")}
            activeOpacity={0.7}
            style={{
              ...tailwind("flex-row justify-center"),
            }}
          >
            <Typography color="gray-400">Forgot Password?</Typography>
          </TouchableOpacity>

          <View style={tailwind("flex-row justify-center items-center my-2")}>
            <View
              style={[tailwind("w-40 bg-gray-500 mr-2"), { height: 0.5 }]}
            />
            <Typography color="gray-400">or</Typography>
            <View
              style={[tailwind("w-40 bg-gray-500 ml-2"), { height: 0.5 }]}
            />
          </View>
          <AuthOptionButtons outline mail={false} />
        </View>

        <View style={tailwind("mb-4")}>
          <TouchableOpacity
            onPress={onNavigate}
            activeOpacity={0.7}
            style={{
              gap: 6,
              ...tailwind("mt-10 flex-row items-center justify-center"),
            }}
          >
            <Typography color="gray-400">Don't have an Account?</Typography>
            <Typography className="underline"> Create an account</Typography>
          </TouchableOpacity>
          <Button
            loading={isLoading}
            disabled={disabled}
            onPress={handleSubmit}
            className="mt-6"
            title="Next"
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
