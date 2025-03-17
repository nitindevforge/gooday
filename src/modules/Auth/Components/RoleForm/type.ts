import {FormikProps} from 'formik';
import { ImageBackgroundProps, ImageSourcePropType } from 'react-native';
import { Role } from '../../Utils';

export type RoleFormProps = {
  form: FormikProps<RoleFormState>;
};

export type RoleFormState = {
  role: string;
};

export type RoleData = {
  title: string,
  value: Role,
  image: ImageSourcePropType,
  bgImage: ImageBackgroundProps
}