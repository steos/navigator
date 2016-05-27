import React from 'react'

const mapObj = (f, obj) => {
  const ret = []
  for (let k in obj) {
    if (!obj.hasOwnProperty(k)) continue
    ret.push(f(obj[k], k))
  }
  return ret
}

export default class DirView extends React.Component {
  renderDirItem(item, name) {
    const {router: {go}} = this.context
    const href = this.props.path+'/'+name
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

DirView.contextTypes = {router: React.PropTypes.object}
