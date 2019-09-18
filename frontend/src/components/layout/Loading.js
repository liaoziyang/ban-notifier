import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const LoadIcon = styled.div`
  color: ${(props) => props.dark ? 'black' : 'white'};
`
export default function Loading({ dark }){
  return (
    <Container>
      <LoadIcon dark={dark}>loading</LoadIcon>
    </Container>
  )
}

Loading.propTypes = {
  dark: PropTypes.bool
}
Loading.defaultProps = {
  dark: true
}
