import myro from 'myro'

export default myro({
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
})
