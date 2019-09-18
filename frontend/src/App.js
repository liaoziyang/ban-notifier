import React, { Fragment } from 'react'
import Routing from './components/Routing'
import 'normalize.css'
import Style from './constants/style'

export default function App(){
  return (
    <Fragment>
      <Style/>
      <Routing/>
    </Fragment>
  )
}
