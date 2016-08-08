import React, { Component, PropTypes } from 'react'
import { last } from './utils'

/* eslint-disable no-shadow */

export default class Navigator extends Component {
  constructor(props) {
    super(props)
    const views = props.root
      // TODO opts title shouldn't be here
      ? [{ component: props.root, opts: { title: props.title || '' } }]
      : []
    this.state = { views }
    this.nav = {
      push: (component, opts = {}) => {
        // console.log('router push', component, opts)
        this.setState({ views: [...this.state.views, { component, opts }] })
      },
      pop: () => {
        // console.log('router pop')
        if (this.isRoot()) throw new Error('cannot pop root')
        const view = this.activeView()
        this.setState({ views: this.state.views.slice(0, -1) })
        return view
      },
      popAll: (component, opts = {}) => {
        this.setState({ views: [{ component, opts }] })
      },
      replaceStack: views => {
        this.setState({ views })
      },
      active: () => this.activeView(),
      hasContent: () => this.state.views.length > 0,
      isRoot: () => this.isRoot(),
      map: (f) => this.state.views.map(({ component, opts }) => f(opts, component)),
      parent: () => (this.isRoot() ? null : this.state.views[this.state.views.length - 2]),
    }
  }
  getChildContext() {
    return { nav: this.nav }
  }
  activeView() {
    return this.state.views.length > 0 ? last(this.state.views) : null
  }
  isRoot() {
    return this.state.views.length === 1
  }
  render() {
    return <div>{this.props.children}</div>
  }
}

Navigator.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  root: PropTypes.object,
  title: PropTypes.string,
}

Navigator.childContextTypes = {
  nav: React.PropTypes.object,
}

const View = (props, { nav }) => (nav.active() ? nav.active().component : null)
View.propTypes = { children: React.PropTypes.object }
View.contextTypes = { nav: React.PropTypes.object }

Navigator.View = View
