import React from 'react'
import { createGlobalStyle } from 'styled-components'

const Style = createGlobalStyle`
  body{
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
  h1,h2,h3,h4,h5,h6,p,a{
    margin: 0;
    padding: 0;
  }
  a{
    text-decoration: none;
    cursor: pointer;
  }
  p{
    font-size: 1rem;
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
