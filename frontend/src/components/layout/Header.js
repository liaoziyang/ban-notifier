import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import Button from './Button'
import icon from '../../assets/icon/icon.svg'

const moveBlob = keyframes`
  0% {
    top: -100px;
    right: -75px
  }
  100% {
    top: -125px;
    right: -95px;
  }
`

const Container = styled.div`
  display: flex;
  min-height: 100px;
  position: relative;
  align-items: center;
  flex-direction: row;
  padding: 50px 100px 50px 200px;
  &::before{
    z-index: -1;
    position: absolute;
    content: '';
    top: -100px;
    right: -75px;
    width: 400px;
    height: 500px;
    background-image: url('./blob.svg');
    background-repeat: no-repeat;
    animation: 2s ${moveBlob} ease-in-out infinite alternate;
  }
`
const IconContainer = styled(Link)`
  width: 50%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  p{
    font-weight: 600;
    font-size: 1.5rem;
  }
`
const Icon = styled.img`
  width: 30px;
  height: auto;
  margin-right: 10px;
`
const NavBar = styled.nav`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`
const StyledLink = styled(Link)`
  color: ${(props) => props.theme.text};
  font-weight: 500;
  margin: 0 50px;
  transition: .2s transform ease-in-out;
  font-size: 1.125rem;
  &:hover{
    transform: translateY(-4px);
  }
`

// TODO: check with localstorage if user already created a profile?
export default function Header(){
  return (
    <Container>
      <IconContainer to="/">
        <Icon alt="banter-icon" src={icon}/>
        <p>Banter</p>
      </IconContainer>
      <NavBar>
        <LinkContainer>
          <StyledLink to="/csgo" >csgo</StyledLink>
          <StyledLink to="/faceit">faceit</StyledLink>
        </LinkContainer>
        <Button colored={false} text="sign up"/>
      </NavBar>
    </Container>
  )
}
