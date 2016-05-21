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
  toDir(name, dirs) {
    this.context.nav.push(
      <DirView path={this.props.path+"/"+name} dirs={dirs}/>,
      {title: this.props.path+"/"+name}
    )
  }
  renderDirItem(item, name) {
    return (
      <li key={name}>
        {item == null
          ? <span>{name}</span>
          : <a href="#" onClick={() => this.toDir(name, item)}>{name}</a> }
      </li>
    )
  }
  render() {
    return (
      <ul>{mapObj(this.renderDirItem.bind(this), this.props.dirs)}</ul>
    )
  }
}

DirView.contextTypes = {nav: React.PropTypes.object}
