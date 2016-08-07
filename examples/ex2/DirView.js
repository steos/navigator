import React from 'react'
import { connectRouter } from '../../src'

const mapObj = (f, obj) => {
  const ret = []
  for (let k in obj) {
    if (!obj.hasOwnProperty(k)) continue
    ret.push(f(obj[k], k))
  }
  return ret
}

class DirView extends React.Component {
  renderDirItem(item, name) {
    const {path, router: {go}} = this.props
    const href = path+'/'+name
    return (
      <li key={name}>
        {item == null
          ? <span>{name}</span>
          : <a href={'#'+href} onClick={go(href)}>{name}</a>}
      </li>
    )
  }
  render() {
    return (
      <ul>{mapObj(this.renderDirItem.bind(this), this.props.dirs)}</ul>
    )
  }
}

export default connectRouter(DirView)
