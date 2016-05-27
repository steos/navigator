import React from 'react'

const listParents = (match) => {
  if (match.parent == null) return []
  return listParents(match.parent).concat(match.parent)
}

export default class Router extends React.Component {
  constructor(props) {
    super(props)
    this._route = props.route
    this._views = props.views
    this._history = props.history
    this._unlisten = null
    this._routerContext = {
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
      const routeMatch = this._route(location.pathname)
      // console.log('route match', routeMatch)
      if (routeMatch == null) {
        this._history.replace(this._route[defaultRoute]())
      } else {
        const parents = listParents(routeMatch)
        const viewStack = parents.concat(routeMatch).map(match =>
          routeViews[match.name](match.params))
        this.context.nav.replaceStack(viewStack)
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
