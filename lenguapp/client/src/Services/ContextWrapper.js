import React from 'react'

import { AppContext } from './ContextProvider'

export function withContext(Component) {
    return function contextComponent(props) {
        return (
        <AppContext.Consumer>
        {context => <Component {...props} context={context} />}
        </AppContext.Consumer>
        )
    }
}