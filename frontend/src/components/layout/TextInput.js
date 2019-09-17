import React, { Fragment } from 'react'
import styled from 'styled-components'

const StyledLabel = styled.label`
  color: orange;
`
const StyledInput = styled.input`
  background-color: green;
`
export default function TextInput({ field, form: { touched, errors }, placeholder}){
  return (
    <div>
      <StyledLabel>{ placeHolder }</StyledLabel>
      <StyledInput type="text" {...field} {...props}/>
    </div>
  )
}
