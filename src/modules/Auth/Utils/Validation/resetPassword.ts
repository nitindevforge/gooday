import * as Yup from 'yup';
import { passwordField } from './field';

export const resetPasswordValidationSchema = Yup.object().shape({
  password: passwordField(Yup),
  confirmPassword: passwordField(Yup,true),
});
