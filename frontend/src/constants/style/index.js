import React from 'react'
import { createGlobalStyle } from 'styled-components'

const Style = createGlobalStyle`
  body{
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
  h1,h2,h3,h4,h5,h6,p,a,button{
    margin: 0;
    padding: 0;
    outline: 0;
    border: 0;
  }
  a{
    text-decoration: none;
    cursor: pointer;
  }
  p{
    font-size: 1rem;
  }
  button, button:active, button:focus{
    border: 0;
    outline: 0;
    outline: none;
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
