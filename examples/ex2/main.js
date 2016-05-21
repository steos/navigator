import React from 'react'
import {render} from 'react-dom'

import Navigator from '../../src'
import DirView from './DirView'

const dirs = {
  foo: {bar: null, baz: null},
  lorem: {ipsum: {quux: null}, dolor: {quux: null, aardvark: {'foo.png': null, 'bar.png': null}}},
  bla: {blub: {abc: null, def: null}, blublub: null}
}

render(
  <Navigator title="/">
    <DirView path="" dirs={dirs}/>
  </Navigator>,
  window.root
)
