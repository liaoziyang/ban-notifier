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
  margin-top: 30px;
`
const StyledField = styled(Field)`
  padding: 10px 15px;
  border: 1px solid ${(props) => props.theme.gray};
  border-radius: 5px;
  transition: border-color .3s ease-in-out;
  &:focus {
    border-color: ${(props) => props.theme.red};
  }
`
const StyledErrorMessage = styled(ErrorMessage)`
  color: ${(props) => props.theme.red};
  display: block;
  font-size: 0.825rem;
  margin-left: 5px;
`

export default function SignUp(){
  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, 'Too short!')
      .max(20, 'Too Long!')
      .matches(/[A-Za-z0-9_-]/g, 'should only contain letters, numbers, dash or underscores')
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
      .oneOf([Yup.ref('password'), null], 'passwords must match')
  })

  return (
    <Formik
      initialValues={{ username: 'test', password: 'test', repeatPassword: 'test' }}
      onSubmit={async(values) => {
        const res = await post('/auth/signup', values)
        res.status === 400 ? filterErrors(res.data.message) : console.log('is gelukt')
      }
      }
      render={() => (
        <Form>
          <StyledLabel htmlFor="username">Username</StyledLabel>
          <StyledField name="username" type="text"/>
          <StyledErrorMessage component="div" name="username"/>
          <StyledLabel hmtlFor="password">Password</StyledLabel>
          <StyledField name="password" type="password"/>
          <StyledErrorMessage component="div" name="password"/>
          <StyledLabel htmlFor="repeatPassword">Repeat password</StyledLabel>
          <StyledField name="repeatPassword"/>
          <StyledErrorMessage component="div" name="repeatPassword"/>
          <Button submit text="sign in"/>
        </Form>
      )}
      validationSchema={signupSchema}/>
  )
}

function filterErrors(errorMessages){
  errorMessages.map((error) => {
    console.log(error)
  })
}
