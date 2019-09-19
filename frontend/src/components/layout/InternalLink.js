import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from '../styled'
import styled from 'styled-components'

const StyledLink = styled(Button).attrs({
  as: Link
})`
  display: inline-block;
  text-align: center;
`

const StyledText = styled(Link)`
  color: ${({ color, theme }) => defineColor(color, theme)};
  font-weight: 600;
`

function defineColor(color, theme){
  switch (color){
    case 'red':
      return theme.red
    case 'orange':
      return theme.orange
    case 'gray':
      return theme.text
    case 'white':
      return 'white'
  }
}

export function ButtonAsLink({ text, color, to }){
  return (
    <StyledLink color={color} to={to}>{text}</StyledLink>
  )
}

ButtonAsLink.propTypes = {
  color: PropTypes.oneOf(['red', 'orange', 'white', 'gray']),
  text:  PropTypes.string.isRequired,
  to:    PropTypes.string.isRequired
}
ButtonAsLink.defaultProps = {
  color: 'red'
}

export function TextAsLink({ color, text, to }){
  return (
    <StyledText color={color} to={to}>
      {text}
    </StyledText>
  )
}

TextAsLink.propTypes = {
  color: PropTypes.oneOf(['red', 'orange', 'gray', 'white']),
  text:  PropTypes.string.isRequired,
  to:    PropTypes.string.isRequired
}

TextAsLink.defaultProps = {
  color: 'red'
}
