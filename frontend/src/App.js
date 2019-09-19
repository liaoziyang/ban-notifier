import React, { Fragment } from 'react'
import Routing from './components/Routing'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'normalize.css'
import Style from './constants/style'

export default function App(){
  return (
    <Fragment>
      {/* needed to serve popup notifications */}
      <ToastContainer/>
      <Style/>
      <Routing/>
    </Fragment>
  )
}
