import { FormikProps } from "formik";

export type BirthdayFormProps ={
  form: FormikProps<BirthdayFormState>;
  isLoading: boolean
}

export type BirthdayFormState = {
  date: string
};
