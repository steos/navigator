import React, { Component, PropTypes } from 'react'

export default class Router extends Component {
  constructor(props) {
    super(props)
    this.history = props.history
    this.unlisten = null
    this.dispatch = props.dispatcher
    this.routerContext = {
      href: s => this.history.createHref(s),
      push: location => this.history.push(location),
      go: location => e => {
        e.preventDefault()
        this.history.push(location)
      },
    }
  }
  getChildContext() {
    return { router: this.routerContext }
  }
  componentDidMount() {
    const { defaultRoute } = this.props
    this.unlisten = this.history.listen(location => {
      const viewStack = this.dispatch(location.pathname)
      if (viewStack !== null) {
        this.context.nav.replaceStack(viewStack)
      } else {
        this.history.replace(defaultRoute)
      }
    })
  }
  componentWillUnmount() {
    if (this.unlisten !== null) {
      this.unlisten()
      this.unlisten = null
    }
  }
  render() {
    return <div>{this.props.children}</div>
  }
}

Router.propTypes = {
  history: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
  dispatcher: PropTypes.func.isRequired,
  defaultRoute: PropTypes.string.isRequired,
}

Router.contextTypes = {
  nav: PropTypes.object,
}

Router.childContextTypes = {
  router: PropTypes.object,
}
