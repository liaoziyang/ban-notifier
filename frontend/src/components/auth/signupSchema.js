import * as Yup from 'yup'

const signupSchema = Yup.object().shape({
  email:    Yup.string()
    .email('This is not a valid email address.')
    .required('This field is required.'),
  username: Yup.string()
    .min(4, 'Too short.')
    .max(20, 'Too long.')
    .matches(/([A-Za-z0-9_-]*$)/, 'should only contain letters, numbers, dash or underscores')
    .required('This field is required.'),
  password: Yup.string()
    .min(8, 'Too short.')
    .max(30, 'Too long.')
    .matches(/(?=.*\W+)/g, 'Should contain a special char.')
    .matches(/(?=.*[A-Z])/g, 'Should contain a capital letter.')
    .matches(/(?=.*[a-z].*$)/g,'Should contain a small letter.')
    .matches(/(?![.\n])/g, 'Should contain a number.')
    .required('This field is required.'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'passwords must match.').required('This field is required.')
})

export default signupSchema
