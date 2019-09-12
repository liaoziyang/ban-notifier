import React from 'react'
import ReactDOM from 'react-dom'
import Routing from './Routing'
import { mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

it('router', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Router>
      <Routing/>
    </Router>,
    div)
  ReactDOM.unmountComponentAtNode(div)
})

describe('path routiong', () => {
  it('Invalid path, should redirect to 404', () => {
    const component = mount(
      <Router initialEntries={['/thispathdoesnotexist']}>
        <Routing/>
      </Router>
    )
    expect(component.find(NotFound)).toHaveLength(1)
    expect(component.find(Home)).toHaveLength(0)
  })
  it('Valid path should find home', () => {
    const component = mount(
      <Router initialEntries={['/']}>
        <Routing/>
      </Router>
    )
    expect(component.find(NotFound)).toHaveLength(0)
    expect(component.find(Home)).toHaveLength(1)
  })
})
