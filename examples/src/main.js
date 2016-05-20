import React from 'react'
import {render} from 'react-dom'

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

render(<Navigator title="demo"><RootView/></Navigator>, window.root)


const dirs = {
  foo: {bar: null, baz: null},
  lorem: {ipsum: {quux: null}, dolor: {quux: null, aardvark: {'foo.png': null, 'bar.png': null}}},
  bla: {blub: {abc: null, def: null}, blublub: null}
}

const mapObj = (f, obj) => {
  const ret = []
  for (let k in obj) {
    if (!obj.hasOwnProperty(k)) continue
    ret.push(f(obj[k], k))
  }
  return ret
}

class DirView extends React.Component {
  toDir(name, dirs) {
    this.context.nav.push(
      <DirView path={this.props.path+"/"+name} dirs={dirs}/>,
      {title: this.props.path+"/"+name}
    )
  }
  renderDirItem(item, name) {
    return (
      <li key={name}>
        {item == null
          ? <span>{name}</span>
          : <a href="#" onClick={() => this.toDir(name, item)}>{name}</a> }
      </li>
    )
  }
  render() {
    return (
      <ul>{mapObj(this.renderDirItem.bind(this), this.props.dirs)}</ul>
    )
  }
}

DirView.contextTypes = {nav: React.PropTypes.object}

render(<Navigator title="/"><DirView path="" dirs={dirs}/></Navigator>, window.root2)
