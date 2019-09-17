import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.button`
  background-color: ${(props) => props.colored ? props.theme.red : 'white'};
  padding: 10px 60px;
  color: ${(props) => props.colored ? 'white' : props.theme.red};
  text-transform: uppercase;
  font-weight: 800;
  box-shadow: 2px 3px 15px 0 rgba(0,0,0,0.47);
  transition: .2s transform ease-in-out;
  cursor: pointer;
  &:hover{
    transform: ${(props) => props.hoverDirection === 'vertical' ? 'translateY(-6px)' : 'translateX(-6px)'};
  }
`

export default function Button({ text, colored, hoverDirection }){
  return (
    <Container colored={colored} hoverDirection={hoverDirection}>
      { text }
    </Container>
  )
}

Button.propTypes = {
  colored:        PropTypes.bool,
  hoverDirection: PropTypes.oneOf(['horizontal', 'vertical']),
  text:           PropTypes.string.isRequired
}
Button.defaultProps = {
  colored:        true,
  hoverDirection: 'vertical'
}
