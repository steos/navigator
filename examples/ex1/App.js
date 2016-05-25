
import React from 'react'
import Navigator from '../../src'
import Header from '../common/Header'

const show = (nav, title, component) => (e) => {
  e.preventDefault()
  nav.push(component, {title})
}

const OtherView = (props, {nav}) => (
  <p>
    other view message: {props.message}
    <br/>
    <a href="#" onClick={show(nav, "lorem", <AnotherView/>)}>
      another view
    </a>
  </p>
)

OtherView.contextTypes = {nav: React.PropTypes.object}

const AnotherView = props => <p>another view</p>

const RootView = (props, {nav}) => (
  <p>
    root view
    <a href="#" onClick={show(nav, "other view", <OtherView message="hello"/>)}>
      <br/>
      other view
    </a>
  </p>
)

RootView.contextTypes = {nav: React.PropTypes.object}

const App = (props) => (
  <Navigator title="demo" root={<RootView/>}>
    <Header/>
    <Navigator.View/>
  </Navigator>
)

export default App
