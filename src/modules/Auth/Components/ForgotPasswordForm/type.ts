import { FormikProps } from 'formik';

export type ForgotPasswordFormProps = {
  form: FormikProps<ForgotPasswordFormState>;
  isLoading: boolean
}
export type  ForgotPasswordFormState = {
  email: string;
};
