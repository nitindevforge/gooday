import React from "react";
import { Image, View } from "react-native";
import { Button, Input, Typography } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { NicknameFormProps } from "@app/modules";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const NicknameFrom: React.FC<NicknameFormProps> = ({
  form: { handleChange, handleBlur, values, handleSubmit },
  isLoading,
}) => {
  const tailwind = useTailwind();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={tailwind("flex-1")}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ ...tailwind("pt-24 flex-1 justify-center") }}>
        <View style={tailwind("left-8")}>
          <Image source={require("../../../../assets/Images/nickname.png")} />
        </View>
        <View style={tailwind("mt-20")}>
          <Typography weight="medium" variant="2xl">
            What shall we call you?
          </Typography>
          <Typography weight="medium" className="mt-5">
            Feel free to use a nickname!
          </Typography>
        </View>

        <View style={tailwind("mt-10")}>
          <Input
            onChangeText={handleChange("nickname")}
            onBlur={handleBlur("nickname")}
            value={values?.nickname}
            returnKeyType="done"
            placeholder="Type here..."
            onSubmitEditing={handleSubmit}
          />
        </View>
      </View>
      <Button
        loading={isLoading}
        onPress={handleSubmit}
        disabled={!values?.nickname}
        className="my-4"
        title="Next"
      />
    </KeyboardAwareScrollView>
  );
};

export default NicknameFrom;
