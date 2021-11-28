import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from "./components/pages/Home"
import Products from "./components/pages/Products"
import Services from "./components/pages/Services"
import Auth from "./components/pages/Auth"
import StoreProvider from './components/Store/Provider'
import { RoutesPrivate, RoutesNotPrivate } from './components/Routes/Private/Private'
import My from './components/pages/App/My'
import Public from './components/pages/App/Public'
import Shared from './components/pages/App/Shared'
import New from './components/pages/App/New'
import Run from './components/pages/App/Run'
import Edit from './components/pages/App/Edit'
import Share from './components/pages/App/Share'
import UserSettings from './components/pages/App/UserSettings'
import { ThemeProvider } from '@material-ui/styles'
import theme from './components/theme/theme'
import baseUrl from './components/server/server'

const App = () => {

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <StoreProvider>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/products" exact component={Products} />
              <Route path="/services" exact component={Services} />
              <RoutesNotPrivate path="/auth" exact component={Auth} />
              <Route path='/api' exact component={() => {
                window.location.href = baseUrl
                return null
              }} />
              <RoutesPrivate path="/my" exact component={My} />
              <RoutesPrivate path="/shared" exact component={Shared} />
              <RoutesPrivate path="/public" exact component={Public} />
              <RoutesPrivate path="/new" exact component={New} />
              <RoutesPrivate path="/run" exact component={Run} />
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