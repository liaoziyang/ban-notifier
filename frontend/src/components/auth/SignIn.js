import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Button from '../layout/Button'
import TextInput from '../layout/TextInput'

export default function SignIn({ username }){

  return (
    <Formik
      initialValues={{ username: username, password: '' }}
      onSubmit={(values, actions) => {
        console.log(values)
        console.log(actions)
      }
      }
      render={({ errors, touched }) => (
        <Form>
          <Field name="username" type="text"/>
          <Field name="password" type="password"/>
          <Button text="sign in"/>
        </Form>
      )}/>
  )
}

SignIn.propTypes = {
  username: PropTypes.string
}
