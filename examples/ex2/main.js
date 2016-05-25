import React from 'react'
import {render} from 'react-dom'

import Navigator from '../../src'
import DirView from './DirView'
import Header from '../common/Header'

const dirs = {
  foo: {bar: null, baz: null},
  lorem: {ipsum: {quux: null}, dolor: {quux: null, aardvark: {'foo.png': null, 'bar.png': null}}},
  bla: {blub: {abc: null, def: null}, blublub: null}
}

const root = <DirView path="" dirs={dirs}/>

render(
  <Navigator title="/" root={root}>
    <Header/>
    <Navigator.View/>
  </Navigator>,
  window.root
)
