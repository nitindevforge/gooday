import { Button, Input, Loading } from "@app/ui";
import { useFormik } from "formik";
import React, { Fragment } from "react";
import * as yup from "yup";
import { ProfileLayout } from "../../Components";
import { Alert, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useFeedbackMutation } from "../../Data";
import { useNavigation } from "@react-navigation/native";

export const FeedbackContainer = () => {
  const tailwind = useTailwind();
  const { mutate, isLoading } = useFeedbackMutation();
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
    }),
    onSubmit: (values) => {
      mutate(values, {
        onError: (err) => {
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
      <ProfileLayout header="Feedback">
        <View style={[{ gap: 12 }, tailwind("flex-1")]}>
          <Input
            multiline
            placeholder="Please be detailed in your feedback! All feedback is welcomed and will remain confidential.  "
            label="What is your feedback?"
            height={280}
            value={values.content}
            error={touched.content ? errors.content : undefined}
            onChangeText={handleChange("content")}
            returnKeyType="done"
            textAlignVertical="top"
            onBlur={handleBlur("content")}
          />
        </View>

        <View style={tailwind("mt-8")}>
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
