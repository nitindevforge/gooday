import { FormikProps } from 'formik';

export type WaitListFormProps = {
  form: FormikProps<WaitListState>;
  isLoading: boolean;
  name: string;
};

export type WaitListState = {
  firstName: string;
  lastName: string;
  email: string;
  name: string;
};