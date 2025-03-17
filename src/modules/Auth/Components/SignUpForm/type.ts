import {FormikProps} from 'formik';

export type SignUpFormProps = {
  form: FormikProps<SignUpFormState>;
  isLoading: boolean;
};

export type SignUpFormState = {
  firstName: string;
  lastName: string;
  gender?: string;
  mobileNumber?: string;
  countryCode?: string;
  email: string;
  password: string;
  confirmPassword: string;
  term1:boolean;
  term2: boolean;
  term3: boolean;
  upload?: string;
  profile?: string;
  file?: string; 
};