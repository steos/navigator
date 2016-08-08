import React, { Component, PropTypes } from 'react'

export const connectRouter = Comp => {
    class RouterComponent extends Component {
        render() {
            const props = this.props
            const { route = {}, router = {}, nav } = this.context
            return <Comp { ...props } route={route} router={router} nav={nav} />
        }
    }

    RouterComponent.contextTypes = {
        router: PropTypes.object,
        route: PropTypes.object,
        nav: React.PropTypes.object.isRequired,
    }

    return RouterComponent
}
