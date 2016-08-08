import React from 'react'
import { connectRouter } from '../../src'
import style from './Header.less'

const Header = connectRouter(({nav}) => (
  <div className={style.navHeader}>
    {nav.isRoot() ? null :
      <a href="#" onClick={e => {e.preventDefault(); nav.pop()}}>&lt;</a>}
    <span>{nav.active().opts.title}</span>
  </div>
))

export default Header
