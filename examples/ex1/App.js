import React from 'react'
import Navigator, { connectRouter } from '../../src'
import Header from '../common/Header'

const show = (nav, title, component) => (e) => {
  e.preventDefault()
  nav.push(component, { title })
}

const OtherView = connectRouter(({ message, nav }) => (
  <p>
    other view message: {message}
    <br />
    <a href="#" onClick={show(nav, 'lorem', <AnotherView />)}>
      another view
    </a>
  </p>
))

const AnotherView = () => <p>another view</p>

const RootView = connectRouter(({ nav }) => (
  <p>
    root view
    <a href="#" onClick={show(nav, 'other view', <OtherView message="hello" />)}>
      <br />
      other view
    </a>
  </p>
))

const App = () => (
  <Navigator title="demo" root={<RootView />}>
    <Header />
    <Navigator.View />
  </Navigator>
)

export default App
