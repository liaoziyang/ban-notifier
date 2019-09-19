import React, { Fragment } from 'react'
import { createGlobalStyle } from 'styled-components'

const Style = createGlobalStyle`

  *::selection{
    background-color: ${(props) => props.theme.red};
    color: white;
  }
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
  .Toastify__toast--error, .Toastify__toast--info, .Toastify__toast--warn, .Toastify__toast--success{
    text-align: center;
  }
  .Toastify__toast--error{
    background: #ff5e62;
  }
  .Toastify__toast--info, .Toastify__toast--success{
    background: linear-gradient(90deg, #ff5e62 0%, #ff9966 100%);
  }
  .Toastify__toast--warn{
    background:#ff9966;
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
