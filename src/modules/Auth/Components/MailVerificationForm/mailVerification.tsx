import React, { useEffect, useState } from "react";
import { Button, Typography } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { MailVerificationFormProps } from "./type";
import { TouchableOpacity, View } from "react-native";
import { CodeField, Cursor } from "react-native-confirmation-code-field";
import clsx from "clsx";
import { useOtpResentMutation } from "@app/modules";

const MailVerificationForm: React.FC<MailVerificationFormProps> = ({
  form: { values, handleSubmit, setFieldValue, handleChange },
  isLoading,
  email
}) => {
  const [resend, setResend] = useState<Boolean>(false);
  const tailwind = useTailwind();
  const inputCount = 4;
  const { mutate } = useOtpResentMutation()

  useEffect(() => {
    setTimeout(() => {
      setResend(false);
    }, 1000 * 30);
  }, [resend]);

  const OtpResent = () => {
    mutate({ email: email! });
    setResend(true);
    setFieldValue("code", "");
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={tailwind("flex-1")}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ ...tailwind("flex-1 mt-20") }}>
        <Typography className="text-center" weight="semibold">
          Verification Code
        </Typography>
        <Typography
          className="text-center text-[13px] leading-5 mt-2"
          color="gray-500"
        >
          {`Almost there! Please check your email and \nenter the 4 digit code sent to you.`}
        </Typography>
        <CodeField
          rootStyle={[tailwind("my-4 mx-auto"), { gap: 8 }]}
          value={values.code}
          onChangeText={handleChange("code")}
          cellCount={inputCount}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              key={index}
              style={{
                borderWidth: 1,
                ...tailwind(
                  clsx(
                    "w-13 h-18 rounded-xl flex items-center justify-center border-gray-600",
                    {
                      "border-gray-200": symbol,
                    }
                  )
                ),
              }}
            >
              <Typography
                className=""
                variant="2xl"
                weight="extralight"
                color={symbol ? "black" : "gray-500"}
                key={index}
              >
                {symbol || (isFocused ? <Cursor /> : "X")}
              </Typography>
            </View>
          )}
        />
        <View style={tailwind("flex-row justify-center items-center")}>
          <Typography className="text-center text-[13px]">
            {resend ? "Code Sent!" : " Didn’t receive the code? "}
          </Typography>
          {!resend && (
            <TouchableOpacity
              onPress={OtpResent}
            >
              <Typography className="text-center text-[13px] underline">
                Resend
              </Typography>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Button
        loading={isLoading}
        disabled={values.code?.length !== inputCount}
        onPress={handleSubmit}
        className="my-4"
        title="Next"
      />
    </KeyboardAwareScrollView>
  );
};

export default MailVerificationForm;
