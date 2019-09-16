import React, { Fragment } from 'react'
import Routing from './components/Routing'
// import 'normalize.css' FIX THIS LATER
import Style from './constants/style'

export default function App(){
  return (
    <Fragment>
      <Style/>
      <Routing/>
    </Fragment>
  )
}
