import * as yup from 'yup';

export const profileSchema = yup.object().shape({
  username: yup.string().trim().required('Username is required'),
  email: yup.string().trim().email('Invalid email').required('Email is required'),
  newPassword: yup.string().trim().required('NewPassword is required'),
  image: yup.string().trim().url('Enter a valid URL').required('Image is required'),
});