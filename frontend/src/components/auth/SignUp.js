import React from 'react'
import styled from 'styled-components'
import { post } from '../../helpers/api'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Button from '../layout/Button'
import Joi from 'joi'

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
  const SignupSchema = Joi.object({
    username: Joi.string()
      .min(4)
      .max(20),

    password: Joi.string()
      .min(8)
      .max(20)
      .pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/),
    repeatPassword: Joi.ref('password')

  })
  return (
    <Formik
      initialValues={{ username: 'test', password: 'test', repeatPassword: 'test' }}
      
      onSubmit={async(values, actions) => {
        const res = await post('/auth/signup', values)
        res.status === 400 ? filterErrors(res.data.message) : console.log('is gelukt')
      }
      }
      render={({ errors, touched }) => (
        <Form>
          <StyledLabel htmlFor="username">Username</StyledLabel>
          <StyledField name="username" type="text"/>
          <ErrorMessage name="username" component="div"/>
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
