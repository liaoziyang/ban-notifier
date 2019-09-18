import React from 'react'
import styled from 'styled-components'
import { post } from '../../helpers/api'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Button from '../layout/Button'
import * as Yup from 'yup'

const StyledLabel = styled.label`
  color: ${(props) => props.theme.gray};
  font-size: 0.825rem;
  margin-left: 2px;
`
const StyledField = styled(Field)`
  padding: 10px 15px;
  border: 1px solid ${(props) => props.theme.gray};
  margin-bottom: 35px;
  border-radius: 5px;
  transition: border-color .3s ease-in-out;
  &:focus {
    border-color: ${(props) => props.theme.red};
  }
`

export default function SignUp(){
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, 'Too short!')
      .max(20, 'Too Long!')
      .required('This field is Required'),
    password: Yup.string()
      .min(8, 'Too short!')
      .max(20, 'Too long!')
      .matches(/(?=.*\d)/, 'should contain a digit.')
      .matches(/(?=.*\W+)/, 'should contain a special char')
      .matches(/(?=.*[A-Z])/, 'should contain a capital letter')
      .matches(/(?=.*[a-z].*$)/,'should contain a small letter')
      .matches(/(?=.*\W+)/, 'what is this?')
      .matches(/(?![.\n])/, 'should contain a number')
      .required('This field is required'),
    repeatPassword: Yup.ref('password')
  })
  return (
    <Formik
      initialValues={{ username: 'test', password: 'test', repeatPassword: 'test' }}
      onSubmit={async(values, actions) => {
        console.log(actions)
        const res = await post('/auth/signup', values)
        res.status === 400 ? filterErrors(res.data.message) : console.log('is gelukt')
      }
      }
      render={({ errors, touched }) => (
        <Form>
          <StyledLabel htmlFor="username">Username</StyledLabel>
          <StyledField name="username" type="text"/>
          <ErrorMessage component="div" name="username"/>
          <StyledLabel hmtlFor="password">Password</StyledLabel>
          <StyledField name="password" type="password"/>
          <ErrorMessage component="div" name="password"/>
          { errors.username }
          <Button submit text="sign in"/>
        </Form>
      )}
      validationSchema={SignupSchema}/>
  )
}

function filterErrors(errorMessages){
  errorMessages.map((error) => {
    console.log(error)
  })
}
