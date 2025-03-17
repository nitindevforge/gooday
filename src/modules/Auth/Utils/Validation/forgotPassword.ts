import * as Yup from 'yup';

export const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email required'),
});
