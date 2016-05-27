import React from 'react'
import R from 'ramda'
import Navigator from '../../src'
import createHistory from 'history/lib/createHashHistory'
import Router from '../../src/Router'
import { route, dispatch } from './routing'
import { Link, Dashboard, Customers, CustomerDetail, Invoices } from './components'

const history = createHistory({ queryKey: false })

const liStyle = {
  display:'inline',
  marginRight:'12px',
  fontFamily:'sans-serif',
}
const MainMenu = (props, {router}) => (
  <ul>
    <li style={liStyle}><Link href={route.dashboard()}>Home</Link></li>
    <li style={liStyle}><Link href={route.customers()}>Customers</Link></li>
    <li style={liStyle}><Link href={route.invoices()}>Invoices</Link></li>
  </ul>
)
MainMenu.contextTypes = {router: React.PropTypes.object}

const Breadcrumbs = (props, {nav}) => {
  if (nav.isRoot()) return null
  const links = nav.map(({title, href}) => <Link href={href}>{title}</Link>)
  const crumbs = R.intersperse(<span>&nbsp;/&nbsp;</span>, links)
  return <div>{crumbs.map((elem, key) => React.cloneElement(elem, {key}))}</div>
}

Breadcrumbs.contextTypes = {nav: React.PropTypes.object}

const Header = (props, {nav}) => (
  <header>
    <div style={{backgroundColor:'steelblue', padding:'12px', color:'white', fontFamily:'sans-serif'}}>
      Initech CRM {nav.active() ? <span> - {nav.active().opts.title}</span> : null }
    </div>
    <Breadcrumbs/>
  </header>
)
Header.contextTypes = {nav: React.PropTypes.object}

export default class App extends React.Component {
  render() {
    return (
      <Navigator>
        <Router history={history}
                dispatcher={dispatch}
                defaultRoute={route.dashboard()}>
          <Header/>
          <MainMenu/>
          <Navigator.View/>
        </Router>
      </Navigator>
    )
  }
}
