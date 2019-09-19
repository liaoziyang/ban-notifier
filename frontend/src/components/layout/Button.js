import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import SpinnerToCheckmark from './SpinnerToCheckmark'
import { Button as StyledButton } from '../styled'

const TextContainer = styled.div`
 margin-right: ${(props) => props.checkmarkVisible ? '10px' : '0'};
 transition: .3s ease-in-out margin-right;
`

export default function Button({ text, color, hoverDirection, type }){
  return (
    <StyledButton color={color} hoverDirection={hoverDirection} type={type}>
      { text }
    </StyledButton>
  )
}

Button.propTypes = {
  color:          PropTypes.oneOf(['red','orange','white','gray']),
  hoverDirection: PropTypes.oneOf(['horizontal', 'vertical']),
  text:           PropTypes.string.isRequired,
  type:           PropTypes.oneOf(['button', 'submit', 'reset'])
}
Button.defaultProps = {
  color:          'red',
  hoverDirection: 'vertical',
  type:           'button'
}
/*
Fetching BUTTON
*/

export function FetchButton({ text, color, hoverDirection, submit }){
  return (
    <StyledButton color={color} hoverDirection={hoverDirection} type="submit">
      <TextContainer checkmarkVisible={submit.submitting}>{text}</TextContainer><SpinnerToCheckmark checkmark={submit.successful} visible={submit.submitting}/>
    </StyledButton>
  )
}

FetchButton.propTypes = {
  color:          PropTypes.oneOf(['red','orange','white','gray']),
  hoverDirection: PropTypes.oneOf(['horizontal', 'vertical']),
  submit:         PropTypes.object,
  text:           PropTypes.string.isRequired
}

FetchButton.defaultProps = {
  color:          'red',
  hoverDirection: 'vertical',
  type:           'submit'
}
