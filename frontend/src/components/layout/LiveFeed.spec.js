import React from 'react'
import LiveFeed from './LiveFeed'
import { mount } from 'enzyme'

describe('App', () => {
  it('renders correctly', () => {
    expect(mount(createComponent())).toMatchSnapshot()
  })
})

function createComponent(props){
  const defaultProps = {}
  return <LiveFeed {...defaultProps} {...props}/>
}
