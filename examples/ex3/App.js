import React from 'react'
import R from 'ramda'
import createHistory from 'history/lib/createHashHistory'
import Navigator, { connectRouter } from '../../src'
import Router from '../../src/Router'
import { route, dispatch } from './routing'
import { Link } from './components'

const history = createHistory({ queryKey: false })

const liStyle = {
  display: 'inline',
  marginRight: '12px',
  fontFamily: 'sans-serif',
}
const MainMenu = connectRouter(() => (
  <ul>
    <li style={liStyle}><Link href={route.dashboard()}>Home</Link></li>
    <li style={liStyle}><Link href={route.customers()}>Customers</Link></li>
    <li style={liStyle}><Link href={route.invoices()}>Invoices</Link></li>
  </ul>
))

const Breadcrumbs = connectRouter(({ nav }) => {
  if (nav.isRoot()) return null
  const links = nav.map(({ title, href }) => <Link href={href}>{ title }</Link>)
  const crumbs = R.intersperse(<span>&nbsp;/&nbsp;</span>, links)
  return <div>{crumbs.map((elem, key) => React.cloneElement(elem, { key }))}</div>
})

const style = {
  backgroundColor: 'steelblue',
  padding: '12px',
  color: 'white',
  fontFamily: 'sans-serif',
}

const Header = connectRouter(({ nav }) => (
  <header>
    <div style={style}>
      Initech CRM {nav.active() ? <span> - {nav.active().opts.title}</span> : null }
    </div>
    <Breadcrumbs />
  </header>
))


export default class App extends React.Component {
  getChildContext() {
    return { route: Object.assign({}, route) }
  }
  render() {
    return (
      <Navigator>
        <Router
          history={history}
          dispatcher={dispatch}
          defaultRoute={route.dashboard()}
        >
          <Header />
          <MainMenu />
          <Navigator.View />
        </Router>
      </Navigator>
    )
  }
}

App.childContextTypes = { route: React.PropTypes.object }
