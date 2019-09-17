import React from 'react'
import styled from 'styled-components'
import SignIn from '../auth/SignIn'

const Container = styled.div`
  background-color: green;
  height: 100vh;
`
const Left = styled.div`
  background-color: white;
  width: 50%;
  height: 100%;
`
const Right = styled.div`
  width: 50%;
  height: 100%;
`

export default function SignInPage(){
  return (
    <Container>
      <Left><SignIn username={localStorage.getItem('username') || ''}/></Left>
      <Right>this is the right side</Right>
    </Container>
  )
}
