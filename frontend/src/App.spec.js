import React from 'react'
import App from './App'
import { mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'

describe('App', () => {
  it('renders correctly', () => {
    expect(mount(<Router initialEntries={['/']}>{createComponent()}</Router>)).toMatchSnapshot()
  })
})

function createComponent(props){
  const defaultProps = {}
  return <App {...defaultProps} {...props}/>
}
