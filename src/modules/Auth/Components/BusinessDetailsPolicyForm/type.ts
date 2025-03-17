import { FormikProps } from 'formik';

export type BusinessDetailsPolicyFormProps = {
  form: FormikProps<BusinessDetailsPolicyFormState>;
  isLoading: boolean;
};

export type BusinessDetailsPolicyFormState = {
  policies?: string;
  cancellationFee?: number;
};