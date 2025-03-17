import { FormikProps } from "formik";

export type MailVerificationFormProps = {
  form: FormikProps<MailVerificationState>;
  isLoading: boolean;
  email?: string;
}

export type MailVerificationState = {
  code: string;
};