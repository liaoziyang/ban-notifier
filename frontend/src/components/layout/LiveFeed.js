import React, { suspense } from 'react'
import useFetch from 'fetch-suspense'
import styled from 'styled-components'
const Container = styled.div`
  display: grid;
  grid-gap: 10px;
  height: 250px;
  width: calc(60% - 150px);
  margin: 100px auto;
  background: ${(props) => props.theme.verticalGradient};
  border-radius: 25px;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 150px;
`
const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Title = styled.p`
  color: white;
  font-size: 3rem;
  font-weight: 800;
`
const Description = styled.p`
  color: white;
  margin-top: -15px;
`

// fetch

export default function LiveFeed(){
  const response = useFetch(`/tracked-account/live:${env.process.port}`, { method: 'GET' })
  console.log(response)
  return (
    <suspense>
      <Container>
        <Box>
          <Title>24</Title>
          <Description>banned today</Description>
        </Box>
        <Box>
          <Title>33247</Title>
          <Description>total bans</Description>
        </Box>
        <Box>
          <Title>niek</Title>
          <Description>latest ban</Description>
        </Box>
      </Container>
    </suspense>
  )
}
