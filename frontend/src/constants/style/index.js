import React from 'react'
import { createGlobalStyle } from 'styled-components'

const Style = createGlobalStyle`
  body{
    padding: 0;
    margin: 0;
    background-color: green;
  }
`

// this is needed for cosmos as the wrapper proxy prefers a div
export function CosmosGlobalStyle(){
  return (
    <div>
      <Style/>
    </div>
  )
}

export default Style
