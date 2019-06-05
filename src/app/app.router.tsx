import * as React from 'react'
import { createBrowserHistory } from 'history'
import { Route, Router } from 'react-router-dom'
import DashboardPage from './dashboard/dashboard.page'
import { syncHistoryWithStore } from 'react-router-redux'
import store from './app.store'

export const history = syncHistoryWithStore(createBrowserHistory<>(), store)

const AppRouter: React.FC = () => {
  return (
    <Router history={history}>
      {/*<Route path="/login" component={LoginPage} exact={true} />*/}
      {/*<Route path="/login/success" component={NotFoundPage} />*/}
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/guvno" component={DashboardPage} />
    </Router>
  )
}

export default AppRouter
