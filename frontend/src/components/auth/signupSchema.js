import * as Yup from 'yup'

const signupSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Too short!')
    .max(20, 'Too Long!')
    .matches(/([A-Za-z0-9_-]*$)/, 'should only contain letters, numbers, dash or underscores')
    .required('This field is Required'),
  password: Yup.string()
    .min(8, 'Too short!')
    .max(20, 'Too long!')
    .matches(/(?=.*\W+)/g, 'should contain a special char')
    .matches(/(?=.*[A-Z])/g, 'should contain a capital letter')
    .matches(/(?=.*[a-z].*$)/g,'should contain a small letter')
    .matches(/(?![.\n])/g, 'should contain a number')
    .required('This field is required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'passwords must match.')
})

export default signupSchema
