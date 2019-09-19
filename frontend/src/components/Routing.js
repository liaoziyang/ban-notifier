import React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import Home from './pages/Home'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import NotFound from './pages/NotFound'

// checks if history exists
const supportsHistory = 'pushState' in window.history
export default function Routing(){
  return (
    <Router forceRefresh={!supportsHistory}>
      <Switch>
        <Route component={Home} exact path="/"/>
        <Route component={SignInPage} path="/signin"/>
        <Route component={SignUpPage} path="/signup"/>
        <Route component={NotFound}/>
      </Switch>
    </Router>
  )
}
