import React, { useRef } from "react";
import { ResetPasswordFormProps } from "@app/modules";
import { TextInput, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Button, Input, PasswordInput, Typography } from "@app/ui";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { isFormValid } from "@app/utils";

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  form: { handleChange, values, handleSubmit, touched, handleBlur, errors },
  isLoading,
}) => {
  const tailwind = useTailwind();
  const inputRef = useRef<TextInput>(null);
  const disabled = isFormValid(errors,values);
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={tailwind("flex-1")}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ ...tailwind("flex-1")}}>
        <View style={{ gap: 12 }}>
          <Typography variant="sm" color="black" weight="extralight">Your new password must be different from previous used passwords.</Typography>
          <PasswordInput
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values?.password}
            label='Password'
            placeholder='Must be 8 characters and contain a ‘#!~@?’ '
            error={errors?.password && touched?.password ? errors?.password : ""}
            returnKeyType="next"
            onSubmitEditing={() => inputRef?.current?.focus()}
          />

          <PasswordInput
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            value={values?.confirmPassword}
            label='Confirm Password'
            placeholder='Repeat your password'
            error={errors?.confirmPassword && touched?.confirmPassword ? errors?.confirmPassword : ""}
            ref={inputRef}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />

        </View>
        <Button
          loading={isLoading}
          disabled={disabled}
          onPress={handleSubmit}
          title="Reset Password"
          className="mt-8 mb-8"
        />
      </View>
    </KeyboardAwareScrollView >
  );
};
