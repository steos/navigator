import React from 'react'

export default class Router extends React.Component {
  constructor(props) {
    super(props)
    this._history = props.history
    this._unlisten = null
    this._dispatch = props.dispatcher
    this._routerContext = {
      href: s => this._history.createHref(s),
      push: location => this._history.push(location),
      go: location => e => {
        e.preventDefault()
        this._history.push(location)
      }
    }
  }
  componentDidMount() {
    const { defaultRoute, views: routeViews } = this.props
    this._unlisten = this._history.listen(location => {
      const viewStack = this._dispatch(location.pathname)
      if (viewStack !== null) {
        this.context.nav.replaceStack(viewStack)
      } else {
        this._history.replace(defaultRoute)
      }
    })
  }
  componentWillUnmount() {
    if (this._unlisten !== null) {
      this._unlisten()
      this._unlisten = null
    }
  }
  getChildContext() {
    return { router: this._routerContext }
  }
  render() {
    return <div>{this.props.children}</div>
  }
}

Router.propTypes = {
  history: React.PropTypes.object.isRequired
}

Router.contextTypes = {
  nav: React.PropTypes.object
}

Router.childContextTypes = {
  router: React.PropTypes.object
}
