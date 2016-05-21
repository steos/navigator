import React from 'react'
import {render} from 'react-dom'

import Navigator from '../../src'
import DirView from './DirView'
import ExampleApp from './ExampleApp'

// minimal example

render(<Navigator title="demo"><ExampleApp/></Navigator>, window.root)

// directory view example

const dirs = {
  foo: {bar: null, baz: null},
  lorem: {ipsum: {quux: null}, dolor: {quux: null, aardvark: {'foo.png': null, 'bar.png': null}}},
  bla: {blub: {abc: null, def: null}, blublub: null}
}

render(<Navigator title="/"><DirView path="" dirs={dirs}/></Navigator>, window.root2)
