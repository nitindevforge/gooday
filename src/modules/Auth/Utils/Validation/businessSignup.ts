import * as Yup from 'yup';
import { passwordField } from './field';

export const businessSignupValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name required'),
  lastName: Yup.string().required('Last name required'),
  gender: Yup.string().required('Gender required'),
  email: Yup.string().email('Invalid email').required('Email required'),
  password: passwordField(Yup),
  confirmPassword: passwordField(Yup, true),
  term1: Yup.bool().oneOf([true], 'Required'),
});
