import { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import StoreContext from '../../Store/Context'

const RoutesPrivate = ({ component: Component, ...rest}) => {
    const { token } = useContext(StoreContext)
    return(
        <>
            <Route
                {...rest}
                render={() => token ? 
                    <Component {...rest}/>
                    :
                    <Redirect to="/auth"/>
                }
            />
        </>
    )
}

const RoutesPrivateShareable = ({ component: Component, ...rest}) => {
    const { token } = useContext(StoreContext)
    return(
        <>
            <Route
                {...rest}
                render={() => token ? 
                    <Component {...rest}/>
                    :
                    <Redirect to={{
                        pathname: "/auth-redirect",
                        state: {...rest}
                    }} />
                }
            />
        </>
    )
}

const RoutesNotPrivate = ({ component: Component, ...rest}) => {
    const { token } = useContext(StoreContext)
    return(
        <>
            <Route
                {...rest}
                render={() => token ? 
                    <Redirect to="/"/>
                    :
                    <Component {...rest}/>
                }
            />
        </>
    )
}

export { RoutesPrivate, RoutesNotPrivate, RoutesPrivateShareable }