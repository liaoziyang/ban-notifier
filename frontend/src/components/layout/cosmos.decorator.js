import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import theme from '../../constants/theme'

const decorator = ({ children }) => (<ThemeProvider theme={theme}>{ children }</ThemeProvider>)

decorator.propTypes = {
  children: PropTypes.node.isRequired
}

export default decorator
