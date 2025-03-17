import React, { useState } from "react";
import { Alert, Image, Linking, TouchableOpacity, View } from "react-native";
import { Button, Icon, Input, Typography, DatePickerModel } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { BirthdayFormProps } from "@app/modules";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import config from "@app/config";

const BirthdayForm: React.FC<BirthdayFormProps> = ({
  form: { values, errors, handleSubmit, setFieldValue, setFieldError },
  isLoading,
}) => {
  const tailwind = useTailwind();
  const [open, setOpen] = useState(false);
  const [bod, setBod] = useState(new Date());

  const handleSubmitDate = () => {
    const age = Math.floor(
      Math.abs(new Date(bod) - new Date()) / (1000 * 60 * 60 * 24 * 365.25)
    );
    if (age < 13) {
      setFieldError("date", "You must be at least 13 years old to use Gooday.");
    } else {
      setFieldValue("date", bod?.toLocaleDateString());
    }
    setOpen(false);
  };

  const onTerms = async () => {
    try {
      await Linking.canOpenURL(config.TERMS_CONDITION_PAGE_URL);
      Linking.openURL(config.TERMS_CONDITION_PAGE_URL);
    } catch (error) {
      Alert.alert("Gooday!", "Unable to open Browser");
    }
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={tailwind("flex-1")}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ ...tailwind("flex-1 justify-center") }}>
        <View>
          <Image source={require("../../../../assets/Images/birthday.png")} />
        </View>
        <View style={tailwind("px-6 mt-10")}>
          <Typography variant="2xl" weight="medium">
            When’s your birthday?
          </Typography>
          <View style={tailwind("mt-5")}>
            <Input
              editable={false}
              value={errors.date ? bod?.toLocaleDateString() : values.date}
              placeholder="DD / MM / YYYY"
              placeholderTextColor="#AEAEAE"
              error={errors.date}
              returnKeyType="done"
              massageStyle={tailwind("text-xs text-right")}
              right={
                <TouchableOpacity
                  hitSlop={{
                    left: 310,
                    right: 12,
                    top: 10,
                    bottom: 10
                  }}
                  activeOpacity={0.8}
                  onPress={() => setOpen(true)}
                >
                  <Icon
                    name="calendar"
                    height={23}
                    width={20}
                    fill="#FECB4D"
                    stroke="none"
                  />
                </TouchableOpacity>
              }
            />
          </View>
        </View>
      </View>
      <View style={tailwind("px-6")}>
        <Typography variant="10" color="gray-200" className="pl-4">
          By agreeing to our{" "}
          <Typography onPress={onTerms} color="info" variant="10">
            Terms & Conditions
          </Typography>
          , you agree to provide your real age.
        </Typography>
        <Button
          loading={isLoading}
          disabled={values.date && !errors?.date ? false : true}
          onPress={handleSubmit}
          className="my-4"
          title="Next"
        />
      </View>
      <DatePickerModel
        mode="date"
        maximumDate={new Date()}
        open={open}
        onClose={() => setOpen(false)}
        date={bod}
        onDateChange={(date) => setBod(date)}
        onSubmit={() => handleSubmitDate()}
      />
    </KeyboardAwareScrollView>
  );
};

export default BirthdayForm;
