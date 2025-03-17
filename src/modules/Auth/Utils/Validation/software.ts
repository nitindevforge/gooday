import * as Yup from 'yup';

export const waitListValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name required'),
  lastName: Yup.string().required('Last name required'),
  email: Yup.string().email('Invalid email').required('Email required'),
});
