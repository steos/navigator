import React from 'react'

const last = xs => xs[xs.length - 1]

export default class Navigator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {views: [{component: props.root, opts: {title: props.title || ""} }]}
    this.nav = {
      push: (component, opts = {}) => {
        // console.log('router push', component, opts)
        this.setState({views: [...this.state.views, {component, opts}]})
      },
      pop: () => {
        // console.log('router pop')
        if (this.isRoot()) throw new Error('cannot pop root')
        const view = this.activeView()
        this.setState({views: this.state.views.slice(0, -1)})
        return view
      },
      popAll: (component, opts = {}) => {
        this.setState({views: [{component, opts}]})
      },
      replaceStack: (views) => {
        this.setState({views})
      },
      active: () => this.activeView(),
      isRoot: () => this.isRoot(),
      map: (f) => this.state.views.map(({component, opts}) => f(opts, component))
    }
  }
  getChildContext() {
    return {nav: this.nav}
  }
  activeView() {
    return last(this.state.views)
  }
  isRoot() {
    return this.state.views.length === 1
  }
  render() {
    return <div>{this.props.children}</div>
  }
}

Navigator.childContextTypes = {
  nav: React.PropTypes.object
}

const View = (props, {nav}) => nav.active().component
View.propTypes = {children: React.PropTypes.object}
View.contextTypes = {nav: React.PropTypes.object}

Navigator.View = View
