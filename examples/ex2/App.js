import React from 'react'
import DirView from './DirView'
import Navigator from '../../src'
import Router from '../../src/Router'
import style from '../common/Header.less'
import createHistory from 'history/lib/createHashHistory'

const last = xs => xs[xs.length - 1]

const history = createHistory({ queryKey: false })

const Header = (props, {nav, router}) => (
  <div className={style.navHeader}>
    {nav.isRoot() ? null :
      <a href={'#'+nav.parent().opts.title} onClick={router.go(nav.parent().opts.title)}>^</a>}
    <span>{nav.active().opts.title}</span>
  </div>
)

Header.contextTypes = {nav: React.PropTypes.object, router: React.PropTypes.object}

const dispatcher = rootFs => location => {
  const path = location.replace(/^\/*(.*?)\/*$/, '$1').trim()
  const nodes = path.indexOf('/') !== -1 ? path.split('/') : [path]
  const propStack = nodes.filter(s => s !== '').reduce((parents, node) => {
      if (parents === null) return null
      const parent = last(parents)
      const dirs = parent.dirs[node]
      if (dirs == null) return null
      return parents.concat({dirs, path: parent.path+'/'+node})
    }, [{dirs: rootFs, path: ''}])

  if (propStack === null) {
    return null
  } else {
    const viewStack = propStack.map(({dirs, path}) => ({
      component: <DirView path={path} dirs={dirs}/>,
      opts: {title: path}
    }))
    return viewStack
  }
}

export default class App extends React.Component {
  render() {
    const root = <DirView path="" dirs={this.props.fs}/>
    return (
      <Navigator title="/" root={root}>
        <Router defaultRoute="" dispatcher={dispatcher(this.props.fs)} history={history}>
          <Header/>
          <Navigator.View/>
        </Router>
      </Navigator>
    )
  }
}
