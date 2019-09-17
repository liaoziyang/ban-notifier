import React, { Suspense, Fragment, useState } from 'react'
import io from 'socket.io-client'
import useFetch from 'fetch-suspense'
import styled from 'styled-components'
import Loading from './Loading'
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
  &.name{
    font-size: 2rem;
  }
`
const Description = styled.p`
  color: white;
  margin-top: -15px;
  &.name{
    margin-top: -5px;
  }
`

export default function LiveFeed(){
  return (
    <Container>
      <Suspense fallback={<Loading dark={false}/>}>
        <LiveFeedData/>
      </Suspense>
    </Container>
  )
}

function LiveFeedData(){
  const socket = io(`${__API__}`)
  const [ response, setResponse ] = useState({ today: 5, month: 5, lastUser: { name: 'franky', steamId: '32432'}})
  function filterName(name){
    return name.length > 14 ? name.substring(0,14) + '..' : name
  }

  socket.on('connect', onNewData)
  function onNewData(){
    console.log(socket)
    socket.emit('ready', { test: 'test'})
  }
  socket.on('events', (data) => {
    console.log(data)
  })

  return (
    <Fragment>
      <Box>
        <Title>{response.today}</Title>
        <Description>banned today</Description>
      </Box>
      <Box>
        <Title>{response.month}</Title>
        <Description>total bans</Description>
      </Box>
      <Box>
        <Title className="name">{filterName(response.lastUser.name)}</Title>
        <Description className="name">latest ban</Description>
      </Box>
    </Fragment>
  )
}

