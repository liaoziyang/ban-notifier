import React from 'react'
import styled from 'styled-components'
import Header from '../Header'
import landing from '../../../assets/landing.svg'

const Container = styled.div`
  background-color: green;
`
const TextContainer = styled.div`
  background-color: green;
`
const Title = styled.h1`
  font-size: 3.3125rem;
  color: ${(props) => props.theme.red};
  margin-bottom: 45px;
  text-transform: uppercase;

`
const Description = styled.p`
  color: #bababa;
`
const ImageContainer = styled.div`
  background-color: red;
`

export default function Landing(){
  return (
    <Container>
      <Header/>
      <TextContainer>
        <Title>Whos Cheating</Title>
        <Description>Blanditiis aut quaerat voluptatibus dolorem reiciendis expedita. Aspernatur est quia eos nihil neque aut. Aut repudiandae tempora perferendis eos enim. Sapiente modi voluptatem quo. Ad distinctio veritatis et. Maiores maxime eligendi at.</Description>
      </TextContainer>
      <ImageContainer>
        <img alt="laptop-landing" src={landing}/>
      </ImageContainer>
    </Container>
  )
}
