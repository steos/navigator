
const listParents = (match) => {
  if (match.parent == null) return []
  return listParents(match.parent).concat(match.parent)
}

const resolveHref = (route, name, params) =>
  name.split('.').reduce((obj, key) => obj[key], route)(params)

const dispatcher = route => path => {
  const routeMatch = route(path)
  if (routeMatch == null) {
    return null
  }

  const parents = listParents(routeMatch)
  const viewStack = parents.concat(routeMatch).map(match => {
    const { component, opts } = match.props.view(match.params)
    return { component, opts: { ...opts, href: resolveHref(route, match.name, match.params) } }
  })
  return viewStack
}

export default dispatcher
