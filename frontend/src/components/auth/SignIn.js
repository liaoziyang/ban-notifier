import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { post } from '../../helpers/api'
import { Formik, Form, Field } from 'formik'
import Button from '../layout/Button'

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

export default function SignIn({ username }){
  return (
    <Formik
      initialValues={{ username: username, password: '' }}
      onSubmit={async(values, actions) => {
        const res = await post('/auth/signup', values)
        console.log(res)
        console.log(actions)
      }
      }
      render={({ errors, touched }) => (
        <Form>
          <StyledLabel htmlFor="username">Username</StyledLabel>
          <StyledField name="username" type="text"/>
          { errors.username }
          <StyledLabel hmtlFor="password">Password</StyledLabel>
          <StyledField name="password" type="password"/>
          { errors.username }
          <Button submit text="sign in"/>
        </Form>
      )}/>
  )
}

SignIn.propTypes = {
  username: PropTypes.string
}
