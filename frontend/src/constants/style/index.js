import React, { Fragment } from 'react'
import { createGlobalStyle } from 'styled-components'

const Style = createGlobalStyle`
  body{
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
  h1,h2,h3,h4,h5,h6,p,a,button,label,input{
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
    color: #707070;
  }
  input{
     display: block;
  }
  button, button:active, button:focus button::-moz-focus-inner,
  input[type="reset"]::-moz-focus-inner,
  input[type="button"]::-moz-focus-inner,
  input[type="submit"]::-moz-focus-inner {
  border: none;
  outline: none;
  border-style: none;
  }
`

// this is needed for cosmos as the wrapper proxy prefers a div
export function CosmosGlobalStyle({ children }){
  return (
    <Fragment>
      <Style/>
      { children }
    </Fragment>
  )
}

export default Style
