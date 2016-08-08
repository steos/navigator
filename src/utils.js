import React, { Component, PropTypes } from 'react'

export const last = xs => xs[xs.length - 1]

export const connectRouter = Comp => {
  // eslint-disable-next-line react/prefer-stateless-function
  class RouterComponent extends Component {
    render() {
      const props = this.props
      const { route = {}, router = {}, nav } = this.context
      return <Comp {...props} route={route} router={router} nav={nav} />
    }
  }

  RouterComponent.contextTypes = {
    router: PropTypes.object,
    route: PropTypes.object,
    nav: React.PropTypes.object.isRequired,
  }

  return RouterComponent
}
