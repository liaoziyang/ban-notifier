/* eslint-disable react/display-name */
import React from 'react'
import PropTypes from 'prop-types'

const rrd = require('react-router-dom')
rrd.BrowserRouter = ({ children }) => <div>{children}</div>
rrd.BrowserRouter.propTypes = { children: PropTypes.node.isRequired }

module.exports = rrd
