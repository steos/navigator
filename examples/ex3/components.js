import React, { Component, PropTypes } from 'react'
import { connectRouter } from '../../src'

export const Link = connectRouter(props =>
  <a href={props.router.href(props.href)} onClick={props.router.go(props.href)}>{props.children}</a>
)

class HelloFormElement extends Component {
  constructor(props) {
    super(props)
    this.state = { name: 'World' }
  }
  render() {
    const sayHello = () => {
      this.props.router.push(this.props.route.hello({ name: this.state.name }))
      this.setState({ name: '' })
    }
    return (
      <div>
        Say Hello
        <input
          type="text"
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <button onClick={sayHello}>now!</button>
      </div>
    )
  }
}

HelloFormElement.propTypes = {
  route: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
}

export const HelloForm = connectRouter(HelloFormElement)

export const Dashboard = () => (
  <div>
    <p>dashboard</p>
    <HelloForm />
  </div>
)

export const CustomerDetail = (props) => <div>Customer details for Customer {props.id}</div>

CustomerDetail.propTypes = {
  id: PropTypes.string.isRequired,
}

export const Customers = connectRouter((props) => (
  <ul>
    <li><Link href={props.route.customers.detail({ id: 1 })}>Customer 1</Link></li>
    <li><Link href={props.route.customers.detail({ id: 2 })}>Customer 2</Link></li>
  </ul>
))

export const Invoices = () => <div>invoices</div>
