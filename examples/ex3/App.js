import React from 'react'
import R from 'ramda'
import Navigator from '../../src'
import createHistory from 'history/lib/createHashHistory'
import myro from 'myro'
import Router from '../../src/Router'

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

const view = (title, component) => ({component, opts: {title}})

const routeViews = {
  'dashboard': () => view('Home', <Dashboard/>),
  'invoices': () => view('Invoices', <Invoices/>),
  'customers': () => view('Customers', <Customers/>),
  'customers.detail': ({id}) => view('Customer #'+id, <CustomerDetail id={id}/>)
}

const route = myro(viewRoutes)

const Dashboard = (props) => <div>dashboard</div>

const CustomerDetail = (props) => <div>Customer details for Customer {props.id}</div>

const Customers = (props, {router}) => (
  <ul>
    <li><a href="#" onClick={router.go(route.customers.detail({id: 1}))}>Customer 1</a></li>
    <li><a href="#" onClick={router.go(route.customers.detail({id: 2}))}>Customer 2</a></li>
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
    <li style={liStyle}><a href="#" onClick={router.go(route.dashboard())}>Home</a></li>
    <li style={liStyle}><a href="#" onClick={router.go(route.customers())}>Customers</a></li>
    <li style={liStyle}><a href="#" onClick={router.go(route.invoices())}>Invoices</a></li>
  </ul>
)
MainMenu.contextTypes = {router: React.PropTypes.object}

const Breadcrumbs = (props, {nav}) => nav.isRoot() ? null : (
  <div>{R.intersperse(<span>&nbsp;/&nbsp;</span>,
    nav.map(({title}) => <a href="#">{title}</a>)).map((elem, key) => React.cloneElement(elem, {key}))}</div>
)
Breadcrumbs.contextTypes = {nav: React.PropTypes.object}

const Header = (props, {nav}) => (
  <header>
    <div style={{backgroundColor:'steelblue', padding:'12px', color:'white', fontFamily:'sans-serif'}}>
      Initech CRM - {nav.active().opts.title}
    </div>
    <Breadcrumbs/>
  </header>
)
Header.contextTypes = {nav: React.PropTypes.object}


export default class App extends React.Component {
  render() {
    return (
      <Navigator title="Home" root={<Dashboard/>}>
        <Router history={history} route={route} views={routeViews} defaultRoute="dashboard">
          <Header/>
          <MainMenu/>
          <Navigator.View/>
        </Router>
      </Navigator>
    )
  }
}
