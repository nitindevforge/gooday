import {FormikProps} from 'formik';

export type NicknameFormProps = {
  form: FormikProps<NicknameFormState>;
  isLoading: boolean
};

export type NicknameFormState = {
  nickname: string;
};
