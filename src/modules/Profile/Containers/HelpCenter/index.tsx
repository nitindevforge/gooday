import React, { Fragment, useRef } from "react";
import { Alert, TextInput, View } from "react-native";
import { ProfileLayout } from "../../Components";
import { Button, Input, Loading } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHelpCenterMutation } from "../../Data";
import { useNavigation } from "@react-navigation/native";

export const HelpCenterContainer = () => {
  const tailwind = useTailwind();
  const firstNameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const { mutate, isLoading } = useHelpCenterMutation();
  const navigation = useNavigation();

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    isValid,
    dirty,
    touched,
    handleBlur,
    resetForm
  } = useFormik({
    initialValues: {
      content: "",
      firstName: "",
      lastName: "",
      email: "",
    },
    validateOnBlur: true,
    validationSchema: yup.object().shape({
      content: yup.string().required("Content is required"),
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      email: yup
        .string()
        .email("Invalid email addresss")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      mutate(values, {
        onError: () => {
          Alert.alert("Failed to update", "Something went wrong!!");
        },
        onSuccess: () => {
          resetForm();
          navigation.goBack()
        },
      });
    },
  });

  return (
    <Fragment>
      <Loading loading={isLoading} />
      <ProfileLayout header="Help Center">
        <View style={{ gap: 12, flex: 1 }}>
          <Input
            multiline
            placeholder="The Gooday team will be in touch ASAP to help solve or answer your query."
            label="What can the Gooday team help you with?"
            height={280}
            value={values.content}
            error={touched.content ? errors.content : undefined}
            onChangeText={handleChange("content")}
            returnKeyType="next"
            onBlur={handleBlur("content")}
            onSubmitEditing={() => firstNameRef.current?.focus()}
            textAlignVertical="top"
          />
          <Input
            label="First name"
            value={values.firstName}
            ref={firstNameRef}
            error={touched.firstName ? errors.firstName : undefined}
            onChangeText={handleChange("firstName")}
            returnKeyType="next"
            onBlur={handleBlur("firstName")}
            onSubmitEditing={() => lastNameRef.current?.focus()}
          />
          <Input
            label="Last name"
            value={values.lastName}
            ref={lastNameRef}
            error={touched.lastName ? errors.lastName : undefined}
            onChangeText={handleChange("lastName")}
            returnKeyType="next"
            onBlur={handleBlur("lastName")}
            onSubmitEditing={() => emailRef.current?.focus()}
          />
          <Input
            label="Contact Email"
            ref={emailRef}
            keyboardType="email-address"
            value={values.email}
            onBlur={handleBlur("email")}
            error={touched.email ? errors.email : undefined}
            onChangeText={handleChange("email")}
            returnKeyType="done"
          />
        </View>

        <View style={tailwind("mt-8 mb-8")}>
          <Button
            title="Send"
            onPress={handleSubmit}
            disabled={dirty ? !isValid : true}
          />
        </View>
      </ProfileLayout>
    </Fragment>
  );
};
