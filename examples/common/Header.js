import React from 'react'
import style from './Header.less'

const Header = (props, {nav}) => (
  <div className={style.navHeader}>
    {nav.isRoot() ? null :
      <a href="#" onClick={e => {e.preventDefault(); nav.pop()}}>&lt;</a>}
    <span>{nav.active().opts.title}</span>
  </div>
)

Header.contextTypes = {nav: React.PropTypes.object}

export default Header
