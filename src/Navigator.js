import React from 'react'

import style from './Navigator.less'

const last = xs => xs[xs.length - 1]

export default class Navigator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {views: [{component: props.children, opts: {title: props.title || ""} }]}
    this.nav = {
      push: (component, opts = {}) => {
        // console.log('router push', component, opts)
        this.setState({views: [...this.state.views, {component, opts}]})
      },
      pop: () => {
        // console.log('router pop')
        const view = this.activeView()
        this.setState({views: this.state.views.slice(0, -1)})
        return view
      }
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
    return (
      <div>
        {this.props.hideNav === true ? null : this.renderNavHeader()}
        {this.activeView().component}
      </div>
    )
  }

  renderNavHeader() {
    return (
      <div className={style.navHeader}>
        {this.isRoot() ? null :
          <a href="#" onClick={e => {e.preventDefault(); this.nav.pop()}}>&lt;</a>}
        <span>{this.activeView().opts.title}</span>
      </div>
    )
  }
}

Navigator.childContextTypes = {
  nav: React.PropTypes.object
}
