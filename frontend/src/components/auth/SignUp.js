import React, { useState } from 'react'
import styled from 'styled-components'
import { post } from '../../helpers/api'
import { error } from '../../helpers/notifier'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FetchButton } from '../layout/Button'
import signupSchema from './signupSchema'

const StyledForm = styled(Form)`
  margin-top: 100px;
  width: 60%;
  height: 100%;
`
const FieldContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`

const StyledLabel = styled.label`
  color: ${(props) => props.theme.gray};
  font-size: 1rem;
  margin-left: 2px;
  display: block;
  margin-bottom: 3px;
`
const StyledField = styled(Field)`
  padding: 15px 20px;
  width: 100%;
  border: 1px solid ${(props) => props.theme.text};
  border-radius: 5px;
  transition: border-color .3s ease-in-out;
  &:focus {
    border-color: ${(props) => props.theme.orange};
  }
`
const StyledErrorMessage = styled(ErrorMessage)`
  color: ${(props) => props.theme.orange};
  display: block;
  font-size: 0.9rem;
  margin-left: 5px;
  margin-top: 5px;
`
const StyledFetchButton = styled(FetchButton)`
  margin-top: 50px;
`

export default function SignUp(){
  const [submit, setSubmit] = useState({ submitting: false, successful: false })
  function onErrors(actions,errorMessage){
    actions.setFieldValue('password', '')
    actions.setFieldValue('repeatPassword', '')
    setSubmit({ submitting: false, successful: false })
    error(errorMessage)
  }
  return (
    <Formik
      initialValues={{ email: '', username: '', password: '', repeatPassword: '' }}
      onSubmit={async(values, actions) => {
        setSubmit({ submitting: true, successful: false })
        const res = await post('/auth/signup', values)
        res.status === 201 ? setTimeout(() => {
          setSubmit({ submitting: true, successful: true })
        }, 3000) : onErrors(actions,res.data.message)
      }
      }
      render={() => (
        <StyledForm>
          <FieldContainer>
            <StyledLabel htmlFor="email">Email address</StyledLabel>
            <StyledField id="email" name="email" type="text"/>
            <StyledErrorMessage component="div" name="email"/>
          </FieldContainer>
          <FieldContainer>
            <StyledLabel htmlFor="username">Username</StyledLabel>
            <StyledField id="username" name="username" type="text"/>
            <StyledErrorMessage component="div" name="username"/>
          </FieldContainer>
          <FieldContainer>
            <StyledLabel hmtlFor="password">Password</StyledLabel>
            <StyledField id="password" name="password" type="password"/>
            <StyledErrorMessage component="div" name="password"/>
          </FieldContainer>
          <FieldContainer>
            <StyledLabel htmlFor="repeatPassword">Repeat password</StyledLabel>
            <StyledField id="repeatPassword" name="repeatPassword" type="password"/>
            <StyledErrorMessage component="div" name="repeatPassword"/>
          </FieldContainer>
            Already an account?
          <StyledFetchButton submit={submit} text="sign up"/>
        </StyledForm>
      )}
      validateOnChange
      validationSchema={signupSchema}/>
  )
}
