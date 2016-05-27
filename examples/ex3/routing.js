import React from 'react'
import myro from 'myro'
import { Dashboard, Invoices, Customers, CustomerDetail } from './components'
import myroDispatcher from '../../src/myro-dispatch'

const view = (title, component, opts = {}) => ({component, opts: {...opts, title}})

export const route = myro({
  '/dashboard': {
    name: 'dashboard',
    props: { view: () => view('Home', <Dashboard/>) },
  },
  '/invoices': {
    name: 'invoices',
    props: { view: () => view('Invoices', <Invoices/>) },
  },
  '/customers': {
    name: 'customers',
    props: { view: () => view('Customers', <Customers/>) },
    routes: {
      '/:id': {
        name: 'detail',
        props: { view: ({id}) => view('Customer #' + id, <CustomerDetail id={id}/>) },
      }
    }
  }
})

export const dispatch = myroDispatcher(route)
