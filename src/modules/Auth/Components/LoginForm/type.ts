import {FormikProps} from 'formik';

export type LoginFormProps = {
  form: FormikProps<LoginFormState>;
  isLoading: boolean
};

export type LoginFormState = {
  email: string
  password: string
};


export type InputFieldValue = {
  type: string;
  label: string
  name: string
  placeholder: string
  data?: SelectOptions[]
}; 

export type SelectOptions = {
  label: string,
  value: string
}