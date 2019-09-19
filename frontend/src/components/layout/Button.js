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

export default function Button({ text, colored, hoverDirection, type }){
  return (
    <Container colored={colored} hoverDirection={hoverDirection} type={type}>
      { text }
    </Container>
  )
}

Button.propTypes = {
  colored:        PropTypes.bool,
  hoverDirection: PropTypes.oneOf(['horizontal', 'vertical']),
  text:           PropTypes.string.isRequired,
  type:           PropTypes.oneOf(['button', 'submit', 'reset'])
}
Button.defaultProps = {
  colored:        true,
  hoverDirection: 'vertical',
  type:           'button'
}

export function FetchButton({ text, colored, hoverDirection, loading }){
  return (
    <Container colored={colored} hoverDirection={hoverDirection} type="submit">
      { text } { loading === 'submitting' ? <div> loading.. </div> : null}
    </Container>
  )
}

FetchButton.propTypes = {
  colored:        PropTypes.bool,
  hoverDirection: PropTypes.oneOf(['horizontal', 'vertical']),
  loading:        PropTypes.oneOf(['default', 'submitting', 'success']),
  text:           PropTypes.string.isRequired
}

FetchButton.defaultProps = {
  colored:        true,
  hoverDirection: 'vertical',
  loading:          'default',
  type:           'submit'
}
