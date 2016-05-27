
const listParents = (match) => {
  if (match.parent == null) return []
  return listParents(match.parent).concat(match.parent)
}

const dispatcher = (route, views) => path => {
  const routeMatch = route(path)
  if (routeMatch == null) {
    return null
  } else {
    const parents = listParents(routeMatch)
    const viewStack = parents.concat(routeMatch).map(match =>
      views[match.name](match.params))
    return viewStack
  }
}

export default dispatcher
