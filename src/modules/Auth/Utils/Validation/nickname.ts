import * as Yup from 'yup';

export const nicknameValidationSchema = Yup.object().shape({
  nickname: Yup.string().required('Nickname required'),
});
