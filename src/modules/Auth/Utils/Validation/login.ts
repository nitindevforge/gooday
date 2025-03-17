import * as Yup from 'yup';
import { passwordField } from './field';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email required'),
  password: passwordField(Yup),
});
