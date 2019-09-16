import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.button`
  background-color: ${(props) => props.colored ? props.theme.red : 'white'};
  padding: 8px 40px;
  color: ${(props) => props.colored ? 'white' : props.theme.red};
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 0.5px;
  box-shadow: 2px 3px 15px 0 rgba(0,0,0,0.47);
`

export default function Button({ text, colored }){
  return (
    <Container colored={colored}>
      { text }
    </Container>
  )
}

Button.propTypes = {
  colored: PropTypes.bool,
  text:    PropTypes.string.isRequired
}
Button.defaultProps = {
  colored: true
}
