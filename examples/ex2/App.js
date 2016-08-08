import React, { PropTypes } from 'react'
import createHistory from 'history/lib/createHashHistory'
import DirView from './DirView'
import Navigator, { connectRouter, last } from '../../src'
import Router from '../../src/Router'
import style from '../common/Header.less'

const history = createHistory({ queryKey: false })

const Header = connectRouter(({ nav, router }) => (!nav.hasContent() ? null : (
  <div className={style.navHeader}>
    {nav.isRoot() ? null :
      <a href={`#${nav.parent().opts.title}`} onClick={router.go(nav.parent().opts.title)}>^</a>}
    <span>{nav.isRoot() ? '/' : nav.active().opts.title}</span>
  </div>
)))

const dispatcher = rootFs => location => {
  const path = location.replace(/^\/*(.*?)\/*$/, '$1').trim()
  const nodes = path.indexOf('/') !== -1 ? path.split('/') : [path]
  const propStack = nodes.filter(s => s !== '').reduce((parents, node) => {
    if (parents === null) return null
    const parent = last(parents)
    const dirs = parent.dirs[node]
    if (dirs == null) return null
    return parents.concat({ dirs, path: `${parent.path}/${node}` })
  }, [{ dirs: rootFs, path: '' }])

  if (propStack === null) {
    return null
  }
  // eslint-disable-next-line no-shadow
  const viewStack = propStack.map(({ dirs, path }) => ({
    component: <DirView path={path} dirs={dirs} />,
    opts: { title: path },
  }))
  return viewStack
}

const App = ({ fs }) => (
  <Navigator>
    <Router defaultRoute="" dispatcher={dispatcher(fs)} history={history}>
      <Header />
      <Navigator.View />
    </Router>
  </Navigator>
)

App.propTypes = {
  fs: PropTypes.object.isRequired,
}

export default App
