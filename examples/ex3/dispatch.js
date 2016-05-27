
import React from 'react'
import myroDispatcher from '../../src/myro-dispatch'
import { Dashboard, Invoices, Customers, CustomerDetail } from './components'
import route from './route'

const view = (title, component, opts = {}) => ({component, opts: {...opts, title}})

export default myroDispatcher(route, {
  'dashboard': () =>
    view('Home', <Dashboard/>, {href: route.dashboard()}),

  'invoices': () =>
    view('Invoices', <Invoices/>, {href: route.invoices()}),

  'customers': () =>
    view('Customers', <Customers/>, {href: route.customers()}),

  'customers.detail': ({id}) =>
    view('Customer #'+id, <CustomerDetail id={id}/>, {href: route.customers.detail({id})})
})
