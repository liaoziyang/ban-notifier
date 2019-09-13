import React from 'react'
import styled from 'styled-components'
const Container = styled.div`
  display: grid;
  grid-gap: 10px;
  height: 250px;
  width: calc(60% - 150px);
  margin: 100px auto;
  background: ${(props) => props.theme.verticalGradient};
  border-radius: 20px;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 150px;
`
const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function LiveFeed(){
  return (
    <Container>
      <Box>24</Box>
      <Box>33247</Box>
      <Box>niek</Box>
    </Container>
  )
}
