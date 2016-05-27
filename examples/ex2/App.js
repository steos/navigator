import React from 'react'
import DirView from './DirView'
import Navigator from '../../src'
import Router from './Router'
import style from '../common/Header.less'

const Header = (props, {nav, router}) => (
  <div className={style.navHeader}>
    {nav.isRoot() ? null :
      <a href={'#'+nav.parent().opts.title} onClick={router.go(nav.parent().opts.title)}>^</a>}
    <span>{nav.active().opts.title}</span>
  </div>
)

Header.contextTypes = {nav: React.PropTypes.object, router: React.PropTypes.object}

export default class App extends React.Component {
  render() {
    const root = <DirView path="" dirs={this.props.fs}/>
    return (
      <Navigator title="/" root={root}>
        <Router fs={this.props.fs}>
          <Header/>
          <Navigator.View/>
        </Router>
      </Navigator>
    )
  }
}
