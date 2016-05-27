import React from 'react'
import createHistory from 'history/lib/createHashHistory'
import DirView from './DirView'

const last = xs => xs[xs.length - 1]

export default class Router extends React.Component {
  constructor(props) {
    super(props)
    this._history = null
    this._unlisten = null
    this._routerContext = {
      go: where => e => {
        e.preventDefault()
        this._history.push(where)
      }
    }
  }
  componentDidMount() {
    this._history = createHistory({ queryKey: false })
    this._unlisten = this._history.listen(location => {
      // console.log('history change', location)
      const path = location.pathname.replace(/^\/*(.*?)\/*$/, '$1').trim()

      const nodes = path.indexOf('/') !== -1 ? path.split('/') : [path]
      // console.log("nodes", nodes)
      const propStack = nodes.filter(s => s !== '').reduce((parents, node) => {
          if (parents === null) return null
          const parent = last(parents)
          const dirs = parent.dirs[node]
          if (dirs == null) return null
          return parents.concat({dirs, path: parent.path+'/'+node})
        }, [{dirs: this.props.fs, path: ''}])

      // console.log("propstack", propStack)
      if (propStack === null) {
        this._history.replace('')
      } else {
        const viewStack = propStack.map(({dirs, path}) => ({
          component: <DirView path={path} dirs={dirs}/>,
          opts: {title: path}
        }))
        // console.log("view stack", viewStack)
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
    return {router: this._routerContext }
  }
  render() {
    return <div>{this.props.children}</div>
  }
}

Router.contextTypes = { nav: React.PropTypes.object }
Router.childContextTypes = { router: React.PropTypes.object }
