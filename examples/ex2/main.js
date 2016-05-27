import React from 'react'
import {render} from 'react-dom'

import App from './App'

const dirs = {
  foo: {bar: null, baz: null},
  lorem: {ipsum: {quux: null}, dolor: {quux: null, aardvark: {'foo.png': null, 'bar.png': null}}},
  bla: {blub: {abc: null, def: null}, blublub: null}
}

render(<App fs={dirs}/>, window.root)
