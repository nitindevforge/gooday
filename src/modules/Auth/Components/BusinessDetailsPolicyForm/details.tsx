import React from "react";
import { BusinessDetailsPolicyFormProps } from "@app/modules";
import {
  Keyboard,
  Linking,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, Input, Typography } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import config from "@app/config";

export const BusinessDetailsPolicyForm: React.FC<
  BusinessDetailsPolicyFormProps
> = ({
  form: { handleChange, values, handleSubmit, handleBlur, errors, touched },
  isLoading,
}) => {
  const tailwind = useTailwind();

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={tailwind("flex-1")}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={tailwind("flex-1")}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={tailwind("flex-1")}>
          <View style={{ ...tailwind("pt-4 flex"), rowGap: 10 }}>
            <Input
              onChangeText={handleChange("policies")}
              onBlur={handleBlur("policies")}
              value={values?.policies}
              label="Business Policies"
              placeholder={`Insert Note for consumer's when they confirm their booking i.e surcharges, restaurant policy, 15 mins late etc.`}
              multiline
              numberOfLines={12}
              placeholderTextColor="#AEAEAE"
              returnKeyType="next"
              textAlignVertical="top"
              error={
                errors?.policies && touched?.policies ? errors?.policies : ""
              }
              height={280}
            />
          </View>
          <View style={tailwind("mt-3")}>
            <Typography weight="medium">Cancellation Fees</Typography>
            <Typography
              weight="medium"
              variant="sm"
              color="gray-400"
              className="mt-2"
            >
              Cancellation fees are charged per person, if they cancel within 24
              hours of their booking.
            </Typography>
            <Typography
              weight="medium"
              variant="sm"
              color="gray-400"
              className="mt-2"
            >
              Setting a cancellation fee is not mandatory. For more information,
              please read our{" "}
              <Typography
                className="underline"
                weight="medium"
                variant="sm"
                color="gray-400"
                onPress={() => Linking.openURL(config.TERMS_CONDITION_PAGE_URL)}
              >
                terms and conditions.
              </Typography>
            </Typography>
            <Input
              onChangeText={handleChange("cancellationFee")}
              onBlur={handleBlur("cancellationFee")}
              placeholder=" 00.00"
              left={
                <Typography
                  color={
                    (values?.cancellationFee ?? 0) > 0 ? "black" : "gray-500"
                  }
                >
                  $
                </Typography>
              }
              returnKeyType="done"
              error={
                errors?.cancellationFee && touched?.cancellationFee
                  ? errors?.cancellationFee
                  : ""
              }
              value={values?.cancellationFee?.toString()}
              className="mt-2"
              keyboardType="numbers-and-punctuation"
            />
          </View>
        </View>
        <View style={tailwind("mb-4")}>
          <Button
            disabled={!values?.policies}
            loading={isLoading}
            onPress={handleSubmit}
            className="mt-6"
            title="Next"
          />
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};
