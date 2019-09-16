import React from 'react'
import styled from 'styled-components'
import { Link, Switch } from 'react-router-dom'
import Button from './Button'

const Container = styled.div`
  background-color: ${(props) => props.theme.red};
  padding: 50px 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`
const IconContainer = styled.div`
  background-color: black;
  max-width: 300px;
  width: auto;
`
const Icon = styled.img`
  width: 50px;
  height: 30px;
`
const NavBar = styled.nav`
  width: auto;
`
const StyledLink = styled(Link)`
  color: gray;
`

// TODO: check with localstorage if user already created a profile?
export default function Header(){
  return (
    <Container>
      <IconContainer>
        <Icon alt="banter-icon" src="/public/icon/icon.png"/>
      </IconContainer>
      <NavBar>
        <StyledLink to="/csgo" >csgo</StyledLink>
        <StyledLink to="/faceit">faceit</StyledLink>
        <Button colored={false} text="sign up"/>
      </NavBar>
    </Container>
  )
}
