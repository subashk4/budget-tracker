import * as yup from 'yup';

const Schema = yup.object({
  propertyName: yup
    .string()
    .trim()
    .min(3, 'must be at least 3 characters or more')
    .max(30, 'must be at most 30 characters or less')
    .required('required'),
  address: yup
    .string()
    .trim()
    .min(3, 'must be at least 3 characters or more')
    .max(30, 'must be at most 30 characters or less')
    .required('required'),
  description: yup
    .string()
    .trim()
    .max(100, 'must be at most 100 characters or less')
    .required('required'),
  valuation: yup.number().positive('valuation must be positive').required('required'),
  propertyType: yup.string().oneOf(['sale', 'rent']).required('required'),
  isSold: yup.boolean().required('required'),
});

export default Schema;
