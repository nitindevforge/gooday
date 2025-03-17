import { FormikProps } from 'formik';

export type BusinessSignUpFormProps = {
  form: FormikProps<BusinessSignUpFormState>;
  isLoading: boolean;
};

export type BusinessSignUpFormState = {
  firstName: string;
  lastName: string;
  gender?: string;
  mobileNumber?: string;
  countryCode?: string;
  email: string
  password: string
  confirmPassword: string
  term1: boolean
  term2: boolean
  term3: boolean
};