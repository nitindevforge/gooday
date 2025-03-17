import { useFormik } from "formik";
import React, { Fragment, useRef } from "react";
import { useTailwind } from "tailwind-rn";
import { ProfileLayout } from "../../Components";
import { Button, Loading, PasswordInput } from "@app/ui";
import { Alert, TextInput, View } from "react-native";
import * as yup from "yup";
import { passwordField, useResetPasswordMutation } from "@app/modules";
import { useNavigation } from "@react-navigation/native";

export const ChangePasswordContainer = () => {
  const { mutate, isLoading } = useResetPasswordMutation();
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const newPasswordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const { values, handleChange, handleSubmit, errors, touched,resetForm } = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object().shape({
      oldPassword: passwordField(yup),
      password: passwordField(yup),
      confirmPassword: passwordField(yup, true),
    }),
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: false,
    onSubmit: async (values) => {
      mutate(
        {
          currentPasword: values.oldPassword,
          newPassword: values.password,
        },
        {
          onSuccess: () => {
            resetForm();
            navigation.goBack();
          },
          onError: (err) => {
            Alert.alert(
              "Gooday",
              err?.response?.data?.message || "Something went wrong!!"
            );
          },
        }
      );
    },
  });

  return (
    <Fragment>
      <Loading loading={isLoading} />
      <ProfileLayout header="Change password">
        <View style={{ gap: 26 }}>
          <PasswordInput
            placeholder="Current password"
            value={values.oldPassword}
            onChangeText={handleChange("oldPassword")}
            onSubmitEditing={() => newPasswordRef.current?.focus()}
            returnKeyLabel="Next"
            returnKeyType="next"
            error={touched.oldPassword ? errors.oldPassword : undefined}
          />
          <PasswordInput
            placeholder="New password"
            value={values.password}
            onChangeText={handleChange("password")}
            ref={newPasswordRef}
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            returnKeyLabel="Next"
            returnKeyType="next"
            error={touched.password ? errors.password : undefined}
          />
          <PasswordInput
            placeholder="Confirm new password"
            value={values.confirmPassword}
            ref={confirmPasswordRef}
            error={
              touched?.confirmPassword ? errors.confirmPassword : undefined
            }
            onChangeText={handleChange("confirmPassword")}
          />
        </View>
        <View style={tailwind("mt-20")}>
          <Button
            title="Change password"
            onPress={handleSubmit}
            disabled={isLoading}
          />
        </View>
      </ProfileLayout>
    </Fragment>
  );
};
