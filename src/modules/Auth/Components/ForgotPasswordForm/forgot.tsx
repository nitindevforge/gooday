import React from "react";
import { ForgotPasswordFormProps } from "@app/modules";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Button, Input, Typography } from "@app/ui";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { isFormValid } from "@app/utils";

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  form: { handleChange, values, handleSubmit, errors, touched, handleBlur },
  isLoading,
}) => {
  const tailwind = useTailwind();
  const disabled = isFormValid(errors,values);
  
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={tailwind("flex-1")}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    > 
      <View style={{ ...tailwind("flex-1"), gap: 18}}>
        <View style={{gap: 12}}>
          <Typography variant="sm" color="black" weight="extralight">Enter your email and we’ll send you a link to get back into your account.</Typography>
          <Input
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values?.email}
            placeholder="Email"
            placeholderTextColor="#AEAEAE"
            returnKeyType="done"
            keyboardType="email-address"
            error={errors?.email ? errors?.email : ''}
            onSubmitEditing={handleSubmit}
          />
        </View>
        <Button
          loading={isLoading}
          disabled={disabled}
          onPress={handleSubmit}
          title="Send Email"
          className="mt-4 mb-8"
        />
      </View>
    </KeyboardAwareScrollView >
  );
};
