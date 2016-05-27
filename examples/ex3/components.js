import React from 'react'

export const Link = (props, {router}) =>
  <a href={router.href(props.href)} onClick={router.go(props.href)}>{props.children}</a>

Link.contextTypes = {router: React.PropTypes.object}

class HelloForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {name: 'World'}
  }
  render() {
    const sayHello = () => {
      this.context.router.push(this.context.route.hello({name: this.state.name}))
      this.setState({name: ''})
    }
    return (
      <div>
        Say Hello
        <input type="text" value={this.state.name} onChange={e => this.setState({name: e.target.value})}/>
        <button onClick={sayHello}>now!</button>
      </div>
    )
  }
}
HelloForm.contextTypes = {route: React.PropTypes.object, router: React.PropTypes.object}

export const Dashboard = (props) => (
  <div>
    <p>dashboard</p>
    <HelloForm/>
  </div>
)

export const CustomerDetail = (props) => <div>Customer details for Customer {props.id}</div>

export const Customers = (props, {router, route}) => (
  <ul>
    <li><Link href={route.customers.detail({id: 1})}>Customer 1</Link></li>
    <li><Link href={route.customers.detail({id: 2})}>Customer 2</Link></li>
  </ul>
)

Customers.contextTypes = {router: React.PropTypes.object, route: React.PropTypes.object}

export const Invoices = (props) => <div>invoices</div>
