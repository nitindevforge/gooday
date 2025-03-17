import React, { useRef } from "react";
import {
  InputFieldValue,
  ConsentCheckbox,
  AuthNavigationParamList,
  BusinessSignUpFormProps,
  Gender,
} from "@app/modules";
import {
  Linking,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Button,
  Dropdown,
  Input,
  PasswordInput,
  PhoneInput,
  Typography,
} from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { isFormValid } from "@app/utils";
import config from "@app/config";
import { DropdownItem } from "src/ui/Dropdown/type";

export const BusinessSignUpForm: React.FC<BusinessSignUpFormProps> = ({
  form: {
    handleChange,
    handleBlur,
    values,
    handleSubmit,
    setFieldValue,
    errors,
    setFieldTouched,
    touched,
  },
  isLoading,
}) => {
  const tailwind = useTailwind();
  const scrollRef = useRef<ScrollView>(null);
  const buttonRef = useRef<TouchableOpacity>(null);
  const { params } =
    useRoute<RouteProp<AuthNavigationParamList, "BUSINESS_SIGN_UP">>();
  const disabled = isFormValid(errors, {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    password: values.password,
    confirmPassword: values.confirmPassword,
    term1: values.term1,
  });
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthNavigationParamList>>();
  const inputRef = useRef<TextInput[]>([]);

  const inputField: InputFieldValue[] = [
    {
      type: "text",
      name: "firstName",
      label: "First name",
      placeholder: "First name",
    },
    {
      type: "text",
      name: "lastName",
      label: "Last name",
      placeholder: "Last name",
    },
    {
      type: "select",
      name: "gender",
      label: "Gender",
      placeholder: "Gender",
      data: Gender,
    },
    {
      type: "mobile",
      name: "mobileNumber",
      label: "Phone number",
      placeholder: "",
    },
    {
      type: "text",
      name: "email",
      label: "Email",
      placeholder: "example@gmail.com",
    },
    {
      type: "password",
      name: "password",
      label: "Create a password",
      placeholder: "Must be 8 characters and contain a ‘#!~@?’ ",
    },
    {
      type: "password",
      name: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Repeat your password",
    },
  ];

  return (
    <View style={tailwind("flex-1")}>
      <KeyboardAwareScrollView
        ref={scrollRef}
        contentContainerStyle={{ flexGrow: 1 }}
        style={tailwind("flex-1")}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={tailwind("flex-1")}>
          <View style={{ ...tailwind("pt-4 flex"), rowGap: 10 }}>
            {inputField?.map((field, index) => {
              const { name, label, placeholder, type, data } = field;
              return (
                <React.Fragment key={name}>
                  {type === "mobile" ? (
                    <PhoneInput
                      onChangeItem={(value, countryCode) => {
                        setFieldValue("mobileNumber", value);
                        handleChange("countryCode")(countryCode);
                      }}
                      onBlur={handleBlur(name)}
                      value={values[name]}
                      error={errors[name] && touched[name] ? errors[name] : ""}
                      label={label}
                      placeholder={placeholder}
                      ref={(ref) => (inputRef.current[index] = ref)}
                      returnKeyType="next"
                      keyboardType={"number-pad"}
                      onSubmitEditing={() => {
                        if (inputField?.length > index + 1) {
                          inputRef.current[index + 1]?.focus();
                        }
                      }}
                    />
                  ) : type === "select" ? (
                    <Dropdown
                      data={data as any}
                      onChangeText={handleChange(name)}
                      onBlur={() => setFieldTouched(name, true)}
                      label={label}
                      placeholder={placeholder}
                      selected={values[name]}
                      error={!values[name] && touched[name] ? errors[name] : ""}
                      labelField="label"
                      valueField="value"
                      onChange={() => { }}
                    />
                  ) : type === "password" ? (
                    <PasswordInput
                      onChangeText={handleChange(name)}
                      onBlur={handleBlur(name)}
                      value={values[name]}
                      label={label}
                      placeholder={placeholder}
                      error={errors[name] && touched[name] ? errors[name] : ""}
                      ref={(ref) => (inputRef.current[index] = ref)}
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        if (inputField?.length > index + 1) {
                          inputRef.current[index + 1]?.focus();
                        } else {
                          buttonRef.current?.measure(
                            (x, y, width, height, pageX, pageY) => {
                              setTimeout(() => {
                                scrollRef.current?.scrollTo({
                                  x: 0,
                                  y: pageY - height,
                                  animated: true,
                                });
                              }, 100);
                            }
                          );
                        }
                      }}
                    />
                  ) : (
                    <Input
                      onChangeText={handleChange(name)}
                      onBlur={handleBlur(name)}
                      value={values[name]}
                      label={label}
                      placeholder={placeholder}
                      error={errors[name] && touched[name] ? errors[name] : ""}
                      ref={(ref) => (inputRef.current[index] = ref)}
                      returnKeyType="next"
                      keyboardType={
                        name === "email" ? "email-address" : "default"
                      }
                      onSubmitEditing={() => {
                        if (inputField?.length > index + 1) {
                          inputRef.current[index + 1]?.focus();
                        }
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </View>

          <View style={{ gap: 15, ...tailwind("pt-10 flex") }}>
            <ConsentCheckbox
              onPress={() => setFieldValue("term1", !values?.term1)}
              checked={values?.term1}
              title={
                <Typography>
                  I accept Gooday’s{" "}
                  <Typography
                    className="underline"
                    onPress={() =>
                      Linking.openURL(config.TERMS_CONDITION_PAGE_URL)
                    }
                  >
                    Terms & Conditions
                  </Typography>
                </Typography>
              }
            />
            <ConsentCheckbox
              checked={values?.term2}
              onPress={() => setFieldValue("term2", !values?.term2)}
              title={`Gooday can store and track my data to improve services`}
            />
            <ConsentCheckbox
              checked={values?.term3}
              onPress={() => setFieldValue("term3", !values?.term3)}
              title={`Gooday can send me marketing material for future sales and promotions`}
            />
          </View>
        </View>
        <View style={tailwind("mb-4")}>
          <TouchableOpacity
            ref={buttonRef}
            onPress={() => navigation.navigate("LOGIN", { role: params?.role })}
            activeOpacity={0.7}
            style={{
              gap: 6,
              ...tailwind("mt-10 flex-row items-center justify-center"),
            }}
          >
            <Typography color="gray-400">Already have an account?</Typography>
            <Typography className="underline"> Sign In</Typography>
          </TouchableOpacity>
          <Button
            disabled={disabled}
            loading={isLoading}
            onPress={handleSubmit}
            className="mt-6"
            title="Next"
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
