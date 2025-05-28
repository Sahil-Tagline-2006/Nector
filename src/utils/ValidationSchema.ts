import * as Yup from 'yup';

// for the phone validation
const phoneRegExp = /^[6-9]\d{9}$/;
const PhoneValidationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone number is required'),
});

// for the OTP validation
const otpRegExp = /^\d{4}$/;
const OTPValidationSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(otpRegExp, 'OTP must be exactly 4 digits')
    .required('OTP is required'),
});

// for the Login validation
const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email address',
    )
    .required('Email is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Must have 1 uppercase, 1 number & 1 special char!',
    ).nullable()
    .required('Password is required'),
});

// for the Signup validation
const SignupValidationSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
      'Must have 1 char, 1 number',
    )
    .required('Username is required'),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email address',
    )
    .required('Email is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Must have 1 uppercase, 1 number & 1 special char!',
    ).nullable()
    .required('Password is required'),
});

export {
  PhoneValidationSchema,
  OTPValidationSchema,
  LoginValidationSchema,
  SignupValidationSchema,
};
