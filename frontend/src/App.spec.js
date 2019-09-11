import React from 'react'
import App from './App'
import { mount } from 'enzyme'

describe('App', () => {
  it('renders correctly', () => {
    expect(mount(createComponent())).toMatchSnapshot()
  })
})

function createComponent(props){
  const defaultProps = {}
  return <App {...defaultProps} {...props}/>
}
