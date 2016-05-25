import React from 'react'
import Navigator from '../../src'

const Dashboard = (props) => <div>dashboard</div>

const CustomerDetail = (props) => <div>Customer details for Customer {props.nr}</div>

const Customers = (props, {nav}) => (
  <ul>
    <li><a href="#" onClick={e => {e.preventDefault();nav.push(<CustomerDetail nr={1}/>, {title: 'Customer #1'})}}>Customer 1</a></li>
    <li><a href="#" onClick={e => {e.preventDefault();nav.push(<CustomerDetail nr={2}/>, {title: 'Customer #2'})}}>Customer 2</a></li>
  </ul>
)

Customers.contextTypes = {nav: React.PropTypes.object}

const Invoices = (props) => <div>invoices</div>

const show = (nav, title, component) => e => {
  e.preventDefault()
  nav.popAll(component, {title})
}

const liStyle = {
  display:'inline',
  marginRight:'12px',
  fontFamily:'sans-serif',
}
const MainMenu = (props, {nav}) => (
  <ul>
    <li style={liStyle}><a href="#" onClick={show(nav, 'Home', <Dashboard/>)}>Home</a></li>
    <li style={liStyle}><a href="#" onClick={show(nav, 'Customers', <Customers/>)}>Customers</a></li>
    <li style={liStyle}><a href="#" onClick={show(nav, 'Invoices', <Invoices/>)}>Invoices</a></li>
  </ul>
)
MainMenu.contextTypes = {nav: React.PropTypes.object}

const Header = (props, {nav}) => (
  <div style={{backgroundColor:'steelblue', padding:'12px', color:'white', fontFamily:'sans-serif'}}>
    Initech CRM - {nav.active().opts.title}
  </div>
)
Header.contextTypes = {nav: React.PropTypes.object}

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navigator title="Home" root={<Dashboard/>}>
          <Header/>
          <MainMenu/>
          <Navigator.View/>
        </Navigator>
      </div>
    )
  }
}
