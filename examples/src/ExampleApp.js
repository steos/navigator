
import React from 'react'
import Navigator from '../../src'

const OtherView = (props, context) => (
  <p>
    other view message: {props.message}
    <br/>
    <a href="#" onClick={() => context.nav.push(
        <AnotherView/>, {title: "lorem"})}>
      another view
    </a>
  </p>
)

OtherView.contextTypes = {nav: React.PropTypes.object}

const AnotherView = props => <p>another view</p>

const RootView = (props, context) => (
  <p>
    root view
    <a href="#" onClick={() => context.nav.push(
        <OtherView message="hello"/>, {title: "other view"})}>
      <br/>
      other view
    </a>
  </p>
)

RootView.contextTypes = {nav: React.PropTypes.object}

const App = (props) => (
  <Navigator title="demo">
    <RootView/>
  </Navigator>
)

export default App
