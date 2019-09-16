import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background-color: ${(props) => props.theme.red};
`

export default function Header(){
  return (
    <Container>
      this is a header
    </Container>
  )
}
