import * as yup from 'yup';

const Schema = yup.object({
  firstName: yup
    .string()
    .trim()
    .min(3, 'must be at least 3 characters or more')
    .max(15, 'must be at least 15 characters or less')
    .required('required'),
  lastName: yup
    .string()
    .trim()
    .min(3, 'must be at least 3 characters or more')
    .max(15, 'must be at least 15 characters or less')
    .required('required'),
  email: yup.string().trim().email('invalid email address').required('required'),
  password: yup
    .string()
    .trim()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'password must be at least 8 characters and should have at least one number'
    )
    .required('required'),
  displayAddress: yup
    .string()
    .trim()
    .min(3, 'must be at least 3 characters or more')
    .max(15, 'must be at least 15 characters or less')
    .required('required'),
  contactNumber: yup
    .string()
    .min(7, 'must be at least 7 digits or more')
    .max(14, 'must be at least 14 digits or less')
    .required('required'),
  userType: yup.string().oneOf(['admin', 'buyer', 'seller']),
});

export default Schema;
