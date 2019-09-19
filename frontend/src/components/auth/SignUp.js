import React, { useState } from 'react'
import styled from 'styled-components'
import { post } from '../../helpers/api'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import signupSchema from './signupSchema'
import { FetchButton } from '../layout/Button'

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

const StyledFetchButton = styled(FetchButton)`
  margin-top: 50px;
`

export default function SignUp(){
  const [submit, setSubmit] = useState({ submitting: false, successful: false })

  return (
    <Formik
      initialValues={{ username: '', password: '', repeatPassword: '' }}
      onSubmit={async(values, actions) => {
        setSubmit({ submitting: true, successful: false })
        const res = await post('/auth/signup', values)
        res.status === 400 ? onErrors(actions,res.data.message) : setTimeout(() => {
          setSubmit({ submitting: true, successful: true })
        }, 3000)
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
          <StyledField name="repeatPassword" type="password"/>
          <StyledErrorMessage component="div" name="repeatPassword"/>
          <StyledFetchButton submit={submit} text="sign up"/>
        </Form>
      )}
      validateOnChange
      validationSchema={signupSchema}/>
  )
}

function onErrors(actions,errorMessages){
  actions.setFieldValue('password', '')
  actions.setFieldValue('repeatpassword', '')
  errorMessages.map((error) => {
    console.log(error)
  })
}
