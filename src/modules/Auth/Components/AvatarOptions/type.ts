import {FormikProps} from 'formik';

export type AvatarOptionsProps = {
  form: FormikProps<AvatarOptionsState>;
  isLoading: boolean
  compact?: boolean;
  cta?: string;
};

export type AvatarOptionsState = {
  avatar: string;
};

export type avatar = {
  name: string,
  image: string,
  type:string,
}