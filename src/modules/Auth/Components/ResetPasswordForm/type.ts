import { FormikProps } from 'formik';

export type ResetPasswordFormProps = {
  form: FormikProps<ResetPasswordFormState>;
  isLoading: boolean
}
export type ResetPasswordFormState = {
  password: string;
  confirmPassword: string;
};
