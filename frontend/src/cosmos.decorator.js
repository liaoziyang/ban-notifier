import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from './constants/theme'
import { CosmosGlobalStyle } from './constants/globalStyle'

const decorator = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CosmosGlobalStyle>
      <Router>
        { children }
      </Router>
    </CosmosGlobalStyle>
  </ThemeProvider>
)

decorator.propTypes = {
  children: PropTypes.node.isRequired
}

export default decorator
