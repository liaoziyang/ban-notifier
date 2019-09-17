import React from 'react'
import SignIn from './SignIn'

export default <SignIn username={localStorage.getItem('username') || 'local storage is empty'}/>
