import React from 'react'
import R from 'ramda'
import Navigator from '../../src'
import createHistory from 'history/lib/createHashHistory'
import myro from 'myro'
import Router from '../../src/Router'
import myroDispatcher from '../../src/myro-dispatch'

const history = createHistory({ queryKey: false })

const viewRoutes = {
  '/dashboard': {
    name: 'dashboard',
  },
  '/invoices': {
    name: 'invoices',
  },
  '/customers': {
    name: 'customers',
    routes: {
      '/:id': 'detail'
    }
  }
}

const view = (title, component, opts = {}) => ({component, opts: {...opts, title}})

const routeViews = {
  'dashboard': () => view('Home', <Dashboard/>, {href: route.dashboard()}),
  'invoices': () => view('Invoices', <Invoices/>, {href: route.invoices()}),
  'customers': () => view('Customers', <Customers/>, {href: route.customers()}),
  'customers.detail': ({id}) => view('Customer #'+id, <CustomerDetail id={id}/>, {href: route.customers.detail({id})})
}

const route = myro(viewRoutes)

const Link = (props, {router}) =>
  <a href={history.createHref(props.href)} onClick={router.go(props.href)}>{props.children}</a>

Link.contextTypes = {router: React.PropTypes.object}

const Dashboard = (props) => <div>dashboard</div>

const CustomerDetail = (props) => <div>Customer details for Customer {props.id}</div>

const Customers = (props, {router}) => (
  <ul>
    <li><Link href={route.customers.detail({id: 1})}>Customer 1</Link></li>
    <li><Link href={route.customers.detail({id: 2})}>Customer 2</Link></li>
  </ul>
)

Customers.contextTypes = {router: React.PropTypes.object}

const Invoices = (props) => <div>invoices</div>

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

const dispatch = myroDispatcher(route, routeViews)

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
