import React from 'react'
import styled from 'styled-components'
import SignUp from '../auth/SignUp'

const Container = styled.div`
  height: 100vh;
  display: flex;
`
const Left = styled.div`
  background-color: ${(props) => props.theme.orange};
  width: 50%;
  height: 100%;
  h1{
    color: white;
    text-align: center;
    font-size: 6rem;
  }
`
const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 100%;
`
const Header = styled.header`
  text-align: center;
  margin-top: 150px;
  h2{
    font-size: 2rem;
    margin-bottom: 10px;
  }
  p{
    width: 80%;
    font-size: 1rem;
    margin: 0 auto;
  }
`

export default function SignUpPage(){
  return (
    <Container>
      <Left>
        <h1>Banter</h1>
      </Left>
      <Right>
        <Header>
          <h2>Get started today!</h2>
          <p>Enter your username and password to sign up! or do something else you know</p>
        </Header>
        <SignUp/>
      </Right>
    </Container>
  )
}
