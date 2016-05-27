import React from 'react'
import { route } from './routing'

export const Link = (props, {router}) =>
  <a href={router.href(props.href)} onClick={router.go(props.href)}>{props.children}</a>

Link.contextTypes = {router: React.PropTypes.object}

export const Dashboard = (props) => <div>dashboard</div>

export const CustomerDetail = (props) => <div>Customer details for Customer {props.id}</div>

export const Customers = (props, {router}) => (
  <ul>
    <li><Link href={route.customers.detail({id: 1})}>Customer 1</Link></li>
    <li><Link href={route.customers.detail({id: 2})}>Customer 2</Link></li>
  </ul>
)

Customers.contextTypes = {router: React.PropTypes.object}

export const Invoices = (props) => <div>invoices</div>
