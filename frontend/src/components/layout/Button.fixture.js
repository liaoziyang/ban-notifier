import React from 'react'
import Button, { FetchButton } from './Button'
export default {
  red:            <Button colored text="sign up"/>,
  white:          <Button colored={false} text="sign in"/>,
  spinningButton: <FetchButton colored submit={{ submitted: true, successful: false }} text="click me"/>,
  successButton:  <FetchButton colored submit={{ submitted: true, successful: true }} text="success"/>
}
