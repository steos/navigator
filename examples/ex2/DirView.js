import React, { Component, PropTypes } from 'react'
import { connectRouter } from '../../src'

const mapObj = (f, obj) => {
  const ret = []
  /* eslint-disable no-restricted-syntax, no-prototype-builtins, no-continue */
  for (const k in obj) {
    if (!obj.hasOwnProperty(k)) continue
    ret.push(f(obj[k], k))
  }
  return ret
}

class DirView extends Component {
  renderDirItem(item, name) {
    const { path, router: { go } } = this.props
    const href = `${path}/${name}`
    return (
      <li key={name}>
        {item == null
          ? <span>{name}</span>
          : <a href={`#${href}`} onClick={go(href)}>{name}</a>}
      </li>
    )
  }
  render() {
    return (
      <ul>{mapObj(this.renderDirItem.bind(this), this.props.dirs)}</ul>
    )
  }
}

DirView.propTypes = {
  path: PropTypes.string.isRequired,
  router: PropTypes.object.isRequired,
  dirs: PropTypes.object.isRequired,
}

export default connectRouter(DirView)
