import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from "./components/pages/Home"
import Products from "./components/pages/Products"
import Documents from "./components/pages/Documents"
import Auth from "./components/pages/Auth"
import StoreProvider from './components/Store/Provider'
import { RoutesPrivate, RoutesNotPrivate, RoutesPrivateShareable } from './components/Routes/Private/Private'
import My from './components/pages/App/My'
import Public from './components/pages/App/Public'
import Shared from './components/pages/App/Shared'
import New from './components/pages/App/New'
import Run from './components/pages/App/Run'
import RunLinkable from './components/pages/App/RunLinkable'
import Edit from './components/pages/App/Edit'
import Share from './components/pages/App/Share'
import UserSettings from './components/pages/App/UserSettings'
import AuthRedirect from './components/pages/AuthRedirect'
import { ThemeProvider } from '@material-ui/styles'
import theme from './components/theme/theme'

const App = () => {

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <StoreProvider>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/products" exact component={Products} />
              <Route path="/docs" exact component={Documents} />
              <RoutesNotPrivate path="/auth" exact component={Auth} />
              <Route path='/api' exact component={() => {
                window.location.href = process.env.REACT_APP_BACKEND_URL
                return null
              }} />
              <Route path="/auth-redirect" exact component={AuthRedirect} />
              <RoutesPrivate path="/my" exact component={My} />
              <RoutesPrivate path="/shared" exact component={Shared} />
              <RoutesPrivate path="/public" exact component={Public} />
              <RoutesPrivate path="/new" exact component={New} />
              <RoutesPrivate path="/run" exact component={Run} />
              <RoutesPrivateShareable path="/runs/:projectId" component={RunLinkable} />
              <RoutesPrivate path="/edit" exact component={Edit} />
              <RoutesPrivate path="/share" exact component={Share} />
              <RoutesPrivate path="/user-settings" exact component={UserSettings} />
            </Switch>
          </StoreProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App