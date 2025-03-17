import {  FormikErrors, FormikValues } from "formik";
import { TextInput } from "react-native";

export type InputFieldsProps = {
  keyArr: string[];
  birthDayInputs: string[];
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<FormikValues>>;
  inputRef: TextInput[];
  values: FormikValues;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  disabled: boolean
};
